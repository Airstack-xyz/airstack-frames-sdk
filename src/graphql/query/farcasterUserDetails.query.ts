export const farcasterUserDetailsQuery = /* GraphQL */ `
  query FarcasterUserDetails($fid: String!) {
    Socials(
      input: {
        filter: { userId: { _eq: $fid }, dappName: { _eq: farcaster } }
        blockchain: ethereum
      }
    ) {
      Social {
        profileName
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
