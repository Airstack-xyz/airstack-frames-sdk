export const farcasterUserRecasts = /* GraphQL */ `
  query FarcasterUserRecasts($identity: Identity!) {
    FarcasterReactions(
      input: {
        filter: { criteria: recasted, reactedBy: { _eq: $identity } }
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
