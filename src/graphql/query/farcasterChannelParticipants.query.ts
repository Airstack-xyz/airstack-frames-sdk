export const farcasterChannelParticipantsQuery = /* GraphQL */ `
  query MyQuery(
    $actionType: [FarcasterChannelActionType!] = [cast, reply]
    $before: Time
    $after: Time
    $channel: String
  ) {
    FarcasterChannelParticipants(
      input: {
        filter: {
          lastActionTimestamp: { _gte: $before, _lte: $after }
          channelActions: { _in: $actionType }
          channelId: { _eq: $channel }
        }
        blockchain: ALL
      }
    ) {
      FarcasterChannelParticipant {
        participant {
          profileName
          fnames
          userId
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
