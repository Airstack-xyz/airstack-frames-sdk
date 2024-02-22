import { fetchQuery } from "@airstack/node";
import {
  CheckIsFollowedByFarcasterUserQuery,
  CheckIsFollowedByFarcasterUserQueryVariables,
} from "../graphql/types";
import {
  CheckIsFollowedByFarcasterUserInput,
  CheckIsFollowedByFarcasterUserOutput,
} from "../types";
import { checkIsFollowedByFarcasterUserQuery as query } from "../graphql/query/checkIsFollowedByFarcasterUser.query";

/**
 * @description Check If a Farcaster user of a given FID is followed by an array of Farcaster users with certain FIDs.
 * @example
 * const { data, error } = await checkIsFollowedByFarcasterUser({
 *  fid: 1,
 *  isFollowedBy: [2, 3, 4],
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<Number>} input.isFollowedBy List of FIDs to check if the given user is followed by these list of Farcaster user with the provided FIDs
 * @returns List of the FID in `isFollowedBy` with true or false associated on the status of following or not
 */
export async function checkIsFollowedByFarcasterUser(
  input: CheckIsFollowedByFarcasterUserInput
): Promise<CheckIsFollowedByFarcasterUserOutput> {
  const { fid, isFollowedBy } = input ?? {};
  const variable: CheckIsFollowedByFarcasterUserQueryVariables = {
    identity: `fc_fid:${fid}`,
    isFollowedBy: isFollowedBy?.map((fid) => `fc_fid:${fid}`),
  };
  const { data, error } = await fetchQuery(query, variable);
  const { Following } =
    (data as CheckIsFollowedByFarcasterUserQuery)?.Wallet?.socialFollowings ??
    {};
  return {
    data: error
      ? null
      : isFollowedBy?.map((fid) => ({
          fid,
          isFollowedBy: (Following ?? [])?.some((f) =>
            f?.followerAddress?.farcaster?.some(
              (fc: { fid: string | null }) => fc?.fid === fid.toString()
            )
          ),
        })) ?? [],
    error,
  };
}
