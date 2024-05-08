export const farcasterUserReplies = /* GraphQL */ `
  query FarcasterUserReplies($identity: Identity!) {
    FarcasterReplies(
      input: {
        filter: { repliedBy: { _eq: $identity } }
        blockchain: ALL
        limit: 200
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
