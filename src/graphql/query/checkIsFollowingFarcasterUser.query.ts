export const checkIsFollowingFarcasterUser = /* GraphQL */ `
  query CheckIsFollowingFarcasterUser(
    $identity: Identity!
    $isFollowing: [Identity!]
  ) {
    Wallet(input: { identity: $identity, blockchain: ethereum }) {
      socialFollowers(
        input: {
          filter: {
            identity: { _in: $isFollowing }
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
  }
`;
