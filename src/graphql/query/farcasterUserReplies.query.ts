export const farcasterUserReplies = /* GraphQL */ `
  query FarcasterUserReplies($identity: Identity!, $limit: Int! = 200) {
    FarcasterReplies(
      input: {
        filter: { repliedBy: { _eq: $identity } }
        blockchain: ALL
        limit: $limit
      }
    ) {
      Reply {
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
