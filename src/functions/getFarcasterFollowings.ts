import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterFollowingsQuery as query } from "../graphql/query/farcasterFollowings.query";
import type {
  FarcasterFollowingsQuery,
  FarcasterFollowingsQueryVariables,
} from "../graphql/types";
import { formatFarcasterFollowings } from "../utils/formatFarcasterFollowings";
import { iteratePagination } from "../utils/iteratePagination";
import {
  FarcasterFollowingsInput,
  FarcasterFollowingsOutput,
  IteratePaginationResponse,
} from "../types";

/**
 * @description Fetch Farcaster followings of a gived FID
 * @example
 * const { data: followers, error } = await getFarcasterFollowings({
 *  fid: 1,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Number} input.limit Number of JSON responses returned per API call
 * @returns Farcaster followings array with their profile details
 */
export async function getFarcasterFollowings(
  input: FarcasterFollowingsInput
): Promise<
  IteratePaginationResponse<FarcasterFollowingsOutput[] | null | undefined>
> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterFollowingsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterFollowings(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        FarcasterFollowingsOutput[] | null | undefined,
        FarcasterFollowingsQuery
      >(getPrevPage, formatFarcasterFollowings),
    getNextPage: async () =>
      await iteratePagination<
        FarcasterFollowingsOutput[] | null | undefined,
        FarcasterFollowingsQuery
      >(getNextPage, formatFarcasterFollowings),
  };
}
