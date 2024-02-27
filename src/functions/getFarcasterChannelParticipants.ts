import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterChannelParticipantsQuery as query } from "../graphql/query/farcasterChannelParticipants.query";
import type {
  FarcasterChannelParticipantsQuery,
  FarcasterChannelParticipantsQueryVariables,
} from "../graphql/types";
import { iteratePagination } from "../utils/iteratePagination";
import {
  FarcasterChannelParticipantsInput,
  FarcasterChannelParticipantsOutput,
  FarcasterChannelParticipantsOutputData,
} from "../types";
import { formatFarcasterChannelParticipants } from "../utils/formatFarcasterChannelParticipants";

/**
 * @description Fetch Farcaster followers of a gived FID
 * @example
 * const { data, error } = await getFarcasterFollowers({
 *  fid: 1,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns Farcaster followers array with their profile details
 */
export async function getFarcasterChannelParticipants(
  input: FarcasterChannelParticipantsInput
): Promise<FarcasterChannelParticipantsOutput> {
  const { channel, actionType, lastActionTimestamp, limit } = input ?? {};
  const { before, after } = lastActionTimestamp ?? {};
  const variable: FarcasterChannelParticipantsQueryVariables = {
    channel,
    actionType,
    before: before ?? new Date()?.toISOString()?.split(".")[0] + "Z",
    after,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterChannelParticipants(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        FarcasterChannelParticipantsOutputData[] | null | undefined,
        FarcasterChannelParticipantsQuery
      >(getPrevPage, formatFarcasterChannelParticipants),
    getNextPage: async () =>
      await iteratePagination<
        FarcasterChannelParticipantsOutputData[] | null | undefined,
        FarcasterChannelParticipantsQuery
      >(getNextPage, formatFarcasterChannelParticipants),
  };
}
