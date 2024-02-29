export const searchFarcasterChannelsQuery = /* GraphQL */ `
  query SearchFarcasterChannels(
    $channel: String!
    $before: Time
    $after: Time = "1970-01-01T00:00:00Z"
    $limit: Int = 200
  ) {
    FarcasterChannels(
      input: {
        filter: {
          name: { _regex: $channel }
          createdAtTimestamp: { _lte: $before, _gte: $after }
        }
        blockchain: ALL
        limit: $limit
      }
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
        channelId
      }
    }
  }
`;
