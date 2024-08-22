import type {
  CreateAllowListInput,
  CreateAllowListOutput,
  CreateAllowListQuery,
  CreateAllowListQueryVariables,
} from "../types";
import { fetchQuery } from "@airstack/node";
import { createAllowListQuery as query } from "../graphql/query/createAllowList.query";

/**
 * @description Create an allow list for a Farcaster user based on the given criteria.
 * @example
 * const { isAllowed, error } = await createAllowList({
 *  numberOfFollowersOnFarcaster: 100,
 *  isFollowingOnFarcaster: [2602],
 * });
 *
 * @param {Number} input.fid FID of the user to check
 * @param {Object} input.allowListCriteria Criteria to check if the user is allowed
 * @param {Function} [input.isAllowedFunction] Custom function to determine if the user is allowed
 * @returns Boolean to determine if the user is allowed or not
 */
export async function createAllowList(
  input: CreateAllowListInput
): Promise<CreateAllowListOutput> {
  const { fid, allowListCriteria, isAllowedFunction } = input ?? {};
  const { numberOfFollowersOnFarcaster, isFollowingOnFarcaster } =
    allowListCriteria;
  const variables: CreateAllowListQueryVariables = {
    fid: fid?.toString() ?? "1",
    identity: `fc_fid:${fid}`,
    isFollowingOnFarcaster: isFollowingOnFarcaster?.map((id) => `fc_fid:${id}`),
    followerCountOnFarcaster: numberOfFollowersOnFarcaster ?? 0,
  };
  const { data, error } = await fetchQuery(query(allowListCriteria), variables);

  const { isFollowingOnFarcaster: Follower, numberOfFollowersOnFC } =
    (data as CreateAllowListQuery) ?? {};
  // Check if user is following the listed users on Farcaster
  const isFollowingUsersOnFarcaster =
    isFollowingOnFarcaster?.map((fid) => ({
      fid,
      isFollowing: (Follower?.socialFollowers?.Follower ?? [])?.some((f: any) =>
        f?.followingAddress?.farcaster?.some(
          (fc: { fid: string | null }) => fc?.fid === fid.toString()
        )
      ),
    })) ?? [];
  // Check if user has more followers than the specified count on Farcaster
  const isFarcasterFollowerCountAbove =
    (numberOfFollowersOnFC?.Social ?? []).length > 0;

  if (isAllowedFunction) {
    // If a custom isAllowedFunction is provided,
    // use it to determine if the user is allowed
    return {
      isAllowed: await isAllowedFunction({
        isFollowingUsersOnFarcaster,
        isFarcasterFollowerCountAbove,
      }),
    };
  }

  return {
    isAllowed: error
      ? null
      : // If no custom isAllowedFunction is provided,
        // use the default AND logic to determine if the user is allowed
        true &&
        (isFollowingOnFarcaster
          ? isFollowingUsersOnFarcaster?.every(({ isFollowing }) => isFollowing)
          : true) &&
        (numberOfFollowersOnFarcaster ? isFarcasterFollowerCountAbove : true),
    error,
  };
}
