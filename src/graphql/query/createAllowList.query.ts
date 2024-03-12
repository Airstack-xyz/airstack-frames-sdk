import { AllowListCriteria, TokenBlockchain } from "../../types";

export const createAllowListQuery = (
  allowListCriteria: AllowListCriteria,
  chains: TokenBlockchain[]
) => {
  const {
    eventIds,
    isFollowingOnFarcaster,
    numberOfFollowersOnFarcaster,
    tokens,
  } = allowListCriteria ?? {};
  return (
    `
    query CreateAllowList(
      ` +
    ((eventIds ?? [])?.length > 0 ||
    (isFollowingOnFarcaster ?? [])?.length > 0 ||
    (tokens ?? [])?.length > 0
      ? `
      $identity: Identity!
      `
      : "") +
    ((eventIds ?? [])?.length > 0
      ? `
      $eventIds: [String!]
      `
      : "") +
    ((isFollowingOnFarcaster ?? [])?.length > 0
      ? `
      $isFollowingOnFarcaster: [Identity!]
      `
      : "") +
    (numberOfFollowersOnFarcaster
      ? `
      $fid: String!
      `
      : "") +
    (numberOfFollowersOnFarcaster
      ? `
      $followerCountOnFarcaster: Int!
      `
      : "") +
    `${chains?.map?.((chain) => `$${chain}Tokens: [Address!]`).join("\n")}` +
    `
    ) {
      ` +
    ((eventIds ?? [])?.length > 0
      ? `
      poaps: Poaps(
        input: {
          filter: { owner: { _eq: $identity }, eventId: { _in: $eventIds } }
          blockchain: ALL
          limit: 200
        }
      ) {
        Poap {
          eventId
        }
      }
      `
      : "") +
    ((isFollowingOnFarcaster ?? [])?.length > 0
      ? `
      isFollowingOnFarcaster: Wallet(
        input: { identity: $identity, blockchain: ethereum }
      ) {
        socialFollowers(
          input: {
            filter: {
              identity: { _in: $isFollowingOnFarcaster }
              dappName: { _eq: farcaster }
            }
            limit: 200
          }
        ) {
          Follower {
            followingAddress {
              farcaster: socials(
                input: { filter: { dappName: { _eq: farcaster } } }
              ) {
                fid: userId
              }
            }
          }
        }
      }
      `
      : "") +
    (numberOfFollowersOnFarcaster
      ? `
      numberOfFollowersOnFC: Socials(
        input: {
          filter: {
            userId: { _eq: $fid }
            dappName: { _eq: farcaster }
            followerCount: { _gte: $followerCountOnFarcaster }
          }
          blockchain: ethereum
        }
      ) {
        Social {
          followerCount
        }
      }`
      : "") +
    chains
      ?.map(
        (chain) => `
    ${chain}: TokenBalances(
      input: {
        filter: {
          owner: { _eq: $identity }
          tokenAddress: { _in: $${chain}Tokens }
        }
        blockchain: ${chain}
        limit: 200
      }
    ) {
      TokenBalance {
        blockchain
        tokenAddress
        amount
      }
    }`
      )
      ?.join("") +
    `
    }
  `
  );
};
