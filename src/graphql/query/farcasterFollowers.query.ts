export const farcasterFollowersQuery = /* GraphQL */ `
  query FarcasterFollowers($identity: Identity!, $limit: Int! = 200) {
    SocialFollowers(
      input: {
        filter: { identity: { _eq: $identity }, dappName: { _eq: farcaster } }
        blockchain: ALL
        limit: $limit
      }
    ) {
      Follower {
        followerAddress {
          socials(input: { filter: { dappName: { _eq: farcaster } } }) {
            profileName
            fnames
            userId
            profileImageContentValue {
              image {
                extraSmall
                small
                medium
                large
                original
              }
            }
            custodyAddress: userAddress
            connectedAddresses {
              address
              blockchain
              chainId
              timestamp
            }
            userAssociatedAddresses
            followerCount
            followingCount
          }
        }
      }
    }
  }
`;
