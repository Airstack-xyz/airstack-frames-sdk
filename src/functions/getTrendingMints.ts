import { fetchQueryWithPagination } from "@airstack/node";
import { TrendingMintsQuery as query } from "../graphql/query/trendingMints.query";
import type {
  TrendingMintsQuery,
  TrendingMintsQueryVariables,
} from "../graphql/types";
import { iteratePagination } from "../utils/iteratePagination";
import {
  GetTrendingMintsInput,
  GetTrendingMintsOutputData,
  GetTrendingMintsOutput,
} from "../types";
import { formatTrendingMints } from "../utils/formatTrendingMints";

/**
 * @description Get Trending Mints in A Given Time Frame
 * @example
 * const { data, error } = await getTrendingMints({
 *  audience: Audience.All,
 *  criteria: Criteria.UniqueWallets,
 *  timeFrame: TimeFrame.OneDay,
  });
 * @param {Audience} input.audience The audience to get trending mints for
 * @param {Criteria} input.criteria The criteria to analyze and sort trending mints
 * @param {TimeFrame} input.timeFrame The time frame to get trending mints for
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns All the trending tokens that is being minted the most in a given time frame
 */
export async function getTrendingMints(
  input: GetTrendingMintsInput
): Promise<GetTrendingMintsOutput> {
  const { timeFrame, audience, criteria, limit } = input ?? {};
  const variable: TrendingMintsQueryVariables = {
    timeFrame,
    audience,
    criteria,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatTrendingMints(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        GetTrendingMintsOutputData[] | null | undefined,
        TrendingMintsQuery
      >(getPrevPage, formatTrendingMints),
    getNextPage: async () =>
      await iteratePagination<
        GetTrendingMintsOutputData[] | null | undefined,
        TrendingMintsQuery
      >(getNextPage, formatTrendingMints),
  };
}
