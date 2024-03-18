import { fetchQueryWithPagination } from "@airstack/node";
import { TrendingsTokensQuery as query } from "../graphql/query/trendingTokens.query";
import type {
  TrendingTokensQuery,
  TrendingTokensQueryVariables,
} from "../graphql/types";
import { iteratePagination } from "../utils/iteratePagination";
import {
  GetTrendingTokensOutputData,
  GetTrendingTokensInput,
  GetTrendingTokensOutput,
} from "../types";
import { formatTrendingTokens } from "../utils/formatTrendingTokens";

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
  input: GetTrendingTokensInput
): Promise<GetTrendingTokensOutput> {
  const { timeFrame, audience, criteria, transferType, limit } = input ?? {};
  const variable: TrendingTokensQueryVariables = {
    timeFrame,
    audience,
    criteria,
    transferType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatTrendingTokens(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        GetTrendingTokensOutputData[] | null | undefined,
        TrendingTokensQuery
      >(getPrevPage, formatTrendingTokens),
    getNextPage: async () =>
      await iteratePagination<
        GetTrendingTokensOutputData[] | null | undefined,
        TrendingTokensQuery
      >(getNextPage, formatTrendingTokens),
  };
}
