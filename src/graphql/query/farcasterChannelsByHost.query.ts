export const farcasterChannelsByHostQuery = /* GraphQL */ `
  query FarcasterChannelsByHost(
    $host: String!
    $before: Time
    $after: Time = "1970-01-01T00:00:00Z"
    $limit: Int = 200
  ) {
    FarcasterChannels(
      input: {
        filter: {
          createdAtTimestamp: { _lte: $before, _gte: $after }
          leadId: { _eq: $host }
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
        warpcastUrl: channelId
      }
    }
  }
`;
