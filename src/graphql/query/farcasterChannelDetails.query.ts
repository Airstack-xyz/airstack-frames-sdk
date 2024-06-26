export const farcasterChannelDetailsQuery = /* GraphQL */ `
  query FarcasterChannelDetails($channel: String!) {
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
`;
