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
