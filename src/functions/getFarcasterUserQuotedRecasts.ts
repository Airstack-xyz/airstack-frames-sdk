import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserQuotedRecasts as query } from "../graphql/query/farcasterUserQuotedRecasts.query";
import { iteratePagination } from "../utils/iteratePagination";
import {
  FarcasterUserQuotedRecastsOutput,
  FarcasterUserQuotedRecastsOutputData,
  farcasterUserQuotedRecastsInput,
} from "../types";
import {
  FarcasterUserQuotedRecastsQuery,
  FarcasterUserQuotedRecastsQueryVariables,
} from "../graphql/types";
import { formatFarcasterUserQuotedRecasts } from "../utils/formatFarcasterUserQuotedRecasts";

/**
 * @description Fetch all the quoted recasts casted by a Farcaster user
 * @example
 * const { data, error } = await getFarcasterUserQuotedRecasts({
 *  fid: 1,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of Farcaster quoted recasts casted by a Farcaster user
 */
export async function getFarcasterUserQuotedRecasts(
  input: farcasterUserQuotedRecastsInput
): Promise<FarcasterUserQuotedRecastsOutput> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterUserQuotedRecastsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserQuotedRecasts(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserQuotedRecastsOutputData | null)[] | null | undefined,
        FarcasterUserQuotedRecastsQuery
      >(getPrevPage, formatFarcasterUserQuotedRecasts),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserQuotedRecastsOutputData | null)[] | null | undefined,
        FarcasterUserQuotedRecastsQuery
      >(getNextPage, formatFarcasterUserQuotedRecasts),
  };
}
