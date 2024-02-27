export const farcasterChannelDetailsQuery = /* GraphQL */ `
  query FarcasterChannelDetailsQuery($channel: String!) {
    FarcasterChannels(
      input: { blockchain: ALL, filter: { channelId: { _eq: $channel } } }
    ) {
      FarcasterChannel {
        name
        description
        imageUrl
        createdAtTimestamp
        hosts: leadProfiles {
          profileName
          fnames
          fid: userId
          profileImage: profileImageContentValue {
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
  }
`;
