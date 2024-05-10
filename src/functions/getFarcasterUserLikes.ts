import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserLikes as query } from "../graphql/query/farcasterUserLikes.query";
import { iteratePagination } from "../utils/iteratePagination";
import {
  FarcasterUserLikesOutput,
  FarcasterUserLikesOutputData,
  FarcasterUserLikesInput,
} from "../types";
import {
  FarcasterUserLikesQuery,
  FarcasterUserLikesQueryVariables,
} from "../graphql/types";
import { formatFarcasterUserLikes } from "../utils/formatFarcasterUserLikes";

/**
 * @description Fetch all the casts liked by a Farcaster user
 * @example
 * const { data, error } = await getFarcasterUserLikes({
 *  fid: 1,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of Farcaster casts liked by a Farcaster user
 */
export async function getFarcasterUserLikes(
  input: FarcasterUserLikesInput
): Promise<FarcasterUserLikesOutput> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterUserLikesQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserLikes(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserLikesOutputData | null)[] | null | undefined,
        FarcasterUserLikesQuery
      >(getPrevPage, formatFarcasterUserLikes),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserLikesOutputData | null)[] | null | undefined,
        FarcasterUserLikesQuery
      >(getNextPage, formatFarcasterUserLikes),
  };
}
