export const farcasterUserRecasts = /* GraphQL */ `
  query FarcasterUserRecasts($identity: Identity!, $limit: Int! = 200) {
    FarcasterReactions(
      input: {
        filter: { criteria: recasted, reactedBy: { _eq: $identity } }
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
