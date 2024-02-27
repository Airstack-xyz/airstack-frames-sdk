export const farcasterChannelParticipantsQuery = /* GraphQL */ `
  query FarcasterChannelParticipants(
    $actionType: [FarcasterChannelActionType!] = [cast, reply]
    $before: Time
    $after: Time = "1970-01-01T00:00:00Z"
    $channel: String
    $limit: Int = 200
  ) {
    FarcasterChannelParticipants(
      input: {
        filter: {
          lastActionTimestamp: { _gte: $after, _lte: $before }
          channelActions: { _in: $actionType }
          channelId: { _eq: $channel }
        }
        blockchain: ALL
        limit: $limit
      }
    ) {
      FarcasterChannelParticipant {
        participant {
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
