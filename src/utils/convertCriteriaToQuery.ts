import {
  checkIsFollowedByFarcasterUser,
  checkIsFollowingFarcasterUser,
  checkNumberOfFarcasterFollowers,
} from "../functions";
import { evaluateAllowListCriteria } from "./evaluateAllowListCriteria";
import { AllowListCriteriaEnum as AllowListCriteria } from "../types";

export const convertCriteriaToQuery = (
  fid: number,
  criteriaArray: any,
  messageCtx: { castFid?: number | undefined }
): Promise<boolean[]> => {
  try {
    const { castFid } = messageCtx ?? {};
    return Promise.all(
      criteriaArray.map((condition: any) => {
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
            default:
              return null;
          }
        }
        return evaluateAllowListCriteria(fid, condition, { castFid });
      })
    );
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
