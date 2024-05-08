export const farcasterUserLikes = /* GraphQL */ `
  query FarcasterUserLikes($identity: Identity!, $limit: Int! = 200) {
    FarcasterReactions(
      input: {
        filter: { criteria: liked, reactedBy: { _eq: $identity } }
        blockchain: ALL
        limit: $limit
      }
    ) {
      Reaction {
        cast {
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
  }
`;
