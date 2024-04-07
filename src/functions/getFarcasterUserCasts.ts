import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserCastsQuery as query } from "../graphql/query/farcasterUserCasts.query";
import { iteratePagination } from "../utils/iteratePagination";
import {
  FarcasterUserCastsInput,
  FarcasterUserCastsOutput,
  FarcasterUserCastsOutputData,
  FarcasterUserCastsQuery,
  FarcasterUserCastsQueryVariables,
} from "../types";
import { formatFarcasterUserCasts } from "../utils/formatFarcasterUserCasts";

/**
 * @description Fetch all the casts of a Farcaster user
 * @example
 * const { data, error } = await getFarcasterUserCasts({
 *  fid: 1,
 *  hasEmbeds: true,
 *  hasFrames: true,
 *  hasMentions: true,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Boolean} [input.hasEmbeds] Fetch casts with or without embeds. By default, it will fetch all.
 * @param {Boolean} [input.hasFrames] Fetch casts with or without frames. By default, it will fetch all.
 * @param {Boolean} [input.hasMentions] Fetch casts with or without mentions. By default, it will fetch all.
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of Farcaster casts casted by a Farcaster user
 */
export async function getFarcasterUserCasts(
  input: FarcasterUserCastsInput
): Promise<FarcasterUserCastsOutput> {
  const { fid, limit, hasEmbeds, hasFrames, hasMentions } = input ?? {};
  const variable: FarcasterUserCastsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
    ...(hasEmbeds !== undefined && { hasEmbeds }),
    ...(hasFrames !== undefined && { hasFrames }),
    ...(hasMentions !== undefined && { hasMentions }),
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(
      query({
        hasEmbeds,
        hasFrames,
        hasMentions,
      }),
      variable
    );
  return {
    data: error ? null : formatFarcasterUserCasts(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserCastsOutputData | null)[] | null | undefined,
        FarcasterUserCastsQuery
      >(getPrevPage, formatFarcasterUserCasts),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserCastsOutputData | null)[] | null | undefined,
        FarcasterUserCastsQuery
      >(getNextPage, formatFarcasterUserCasts),
  };
}
