import { fetchQuery } from "@airstack/node";
import {
  CheckCastReactionsByFarcasterUserQuery,
  CheckCastReactionsByFarcasterUserQueryVariables,
} from "../graphql/types";
import {
  CheckCastReactionsByFarcasterUserInput,
  CheckCastReactionsByFarcasterUserOutput,
} from "../types";
import { checkCastReactionsByFarcasterUserQuery as query } from "../graphql/query/checkCastReactionsByFarcasterUser.query";

/**
 * @description Check If a Farcaster user of a given FID has reacted to a list of casts.
 * @example
 * const { data, error } = await checkCastReactionsByFarcasterUser({
 *  fid: 1,
 *  criteria: FarcasterReactionCriteria.Likes,
 *  castHashes: ["0x4c17ff12d9a925a0dec822a8cbf06f46c6268553"],
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {FarcasterReactionCriteria} input.criteria Either liked, replied, or recasted
 * @param {Array<String>} input.castHashes List of cast hashes to check if the user has reacted to any of the listed casts
 * @returns List of the cast hashes and return status of whether user has reacted to any of the listed casts, returned in `isReacted` field
 */
export async function checkCastReactionsByFarcasterUser(
  input: CheckCastReactionsByFarcasterUserInput
): Promise<CheckCastReactionsByFarcasterUserOutput> {
  const { fid, criteria, castHashes } = input ?? {};
  const variable: CheckCastReactionsByFarcasterUserQueryVariables = {
    identity: `fc_fid:${fid}`,
    criteria,
    castHashes,
  };
  const { data, error } = await fetchQuery(query, variable);
  const { Reaction } =
    (data as CheckCastReactionsByFarcasterUserQuery)?.FarcasterReactions ?? {};
  return {
    data: error
      ? null
      : castHashes?.map((h) => ({
          castHash: h,
          isReacted: (Reaction ?? [])?.some(
            ({ cast }) => cast?.hash === h?.toLowerCase()
          ),
        })) ?? [],
    error,
  };
}
