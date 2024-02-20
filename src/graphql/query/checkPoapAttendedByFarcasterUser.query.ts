export const checkPoapAttendedByFarcasterUserQuery = /* GraphQL */ `
  query CheckPoapAttendedByFarcasterUser(
    $owner: Identity!
    $eventId: [String!]
  ) {
    Poaps(
      input: {
        filter: { owner: { _eq: $owner }, eventId: { _in: $eventId } }
        blockchain: ALL
        limit: 200
      }
    ) {
      Poap {
        eventId
      }
    }
  }
`;
