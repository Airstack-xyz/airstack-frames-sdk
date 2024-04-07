import { FramesMiddleware } from "../../types";
import { decodeFrameActionPayloadFromRequest } from "../../utils/decodeFrameActionPayloadFromRequest";
import { FrameActionMessage, Message } from "@farcaster/core";

import { config } from "../../config";
import { init } from "../../init";
import { evaluateAllowListCriteria } from "../../utils/evaluateAllowListCriteria";

/**
 *
 * @param input
 * @returns
 */
export const allowListFramesjsMiddleware = (
  input: any
): FramesMiddleware<any, { isAllowed: boolean }> => {
  const { apiKey, criteria } = input ?? {};
  // If an apiKey is provided, initialize the SDK with custom API key
  if (apiKey && !config?.authKey) init(apiKey);
  return async (ctx: any, next: any) => {
    try {
      // frame message is available only if the request is a POST request
      if (ctx.request.method !== "POST") {
        return next();
      }

      // body must be a JSON object
      const payload = await decodeFrameActionPayloadFromRequest(ctx.request);

      if (!payload) {
        return next();
      }

      const decodedMessage = Message.decode(
        Buffer.from(payload.trustedData.messageBytes, "hex")
      ) as FrameActionMessage;

      const { fid, frameActionBody } = decodedMessage?.data ?? {};
      const { castId } = frameActionBody ?? {};

      const isAllowed = await evaluateAllowListCriteria(fid, criteria, {
        castFid: castId?.fid,
      });

      return next({ isAllowed });
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  };
};
