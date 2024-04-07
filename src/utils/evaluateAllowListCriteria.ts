import { convertCriteriaToQuery } from "./convertCriteriaToQuery";
import { AllowListCriteriaEnum as AllowListCriteria } from "../types";

export const evaluateAllowListCriteria = async (
  fid: number,
  criteria: any,
  messageCtx: { castFid?: number | undefined }
) => {
  const criteriaKeys = Object.keys(criteria);
  const { castFid } = messageCtx ?? {};
  if (criteriaKeys.length === 0 || criteriaKeys.length > 1) {
    throw new Error("Invalid criteria");
  }

  switch (criteriaKeys[0]) {
    case "or":
      return (
        await convertCriteriaToQuery(
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
          { castFid }
        )
      ).reduce((acc, curr) => acc || curr, false);
    case "and":
      return (
        await convertCriteriaToQuery(
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
          { castFid }
        )
      ).reduce((acc, curr) => acc && curr, true);
    case "nor":
      return !(
        await convertCriteriaToQuery(
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
          { castFid }
        )
      ).reduce((acc, curr) => acc || curr, false);
    default:
      return false;
  }
};
