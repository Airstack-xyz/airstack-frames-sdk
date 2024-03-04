import { fetchQueryWithPagination } from "@airstack/node";
import { searchFarcasterChannelsQuery as query } from "../graphql/query/searchFarcasterChannels.query";
import type {
  SearchFarcasterChannelsQuery,
  SearchFarcasterChannelsQueryVariables,
} from "../graphql/types";
import { iteratePagination } from "../utils/iteratePagination";
import {
  SearchFarcasterChannelsOutputData,
  SearchFarcasterChannelsOutput,
  SearchFarcasterChannelsInput,
} from "../types";
import { formatSearchFarcasterChannels } from "../utils/formatSearchFarcasterChannels";

/**
 * @description Fetch Farcaster followers of a gived FID
 * @example
 * const { data, error } = await searchFarcasterChannels({
 *  channel: "air",
 *  createdAtTimestamp: {
 *    after: "2024-02-01T00:00:00Z",
 *    before: "2024-02-28T00:00:00Z",
 *  },
 *  limit: 100,
 * });
 * @param {Number} input.channel Keywords to search Farcaster channel by name
 * @param {Time} [input.createdAtTimestamp.before] get channels created before the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z"
 * @param {Time} [input.createdAtTimestamp.after] get channels created after the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z"
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns Farcaster channels that have name matched the input keyword
 */
export async function searchFarcasterChannels(
  input: SearchFarcasterChannelsInput
): Promise<SearchFarcasterChannelsOutput> {
  const { channel, createdAtTimestamp, limit } = input ?? {};
  const { before, after } = createdAtTimestamp ?? {};
  const variable: SearchFarcasterChannelsQueryVariables = {
    channel,
    before: before ?? new Date()?.toISOString()?.split(".")[0] + "Z",
    after,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatSearchFarcasterChannels(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        SearchFarcasterChannelsOutputData[] | null | undefined,
        SearchFarcasterChannelsQuery
      >(getPrevPage, formatSearchFarcasterChannels),
    getNextPage: async () =>
      await iteratePagination<
        SearchFarcasterChannelsOutputData[] | null | undefined,
        SearchFarcasterChannelsQuery
      >(getNextPage, formatSearchFarcasterChannels),
  };
}
