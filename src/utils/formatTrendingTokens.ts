import { TrendingTokensQuery } from "../graphql/types";

export function formatTrendingTokens(data: TrendingTokensQuery) {
  return (
    data?.TrendingTokens?.TrendingToken?.map(
      ({ address, criteriaCount, timeFrom, timeTo, token }) => {
        const { name, symbol, type } = token ?? {};
        return {
          address,
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
