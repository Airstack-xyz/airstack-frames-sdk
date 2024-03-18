import { fetchQueryWithPagination } from "@airstack/node";
import { TrendingsTokensQuery as query } from "../graphql/query/trendingTokens.query";
import { iteratePagination } from "../utils/iteratePagination";
import {
  GetTrendingTokensOutputData,
  GetTrendingTokensInput,
  GetTrendingTokensOutput,
  TrendingTokensQuery,
  TrendingTokensQueryVariables,
} from "../types";
import { formatTrendingTokens } from "../utils/formatTrendingTokens";

/**
 * @description Get Trending Mints in A Given Time Frame
 * @example
 * const { data, error } = await getTrendingTokens({
 *  audience: Audience.All,
 *  criteria: Criteria.UniqueWallets,
 *  timeFrame: TimeFrame.OneDay,
 *  transferType: TransferType.ALL,
  });
 * @param {Audience} input.audience The audience to get trending tokens for
 * @param {Criteria} input.criteria The criteria to analyze and sort trending tokens
 * @param {TimeFrame} input.timeFrame The time frame to get trending tokens for
 * @param {TransferType} input.transferType The type of transfer to get trending tokens for
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns All the trending ERC20 tokens that is the most transferred in a given time frame
 */
export async function getTrendingTokens(
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
