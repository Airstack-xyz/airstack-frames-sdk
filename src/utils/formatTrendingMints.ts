import { TrendingMintsQuery } from "../graphql/types";

export function formatTrendingMints(data: TrendingMintsQuery) {
  return (
    data?.TrendingMints?.TrendingMint?.map(
      ({ address, erc1155TokenID, criteriaCount, timeFrom, timeTo, token }) => {
        const { name, symbol, type } = token ?? {};
        return {
          address,
          erc1155TokenID,
          criteriaCount,
          timeFrom,
          timeTo,
          name,
          symbol,
          type,
        };
      }
    ) ?? []
  );
}
