export const farcasterUserQuotedRecasts = /* GraphQL */ `
  query FarcasterUserQuotedRecasts($identity: Identity!, $limit: Int! = 200) {
    FarcasterQuotedRecasts(
      input: {
        filter: { recastedBy: { _eq: $identity } }
        blockchain: ALL
        limit: $limit
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
