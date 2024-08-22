import {
  init,
  validateFramesMessage,
  getFarcasterUserDetails,
  getFarcasterChannelsByParticipant,
  getFarcasterFollowers,
  getFarcasterFollowings,
} from "../..";
import type {
  FarcasterDataMiddlewareParameters,
  FarcasterDataVariables,
} from "../../types";
import type { MiddlewareHandler } from "hono";
import { config } from "../../config";

export const farcasterDataFrogMiddleware = (
  parameters: FarcasterDataMiddlewareParameters
): MiddlewareHandler<{ Variables: FarcasterDataVariables }> => {
  const { apiKey, features, env = "prod" } = parameters ?? {};
  const { userDetails, channels, followers, followings } = features ?? {};
  // If an apiKey is provided, initialize the SDK with custom API key
  if (apiKey && !config?.authKey) init(apiKey);
  return async (c, next) => {
    let fid: number;
    const body = (await c.req.json().catch(() => {})) || {};
    if (env === "dev") {
      const { untrustedData } = body ?? {};
      fid = untrustedData?.fid as number;
    } else {
      // In production, get fid from the validated message
      const { message } = await validateFramesMessage(body);
      const { data } = message ?? {};
      fid = data?.fid as number;
    }

    if (fid) {
      const [
        userDetailsResponse,
        channelsResponse,
        followersResponse,
        followingsResponse,
      ] = await Promise.all([
        userDetails
          ? getFarcasterUserDetails({ fid, ...(userDetails ?? {}) })
          : Promise.resolve(undefined),
        channels
          ? getFarcasterChannelsByParticipant({ fid, ...(channels ?? {}) })
          : Promise.resolve(undefined),
        followers
          ? getFarcasterFollowers({ fid, ...(followers ?? {}) })
          : Promise.resolve(undefined),
        followings
          ? getFarcasterFollowings({ fid, ...(followings ?? {}) })
          : Promise.resolve(undefined),
      ]);

      if (userDetailsResponse)
        c.set<"userDetails">("userDetails", userDetailsResponse.data);
      if (channelsResponse)
        c.set<"channels">("channels", channelsResponse.data);
      if (followersResponse)
        c.set<"followers">("followers", followersResponse.data);
      if (followingsResponse)
        c.set<"followings">("followings", followingsResponse.data);
    }

    await next();
  };
};
