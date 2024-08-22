import type { MiddlewareHandler } from "hono";
import { createAllowList, validateFramesMessage, init } from "../../";
import type {
  AllowListMiddlewareParameters,
  AllowListMiddlewareVariables,
} from "../../types";
import { config } from "../../config";

export function allowListFrogMiddleware(
  parameters: AllowListMiddlewareParameters
): MiddlewareHandler<{ Variables: AllowListMiddlewareVariables }> {
  const { apiKey, env } = parameters ?? {};
  // If an apiKey is provided, initialize the SDK with custom API key
  if (apiKey && !config?.authKey) init(apiKey);
  return async (c: any, next: any) => {
    let fid: number;
    const body = (await c.req.json().catch(() => {})) || {};
    if (env === "dev") {
      // In development, we use untrusted data
      const { untrustedData } = body ?? {};
      fid = untrustedData?.fid as number;
    } else {
      // In production, get fid from the validated message
      const { message } = await validateFramesMessage(body);
      const { data } = message ?? {};
      fid = data?.fid as number;
    }

    // Check if the user is allowed
    const { isAllowed } = await createAllowList({
      fid,
      ...parameters,
    });

    // Add `isAllowed` to the context
    c.set("isAllowed", isAllowed);

    await next();
  };
}
