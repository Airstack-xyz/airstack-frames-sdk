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
  const [specifcNFTs, otherTokens] = tokens
    ? tokens?.reduce(
        (acc: any[][], token) => {
          if (token?.tokenId) {
            acc[0].push(token);
          } else {
            acc[1].push(token);
          }
          return acc;
        },
        [[], []]
      )
    : [[], []];
  const ethereumTokens =
    otherTokens
      ?.filter((t) => t?.chain === TokenBlockchain.Ethereum)
      ?.map((t) => t?.tokenAddress) ?? [];
  const baseTokens =
    otherTokens
      ?.filter((t) => t?.chain === TokenBlockchain.Base)
      ?.map((t) => t?.tokenAddress) ?? [];
  const zoraTokens =
    otherTokens
      ?.filter((t) => t?.chain === TokenBlockchain.Zora)
      ?.map((t) => t?.tokenAddress) ?? [];
  const goldTokens =
    otherTokens
      ?.filter((t) => t?.chain === TokenBlockchain.Gold)
      ?.map((t) => t?.tokenAddress) ?? [];
  const degenTokens =
    otherTokens
      ?.filter((t) => t?.chain === TokenBlockchain.Degen)
      ?.map((t) => t?.tokenAddress) ?? [];
  const hamTokens =
    otherTokens
      ?.filter((t) => t?.chain === TokenBlockchain.Ham)
      ?.map((t) => t?.tokenAddress) ?? [];
  const variables: CreateAllowListQueryVariables = {
    fid: fid?.toString() ?? "1",
    identity: `fc_fid:${fid}`,
    eventIds: eventIds?.map((id) => id.toString()) ?? [],
    isFollowingOnFarcaster: isFollowingOnFarcaster?.map((id) => `fc_fid:${id}`),
    followerCountOnFarcaster: numberOfFollowersOnFarcaster ?? 0,
    ethereumTokens,
    baseTokens,
    zoraTokens,
    goldTokens,
    degenTokens,
    hamTokens,
    ...Object.assign(
      {},
      ...specifcNFTs?.map((_, i) => ({
        [`tokenAddress${i}`]: _.tokenAddress,
        [`tokenId${i}`]: _.tokenId,
        [`chain${i}`]: _.chain,
      }))
    ),
  };
  const chains = [
    ...(ethereumTokens?.length > 0 ? [TokenBlockchain.Ethereum] : []),
    ...(baseTokens?.length > 0 ? [TokenBlockchain.Base] : []),
    ...(zoraTokens?.length > 0 ? [TokenBlockchain.Zora] : []),
    ...(goldTokens?.length > 0 ? [TokenBlockchain.Gold] : []),
    ...(degenTokens?.length > 0 ? [TokenBlockchain.Degen] : []),
    ...(hamTokens?.length > 0 ? [TokenBlockchain.Ham] : []),
  ];
  const { data, error } = await fetchQuery(
    query(allowListCriteria, chains, specifcNFTs?.length),
    variables
  );

  const {
    poaps,
    isFollowingOnFarcaster: Follower,
    numberOfFollowersOnFC,
    ethereum,
    base,
    zora,
    gold,
    degen,
    ham,
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
    otherTokens?.map(({ chain, tokenAddress }) => {
      switch (chain) {
        case TokenBlockchain.Ethereum:
          return {
            chain,
            tokenAddress,
            isHold: (ethereum?.TokenBalance ?? [])?.some(
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
        case TokenBlockchain.Gold:
          return {
            chain,
            tokenAddress,
            isHold: (gold?.TokenBalance ?? [])?.some(
              (t) => t?.tokenAddress === tokenAddress
            ),
          };
        case TokenBlockchain.Degen:
          return {
            chain,
            tokenAddress,
            isHold: (degen?.TokenBalance ?? [])?.some(
              (t) => t?.tokenAddress === tokenAddress
            ),
          };
        case TokenBlockchain.Ham:
          return {
            chain,
            tokenAddress,
            isHold: (ham?.TokenBalance ?? [])?.some(
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

  const isSpecificNFTsHold = specifcNFTs?.map(
    ({ chain, tokenAddress, tokenId }, i) => ({
      chain,
      tokenAddress,
      tokenId,
      isHold:
        (data as CreateAllowListQuery)?.[`nft${i}`]?.TokenBalance?.some(
          (t) =>
            t.tokenAddress === tokenAddress &&
            t.tokenId === tokenId &&
            t.blockchain === chain
        ) ?? false,
    })
  );

  if (isAllowedFunction) {
    // If a custom isAllowedFunction is provided,
    // use it to determine if the user is allowed
    return {
      isAllowed: await isAllowedFunction({
        isPoapsAttended,
        isFollowingUsersOnFarcaster,
        isFarcasterFollowerCountAbove,
        isTokensHold,
        isSpecificNFTsHold,
      }),
    };
  }

  return {
    isAllowed: error
      ? null
      : // If no custom isAllowedFunction is provided,
        // use the default AND logic to determine if the user is allowed
        true &&
        (eventIds
          ? isPoapsAttended?.every(({ isAttended }) => isAttended)
          : true) &&
        (isFollowingOnFarcaster
          ? isFollowingUsersOnFarcaster?.every(({ isFollowing }) => isFollowing)
          : true) &&
        (numberOfFollowersOnFarcaster ? isFarcasterFollowerCountAbove : true) &&
        (otherTokens ? isTokensHold?.every(({ isHold }) => isHold) : true) &&
        (specifcNFTs
          ? isSpecificNFTsHold?.every(({ isHold }) => isHold)
          : true),
    error,
  };
}
