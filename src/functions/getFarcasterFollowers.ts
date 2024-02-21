import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterFollowersQuery as query } from "../graphql/query/farcasterFollowers.query";
import type {
  FarcasterFollowersQuery,
  FarcasterFollowersQueryVariables,
} from "../graphql/types";
import { formatFarcasterFollowers } from "../utils/formatFarcasterFollowers";
import { iteratePagination } from "../utils/iteratePagination";
import {
  FarcasterFollowersInput,
  FarcasterFollowersOutput,
  IteratePaginationResponse,
} from "../types";

/**
 * @description Fetch Farcaster followers of a gived FID
 * @example
 * const { data: followers, error } = await getFarcasterFollowers({
 *  fid: 1,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Number} input.limit Number of JSON responses returned per API call
 * @returns Farcaster followers array with their profile details
 */
export async function getFarcasterFollowers(
  input: FarcasterFollowersInput
): Promise<
  IteratePaginationResponse<FarcasterFollowersOutput[] | null | undefined>
> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterFollowersQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterFollowers(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        FarcasterFollowersOutput[] | null | undefined,
        FarcasterFollowersQuery
      >(getPrevPage, formatFarcasterFollowers),
    getNextPage: async () =>
      await iteratePagination<
        FarcasterFollowersOutput[] | null | undefined,
        FarcasterFollowersQuery
      >(getNextPage, formatFarcasterFollowers),
  };
}
