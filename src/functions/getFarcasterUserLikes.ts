export const farcasterUserLikes = /* GraphQL */ `
  query FarcasterUserLikes($identity: Identity!) {
    FarcasterReactions(
      input: {
        filter: { criteria: liked, reactedBy: { _eq: $identity } }
        blockchain: ALL
        limit: 200
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
