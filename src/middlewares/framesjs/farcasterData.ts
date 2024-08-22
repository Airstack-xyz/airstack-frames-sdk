import {
  getFarcasterChannelsByParticipant,
  getFarcasterFollowers,
  getFarcasterFollowings,
  getFarcasterUserCasts,
  getFarcasterUserDetails,
  init,
} from "../..";
import {
  Features,
  type FramesMiddleware,
  type FarcasterDataInput,
  type FarcasterDataOutput,
} from "../../types";
import { config } from "dotenv";
import { decodeFrameActionPayloadFromRequest } from "../../utils/decodeFrameActionPayloadFromRequest";
import { type FrameActionMessage, Message } from "@farcaster/core";
import { config as configEnv } from "../../config";

config();

/**
 *
 * @param input
 * @returns
 */
export const farcasterDataFramesjsMiddleware = (
  input: FarcasterDataInput
): FramesMiddleware<any, FarcasterDataOutput> => {
  const { apiKey, features } = input ?? {};
  // If an apiKey is provided, initialize the SDK with custom API key
  if (apiKey && !configEnv?.authKey) init(apiKey);
  return async (ctx, next) => {
    let farcasterRes = {};

    // frame message is available only if the request is a POST request
    if (ctx.request.method !== "POST") {
      return next();
    }
    // body must be a JSON object
    const payload = await decodeFrameActionPayloadFromRequest(ctx.request);

    // for initial frame, directly return the Frame
    if (!payload) {
      return next();
    }

    const decodedMessage = Message.decode(
      Buffer.from(payload.trustedData.messageBytes, "hex")
    ) as FrameActionMessage;

    const { fid } = decodedMessage?.data ?? {};
    try {
      const [
        userDetailsResponse,
        farcasterFollowingsResponse,
        farcasterFollowersResponse,
        farcasterChannelsResponse,
        farcasterCastsResponse,
      ] = await Promise.all([
        features.includes(Features.USER_DETAILS)
          ? getFarcasterUserDetails({
              fid,
            })
          : Promise.resolve(undefined),
        features.includes(Features.FARCASTER_FOLLOWINGS)
          ? getFarcasterFollowings({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.FARCASTER_FOLLOWERS)
          ? getFarcasterFollowers({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.FARCASTER_CHANNELS)
          ? getFarcasterChannelsByParticipant({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.FARCASTER_CASTS)
          ? getFarcasterUserCasts({ fid })
          : Promise.resolve(undefined),
      ]);

      if (userDetailsResponse) {
        farcasterRes = {
          ...farcasterRes,
          userDetails: userDetailsResponse.data,
        };
      }

      if (farcasterFollowingsResponse) {
        farcasterRes = {
          ...farcasterRes,
          farcasterFollowings: farcasterFollowingsResponse.data,
        };
      }

      if (farcasterFollowersResponse) {
        farcasterRes = {
          ...farcasterRes,
          farcasterFollowers: farcasterFollowersResponse.data,
        };
      }

      if (farcasterChannelsResponse) {
        farcasterRes = {
          ...farcasterRes,
          farcasterChannels: farcasterChannelsResponse.data,
        };
      }

      if (farcasterCastsResponse) {
        farcasterRes = {
          ...farcasterRes,
          farcasterCasts: farcasterCastsResponse.data,
        };
      }

      return next(farcasterRes);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  };
};
