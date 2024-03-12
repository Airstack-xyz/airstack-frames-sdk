import {
  CreateAllowListInput,
  CreateAllowListOutput,
  CreateAllowListQuery,
  CreateAllowListQueryVariables,
  TokenBlockchain,
} from "../types";
import { fetchQuery } from "@airstack/node";
import { createAllowListQuery as query } from "../graphql/query/createAllowList.query";

/**
 * @description Create an allow list for a Farcaster user based on the given criteria.
 * @example
 * const { isAllowed, error } = await createAllowList({
 *  eventIds: [166577],
 *  numberOfFollowersOnFarcaster: 100,
 *  isFollowingOnFarcaster: [2602],
 *  tokens: [
 *    {
 *      tokenAddress: "0x95cb845b525f3a2126546e39d84169f1eca8c77f",
 *      chain: TokenBlockchain.Ethereum,
 *    },
 *    {
 *      tokenAddress: "0xd57867f2fdb89eadc8e859a89e3d5039c913d1d9",
 *      chain: TokenBlockchain.Polygon,
 *    },
 *    {
 *      tokenAddress: "0x2d45c399d7ca25341992038f12610c41a00a66ed",
 *      chain: TokenBlockchain.Base,
 *    },
 *    {
 *      tokenAddress: "0x743658ace931ea241dd0cb4ed38ec72cc8162ce1",
 *      chain: TokenBlockchain.Zora,
 *    },
 *  ]
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
  const {
    eventIds,
    numberOfFollowersOnFarcaster,
    isFollowingOnFarcaster,
    tokens,
  } = allowListCriteria;
  const ethereumTokens =
    tokens
      ?.filter((t) => t?.chain === TokenBlockchain.Ethereum)
      ?.map((t) => t?.tokenAddress) ?? [];
  const polygonTokens =
    tokens
      ?.filter((t) => t?.chain === TokenBlockchain.Polygon)
      ?.map((t) => t?.tokenAddress) ?? [];
  const baseTokens =
    tokens
      ?.filter((t) => t?.chain === TokenBlockchain.Base)
      ?.map((t) => t?.tokenAddress) ?? [];
  const zoraTokens =
    tokens
      ?.filter((t) => t?.chain === TokenBlockchain.Zora)
      ?.map((t) => t?.tokenAddress) ?? [];
  const variables: CreateAllowListQueryVariables = {
    fid: fid?.toString() ?? "1",
    identity: `fc_fid:${fid}`,
    eventIds: eventIds?.map((id) => id.toString()) ?? [],
    isFollowingOnFarcaster: isFollowingOnFarcaster?.map((id) => `fc_fid:${id}`),
    followerCountOnFarcaster: numberOfFollowersOnFarcaster ?? 0,
    ethereumTokens,
    polygonTokens,
    baseTokens,
    zoraTokens,
  };
  const chains = [
    ...(ethereumTokens?.length > 0 ? [TokenBlockchain.Ethereum] : []),
    ...(polygonTokens?.length > 0 ? [TokenBlockchain.Polygon] : []),
    ...(baseTokens?.length > 0 ? [TokenBlockchain.Base] : []),
    ...(zoraTokens?.length > 0 ? [TokenBlockchain.Zora] : []),
  ];
  const { data, error } = await fetchQuery(
    query(allowListCriteria, chains),
    variables
  );

  const {
    poaps,
    isFollowingOnFarcaster: Follower,
    numberOfFollowersOnFC,
    ethereum,
    polygon,
    base,
    zora,
  } = (data as CreateAllowListQuery) ?? {};
  // Check if user attended the listed POAPs
  const isPoapsAttended =
    eventIds?.map((id) => ({
      eventId: id,
      isAttended: (poaps?.Poap ?? [])?.some(
        (p: any) => p?.eventId === id?.toString()
      ),
    })) ?? [];
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
  // Check if user holds the listed tokens
  const isTokensHold =
    tokens?.map(({ chain, tokenAddress }) => {
      switch (chain) {
        case TokenBlockchain.Ethereum:
          return {
            chain,
            tokenAddress,
            isHold: (ethereum?.TokenBalance ?? [])?.some(
              (t) => t?.tokenAddress === tokenAddress
            ),
          };
        case TokenBlockchain.Polygon:
          return {
            chain,
            tokenAddress,
            isHold: (polygon?.TokenBalance ?? [])?.some(
              (t) => t?.tokenAddress === tokenAddress
            ),
          };
        case TokenBlockchain.Base:
          return {
            chain,
            tokenAddress,
            isHold: (base?.TokenBalance ?? [])?.some(
              (t) => t?.tokenAddress === tokenAddress
            ),
          };
        case TokenBlockchain.Zora:
          return {
            chain,
            tokenAddress,
            isHold: (zora?.TokenBalance ?? [])?.some(
              (t) => t?.tokenAddress === tokenAddress
            ),
          };
        default:
          return {
            chain,
            tokenAddress,
            isHold: false,
          };
      }
    }) ?? [];

  if (isAllowedFunction) {
    // If a custom isAllowedFunction is provided,
    // use it to determine if the user is allowed
    return {
      isAllowed: await isAllowedFunction({
        isPoapsAttended,
        isFollowingUsersOnFarcaster,
        isFarcasterFollowerCountAbove,
        isTokensHold,
      }),
    };
  }

  return {
    isAllowed: error
      ? null
      : // If no custom isAllowedFunction is provided,
        // use the default AND logic to determine if the user is allowed
        true &&
        (isPoapsAttended?.every(({ isAttended }) => isAttended) ?? true) &&
        (isFollowingUsersOnFarcaster?.every(({ isFollowing }) => isFollowing) ??
          true) &&
        isFarcasterFollowerCountAbove &&
        isTokensHold?.every(({ isHold }) => isHold),
    error,
  };
}
