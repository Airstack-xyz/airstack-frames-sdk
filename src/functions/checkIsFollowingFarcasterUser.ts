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
