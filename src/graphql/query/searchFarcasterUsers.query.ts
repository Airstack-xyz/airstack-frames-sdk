export const searchFarcasterUsersQuery = /* GraphQL */ `
  query SearchFarcasterUsers($profileName: String!, $limit: Int = 200) {
    Socials(
      input: {
        filter: {
          profileName: { _regex: $profileName }
          dappName: { _eq: farcaster }
        }
        blockchain: ethereum
        order: { followerCount: DESC }
        limit: $limit
      }
    ) {
      Social {
        profileName
        fid: userId
        fnames
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
`;
