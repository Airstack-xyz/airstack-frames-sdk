import { TrendingSwapsBlockchain } from "../types";

export const TrendingSwapsQuery = (
  chains: TrendingSwapsBlockchain[] | null | undefined = [
    TrendingSwapsBlockchain.Ethereum,
    TrendingSwapsBlockchain.Base,
  ]
) =>
  /* GraphQL */ `
  query TrendingSwaps(
    $criteria: TrendingSwapsCriteria!
    $timeFrame: TimeFrame!
    $limit: Int = 200
  ) {` +
  chains
    ?.map(
      (chain) => `${chain}: TrendingSwaps(
      input: {
        timeFrame: $timeFrame
        criteria: $criteria
        blockchain: ${chain}
        limit: $limit
      }
    ) {
      TrendingSwap {
        address
        blockchain
        buyTransactionCount
        buyVolume
        sellTransactionCount
        sellVolume
        timeFrom
        timeTo
        totalTransactionCount
        totalUniqueWallets
        totalVolume
        uniqueBuyWallets
        uniqueSellWallets
        token {
          name
          symbol
        }
      }
    }
    `
    )
    .join("") +
  `
}
`;
