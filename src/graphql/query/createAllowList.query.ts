import type { AllowListCriteria } from "../../types";

export const createAllowListQuery = (allowListCriteria: AllowListCriteria) => {
  const { isFollowingOnFarcaster, numberOfFollowersOnFarcaster } =
    allowListCriteria ?? {};
  return `
    query CreateAllowList(
      ${
        (isFollowingOnFarcaster ?? [])?.length > 0
          ? `
      $identity: Identity!
      `
          : ""
      }
  }${
    (isFollowingOnFarcaster ?? [])?.length > 0
      ? `
      $isFollowingOnFarcaster: [Identity!]
      `
      : ""
  }${
    numberOfFollowersOnFarcaster
      ? `
      $fid: String!
      `
      : ""
  }${
    numberOfFollowersOnFarcaster
      ? `
      $followerCountOnFarcaster: Int!
      `
      : ""
  }
    ) {
  ${
    (isFollowingOnFarcaster ?? [])?.length > 0
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
      : ""
  }${
    numberOfFollowersOnFarcaster
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
      : ""
  }
    }
  `;
};
