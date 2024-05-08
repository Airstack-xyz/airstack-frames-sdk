export const farcasterUserQuotedRecasts = /* GraphQL */ `
  query FarcasterUserQuotedRecasts($identity: Identity!) {
    FarcasterQuotedRecasts(
      input: {
        filter: { recastedBy: { _eq: $identity } }
        blockchain: ALL
        limit: 200
      }
    ) {
      QuotedRecast {
        hash
        castedAtTimestamp
        embeds
        url
        text
        numberOfRecasts
        numberOfLikes
        numberOfReplies
        channel {
          channelId
        }
        mentions {
          fid
          position
        }
        frame {
          frameHash
          frameUrl
        }
      }
    }
  }
`;
