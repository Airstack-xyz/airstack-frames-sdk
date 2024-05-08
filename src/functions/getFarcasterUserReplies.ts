import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserReplies as query } from "../graphql/query/farcasterUserReplies.query";
import { iteratePagination } from "../utils/iteratePagination";
import {
  FarcasterUserRepliesInput,
  FarcasterUserRepliesOutput,
  FarcasterUserRepliesOutputData,
} from "../types";
import {
  FarcasterUserRepliesQuery,
  FarcasterUserRepliesQueryVariables,
} from "../graphql/types";
import { formatFarcasterUserReplies } from "../utils/formatFarcasterUserReplies";

/**
 * @description Fetch all the replies casted by a Farcaster user
 * @example
 * const { data, error } = await getFarcasterUserReplies({
 *  fid: 1,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of Farcaster replies casted by a Farcaster user
 */
export async function getFarcasterUserReplies(
  input: FarcasterUserRepliesInput
): Promise<FarcasterUserRepliesOutput> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterUserRepliesQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserReplies(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserRepliesOutputData | null)[] | null | undefined,
        FarcasterUserRepliesQuery
      >(getPrevPage, formatFarcasterUserReplies),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserRepliesOutputData | null)[] | null | undefined,
        FarcasterUserRepliesQuery
      >(getNextPage, formatFarcasterUserReplies),
  };
}
