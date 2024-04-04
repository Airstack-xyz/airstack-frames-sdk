export const TrendingsTokensQuery = /* GraphQL */ `
  query TrendingTokens(
    $transferType: TrendingTokensTransferType!
    $timeFrame: TimeFrame!
    $criteria: TrendingTokensCriteria!
    $audience: Audience!
    $limit: Int = 200
    $swappable: Boolean
  ) {
    TrendingTokens(
      input: {
        swappable: { _eq: $swappable }
        transferType: $transferType
        timeFrame: $timeFrame
        audience: $audience
        blockchain: base
        criteria: $criteria
        limit: $limit
      }
    ) {
      TrendingToken {
        address
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
