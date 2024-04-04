export const numberOfFarcasterFollowersQuery = /* GraphQL */ `
  query NumberOfFarcasterFollowers(
    $identity: Identity!
    $followerCountCriteria: Int_Comparator_Exp!
  ) {
    Socials(
      input: {
        filter: {
          identity: { _eq: $identity }
          dappName: { _eq: farcaster }
          followerCount: $followerCountCriteria
        }
        blockchain: ethereum
      }
    ) {
      Social {
        followerCount
      }
    }
  }
`;
