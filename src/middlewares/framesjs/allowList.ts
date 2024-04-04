import {
  checkIsFollowedByFarcasterUser,
  checkIsFollowingFarcasterUser,
  checkTokenHoldByFarcasterUser,
  checkTokenMintedByFarcasterUser,
  init,
} from "../../";
import { FramesMiddleware } from "../../types";
import { checkNumberOfFarcasterFollowers } from "../../functions";
import { decodeFrameActionPayloadFromRequest } from "../../utils/decodeFrameActionPayloadFromRequest";
import { FrameActionMessage, Message } from "@farcaster/core";
import { AllowListCriteriaEnum as AllowListCriteria } from "../../types";

const criteriaToQuery = (
  fid: number,
  conditionsArray: any,
  castFid: number | undefined
): Promise<boolean[]> => {
  try {
    return Promise.all(
      conditionsArray.map((condition: any) => {
        if (Array.isArray(condition)) {
          const [key, value] = condition ?? [];
          switch (key) {
            case AllowListCriteria.NUMBER_OF_FARCASTER_FOLLOWERS:
              return checkNumberOfFarcasterFollowers({
                fid,
                followerCountCriteria: value,
              });
            case AllowListCriteria.FARCASTER_FOLLOWED_BY:
              return (async () => {
                const { data } = await checkIsFollowedByFarcasterUser({
                  fid,
                  isFollowedBy: [value.fid],
                });
                return data?.[0]?.isFollowedBy;
              })();
            case AllowListCriteria.FARCASTER_FOLLOWING:
              return (async () => {
                const { data } = await checkIsFollowingFarcasterUser({
                  fid,
                  isFollowing: [value.fid],
                });
                return data?.[0]?.isFollowing;
              })();
            case AllowListCriteria.FARCASTER_FOLLOWING_CASTER:
              return castFid
                ? (async () => {
                    const { data } = await checkIsFollowingFarcasterUser({
                      fid,
                      isFollowing: [castFid],
                    });
                    return data?.[0]?.isFollowing;
                  })()
                : false;
            case AllowListCriteria.TOKEN_HOLD:
              return (async () => {
                const { data } = await checkTokenHoldByFarcasterUser({
                  fid,
                  token: [value],
                });
                return data?.[0]?.isHold;
              })();
            case AllowListCriteria.TOKEN_MINT:
              return (async () => {
                const { data } = await checkTokenMintedByFarcasterUser({
                  fid,
                  token: [value],
                });
                return data?.[0]?.isMinted;
              })();
            default:
              return null;
          }
        } else {
          return evaluateCriteria(fid, condition, castFid);
        }
      })
    );
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const evaluateCriteria = async (
  fid: number,
  criteria: any,
  castFid: number | undefined
) => {
  const criteriaKeys = Object.keys(criteria);
  if (criteriaKeys.length === 0 || criteriaKeys.length > 1) {
    throw new Error("Invalid criteria");
  }

  switch (criteriaKeys[0]) {
    case "or":
      return (
        await criteriaToQuery(
          fid,
          criteria.or?.map((c: any) => {
            if (Array.isArray(c)) {
              if (c[0] === AllowListCriteria.FARCASTER_FOLLOWING_CASTER) {
                return [c[0], { castFid }];
              }

              return c;
            }
            return c;
          }),
          castFid
        )
      ).reduce((acc, curr) => acc || curr, false);
    case "and":
      return (
        await criteriaToQuery(
          fid,
          criteria.and?.map((c: any) => {
            if (Array.isArray(c)) {
              if (c[0] === AllowListCriteria.FARCASTER_FOLLOWING_CASTER) {
                return [c[0], { castFid }];
              }

              return c;
            }
            return c;
          }),
          castFid
        )
      ).reduce((acc, curr) => acc && curr, true);
    case "nor":
      return !(
        await criteriaToQuery(
          fid,
          criteria.nor?.map((c: any) => {
            if (Array.isArray(c)) {
              if (c[0] === AllowListCriteria.FARCASTER_FOLLOWING_CASTER) {
                return [c[0], { castFid }];
              }

              return c;
            }
            return c;
          }),
          castFid
        )
      ).reduce((acc, curr) => acc || curr, false);
    default:
      return false;
  }
};

export const allowListFramesjsMiddleware = (
  input: any
): FramesMiddleware<any, { isAllowed: boolean }> => {
  const { apiKey, criteria } = input ?? {};
  init(apiKey);
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

      const isAllowed = await evaluateCriteria(fid, criteria, castId?.fid);

      return next({ isAllowed });
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  };
};
