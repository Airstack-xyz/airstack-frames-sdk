export const checkCastReactionsByFarcasterUserQuery = /* GraphQL */ `
  query CheckCastReactionsByFarcasterUser(
    $castHashes: [String!]
    $criteria: FarcasterReactionCriteria!
    $identity: Identity!
  ) {
    FarcasterReactions(
      input: {
        filter: {
          criteria: $criteria
          castHash: { _in: $castHashes }
          reactedBy: { _eq: $identity }
        }
        blockchain: ALL
      }
    ) {
      Reaction {
        cast {
          castedAtTimestamp
          hash
        }
      }
    }
  }
`;
