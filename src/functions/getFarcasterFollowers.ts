import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterFollowersQuery as query } from "../graphql/query/farcasterFollowers.query";
import type { FarcasterFollowersQueryVariables } from "../graphql/types";
import { formatFarcasterFollowers } from "../utils/formatFarcasterFollowers";
import {
  iteratePagination,
  IteratePaginationResponse,
} from "../utils/iteratePagination";

export interface FarcasterFollowersInput {
  fid: number;
  limit?: number;
}

export interface FarcasterFollowersOutputData {
  profileName: string | null | undefined;
  fid: number;
  fnames: (string | null)[] | null | undefined;
  userAssociatedAddresses: string[] | null | undefined;
  followerCount: number | null | undefined;
  followingCount: number | null | undefined;
  profileImage:
    | {
        extraSmall: string | null;
        small: string | null;
        medium: string | null;
        large: string | null;
        original: string | null | undefined;
      }
    | null
    | undefined;
}

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
  IteratePaginationResponse<FarcasterFollowersOutputData[] | null | undefined>
> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterFollowersQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterFollowers(data, fid),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        FarcasterFollowersOutputData[] | null | undefined
      >(fid, getPrevPage, formatFarcasterFollowers),
    getNextPage: async () =>
      await iteratePagination<
        FarcasterFollowersOutputData[] | null | undefined
      >(fid, getNextPage, formatFarcasterFollowers),
  };
}
