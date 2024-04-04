import { fetchQueryWithPagination } from "@airstack/node";
import { TrendingSwapsQuery as query } from "../graphql/query/trendingSwaps.query";
import { iteratePagination } from "../utils/iteratePagination";
import {
  GetTrendingSwapsInput,
  GetTrendingSwapsOutput,
  GetTrendingSwapsOutputData,
  TrendingSwapsQueryVariables,
  TrendingSwapsQuery,
} from "../types";
import { formatTrendingSwaps } from "../utils/formatTrendingSwaps";

/**
 * @description Get Trending Swaps in A Given Time Frame
 * @example
 * const { data, error } = await getTrendingSwaps({
    chains: [TrendingSwapsBlockchain.Base],
    timeFrame: TimeFrame.EightHours,
    criteria: TrendingSwapsCriteria.BuyTransactionCount,
  });
 * @param {TrendingSwapsBlockchain[]} input.chains The blockchain to fetch trending swaps from
 * @param {TrendingSwapsCriteria} input.criteria The criteria to analyze and sort trending swaps
 * @param {TimeFrame} input.timeFrame The time frame to get trending swaps for
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns All the trending ERC20 tokens swapped in a given time frame
 */
export async function getTrendingSwaps(
  input: GetTrendingSwapsInput
): Promise<GetTrendingSwapsOutput> {
  const { timeFrame, chains, criteria, limit } = input ?? {};
  const variable: TrendingSwapsQueryVariables = {
    timeFrame,
    criteria,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatTrendingSwaps(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        GetTrendingSwapsOutputData[] | null | undefined,
        TrendingSwapsQuery
      >(getPrevPage, formatTrendingSwaps),
    getNextPage: async () =>
      await iteratePagination<
        GetTrendingSwapsOutputData[] | null | undefined,
        TrendingSwapsQuery
      >(getNextPage, formatTrendingSwaps),
  };
}
