import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserRecasts as query } from "../graphql/query/farcasterUserRecasts.query";
import { iteratePagination } from "../utils/iteratePagination";
import {
  FarcasterUserRecastsOutput,
  FarcasterUserRecastsOutputData,
  FarcasterUserRecastsInput,
} from "../types";
import {
  FarcasterUserRecastsQuery,
  FarcasterUserRecastsQueryVariables,
} from "../graphql/types";
import { formatFarcasterUserRecasts } from "../utils/formatFarcasterUserRecasts";

/**
 * @description Fetch all the recasts casted by a Farcaster user
 * @example
 * const { data, error } = await getFarcasterUserRecasts({
 *  fid: 1,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of Farcaster recasts casted by a Farcaster user
 */
export async function getFarcasterUserRecasts(
  input: FarcasterUserRecastsInput
): Promise<FarcasterUserRecastsOutput> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterUserRecastsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserRecasts(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserRecastsOutputData | null)[] | null | undefined,
        FarcasterUserRecastsQuery
      >(getPrevPage, formatFarcasterUserRecasts),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserRecastsOutputData | null)[] | null | undefined,
        FarcasterUserRecastsQuery
      >(getNextPage, formatFarcasterUserRecasts),
  };
}
