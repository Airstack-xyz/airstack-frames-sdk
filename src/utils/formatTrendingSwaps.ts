import { TrendingSwapsQuery } from "../types";

export function formatTrendingSwaps(data: TrendingSwapsQuery) {
  const { ethereum, base } = data ?? {};
  return [
    ...(ethereum?.TrendingSwap?.map(
      ({
        address,
        blockchain,
        buyTransactionCount,
        buyVolume,
        sellTransactionCount,
        sellVolume,
        timeFrom,
        timeTo,
        totalTransactionCount,
        totalUniqueWallets,
        totalVolume,
        uniqueBuyWallets,
        uniqueSellWallets,
        token,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          address,
          blockchain,
          buyTransactionCount,
          buyVolume,
          sellTransactionCount,
          sellVolume,
          timeFrom,
          timeTo,
          totalTransactionCount,
          totalUniqueWallets,
          totalVolume,
          uniqueBuyWallets,
          uniqueSellWallets,
          name,
          symbol,
        };
      }
    ) ?? []),
    ...(base?.TrendingSwap?.map(
      ({
        address,
        blockchain,
        buyTransactionCount,
        buyVolume,
        sellTransactionCount,
        sellVolume,
        timeFrom,
        timeTo,
        totalTransactionCount,
        totalUniqueWallets,
        totalVolume,
        uniqueBuyWallets,
        uniqueSellWallets,
        token,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          address,
          blockchain,
          buyTransactionCount,
          buyVolume,
          sellTransactionCount,
          sellVolume,
          timeFrom,
          timeTo,
          totalTransactionCount,
          totalUniqueWallets,
          totalVolume,
          uniqueBuyWallets,
          uniqueSellWallets,
          name,
          symbol,
        };
      }
    ) ?? []),
  ];
}
