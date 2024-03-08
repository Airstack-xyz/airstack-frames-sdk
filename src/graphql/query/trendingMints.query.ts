export const TrendingMintsQuery = /* GraphQL */ `
  query TrendingMints(
    $timeFrame: TimeFrame!
    $audience: Audience!
    $criteria: TrendingMintsCriteria!
    $limit: Int = 200
  ) {
    TrendingMints(
      input: {
        timeFrame: $timeFrame
        audience: $audience
        blockchain: base
        criteria: $criteria
        limit: $limit
      }
    ) {
      TrendingMint {
        address
        erc1155TokenID
        criteriaCount
        timeFrom
        timeTo
        token {
          name
          symbol
          type
        }
      }
    }
  }
`;
