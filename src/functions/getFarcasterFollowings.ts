import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterFollowingsQuery as query } from "../graphql/query/farcasterFollowings.query";
import type { FarcasterFollowingsQueryVariables } from "../graphql/types";
import { formatFarcasterFollowings } from "../utils/formatFarcasterFollowings";
import {
  iteratePagination,
  IteratePaginationResponse,
} from "../utils/iteratePagination";

export interface FarcasterFollowingsInput {
  fid: number;
  limit: number;
}

export interface FarcasterFollowingsOutputData {
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
export const getFarcasterFollowings = async (
  input: FarcasterFollowingsInput
): Promise<
  IteratePaginationResponse<FarcasterFollowingsOutputData[] | null | undefined>
> => {
  const { fid, limit } = input ?? {};
  const variable: FarcasterFollowingsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: formatFarcasterFollowings(data, fid),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        FarcasterFollowingsOutputData[] | null | undefined
      >(fid, getPrevPage, formatFarcasterFollowings),
    getNextPage: async () =>
      await iteratePagination<
        FarcasterFollowingsOutputData[] | null | undefined
      >(fid, getNextPage, formatFarcasterFollowings),
  };
};
