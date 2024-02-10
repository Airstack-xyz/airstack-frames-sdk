export const farcasterUserPoaps = /* GraphQL */ `
  query FarcasterUserPOAPs($identity: Identity!, $limit: Int = 200) {
    Poaps(
      input: {
        filter: { owner: { _eq: $identity } }
        blockchain: ALL
        limit: $limit
      }
    ) {
      Poap {
        poapEvent {
          eventName
          eventId
          eventURL
          isVirtualEvent
          startDate
          endDate
          city
        }
      }
    }
  }
`;
