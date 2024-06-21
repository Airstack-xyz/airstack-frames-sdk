export const checkChannelActionsByFarcasterUserQuery = /* GraphQL */ `
  query CheckChannelActionsByFarcasterUser(
    $channelActions: [FarcasterChannelActionType!]
    $identity: Identity
    $channelId: String
  ) {
    FarcasterChannelParticipants(
      input: {
        filter: {
          channelActions: { _in: $channelActions }
          participant: { _eq: $identity }
          channelId: { _eq: $channelId }
        }
        blockchain: ALL
      }
    ) {
      FarcasterChannelParticipant {
        channelActions
      }
    }
  }
`;
