export const checkIsFollowedByFarcasterUserQuery = /* GraphQL */ `
  query CheckIsFollowedByFarcasterUser(
    $identity: Identity!
    $isFollowedBy: [Identity!]
  ) {
    Wallet(input: { identity: $identity, blockchain: ethereum }) {
      socialFollowings(
        input: {
          filter: {
            identity: { _in: $isFollowedBy }
            dappName: { _eq: farcaster }
          }
          limit: 200
        }
      ) {
        Following {
          followerAddress {
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
