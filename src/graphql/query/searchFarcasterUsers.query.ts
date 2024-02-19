export const searchFarcasterUsersQuery = /* GraphQL */ `
  query SearchFarcasterUsers($profileName: String!) {
    Socials(
      input: {
        filter: {
          profileName: { _regex: $profileName }
          dappName: { _eq: farcaster }
        }
        blockchain: ethereum
        order: { followerCount: DESC }
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
        userAssociatedAddresses
        followerCount
        followingCount
      }
    }
  }
`;
