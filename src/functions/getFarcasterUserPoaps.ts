import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserPoaps as query } from "../graphql/query/farcasterUserPoaps.query";
import {
  FarcasterUserPoaPsQuery,
  FarcasterUserPoaPsQueryVariables,
} from "../graphql/types";
import { iteratePagination } from "../utils/iteratePagination";
import { formatFarcasterUserPoaps } from "../utils/formatFarcasterUserPoaps";
import {
  FarcasterUserPoapsInput,
  FarcasterUserPoapsOutputData,
  FarcasterUserPoapsOutput,
} from "../types";

/**
 * @description Fetch Farcaster user's POAP balances of a gived FID
 * @example
 * const { data, error } = await getFarcasterUserPoaps({
 *  fid: 1,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of POAPs attended by Farcaster user
 */
export async function getFarcasterUserPoaps(
  input: FarcasterUserPoapsInput
): Promise<FarcasterUserPoapsOutput> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterUserPoaPsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserPoaps(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserPoapsOutputData | null)[] | null | undefined,
        FarcasterUserPoaPsQuery
      >(getPrevPage, formatFarcasterUserPoaps),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserPoapsOutputData | null)[] | null | undefined,
        FarcasterUserPoaPsQuery
      >(getNextPage, formatFarcasterUserPoaps),
  };
}
