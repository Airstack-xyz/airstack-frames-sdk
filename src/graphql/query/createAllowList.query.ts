export const createAllowListQuery = /* GraphQL */ `
  query CreateAllowList(
    $identity: Identity!
    $eventIds: [String!]
    $isFollowingOnFarcaster: [Identity!]
    $fid: String!
    $followerCountOnFarcaster: Int!
  ) {
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
    numberOfFollowersOnFarcaster: Socials(
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
    }
  }
`;
