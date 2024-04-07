export const farcasterUserCastsQuery = ({
  hasEmbeds,
  hasFrames,
  hasMentions,
}: {
  hasEmbeds?: boolean;
  hasFrames?: boolean;
  hasMentions?: boolean;
}) =>
  /* GraphQL */ `
  query MyQuery(
    $identity: Identity!
    $limit: Int = 200
    ` +
  (hasEmbeds !== undefined ? `$hasEmbeds: Boolean!` : "") +
  (hasFrames !== undefined ? `$hasFrames: Boolean!` : "") +
  (hasMentions !== undefined ? `$hasMentions: Boolean!` : "") +
  `    
  ) {
    FarcasterCasts(
      input: {
        filter: {
          castedBy: { _eq: $identity }
          ` +
  (hasFrames !== undefined ? `hasFrames: { _eq: $hasFrames }` : "") +
  (hasMentions !== undefined ? `hasMentions: { _eq: $hasMentions }` : "") +
  (hasEmbeds !== undefined ? `hasEmbeds: { _eq: $hasEmbeds }` : "") +
  `
        }
        blockchain: ALL
        limit: $limit
      }
    ) {
      Cast {
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
