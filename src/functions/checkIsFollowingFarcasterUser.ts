import { fetchQuery } from "@airstack/node";
import {
  CheckIsFollowingFarcasterUserQuery,
  CheckIsFollowingFarcasterUserQueryVariables,
} from "../graphql/types";
import {
  CheckIsFollowingFarcasterUserInput,
  CheckIsFollowingFarcasterUserOutput,
} from "../types";
import { checkIsFollowingFarcasterUser as query } from "../graphql/query/checkIsFollowingFarcasterUser.query";

/**
 * @description Check If a Farcaster user of a given FID is following an array of Farcaster users with certain FIDs.
 * @example
 * const { data, error } = await checkIsFollowingFarcasterUser({
 *  fid: 1,
 *  isFollowing: [2, 3, 4],
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<Number>} input.isFollowedBy List of FIDs to check if the given user is following these list of Farcaster user with the provided FIDs
 * @returns List of the FID in `isFollowing` followed by true or false on the status of following or not
 */
export async function checkIsFollowingFarcasterUser(
  input: CheckIsFollowingFarcasterUserInput
): Promise<CheckIsFollowingFarcasterUserOutput> {
  const { fid, isFollowing } = input ?? {};
  const variable: CheckIsFollowingFarcasterUserQueryVariables = {
    identity: `fc_fid:${fid}`,
    isFollowing: isFollowing?.map((fid) => `fc_fid:${fid}`),
  };
  const { data, error } = await fetchQuery(query, variable);
  const { Follower } =
    (data as CheckIsFollowingFarcasterUserQuery)?.Wallet?.socialFollowers ?? {};
  return {
    data: error
      ? null
      : isFollowing?.map((fid) => ({
          fid,
          isFollowing: (Follower ?? [])?.some((f) =>
            f?.followingAddress?.farcaster?.some(
              (fc: { fid: string | null }) => fc?.fid === fid.toString()
            )
          ),
        })) ?? [],
    error,
  };
}
