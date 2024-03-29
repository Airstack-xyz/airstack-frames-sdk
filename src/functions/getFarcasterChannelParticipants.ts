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
 * @description Fetch Farcaster channels participants
 * @example
 * const { data, error } = await getFarcasterChannelParticipants({
 *  channel: "airstack",
 *  actionType: [FarcasterChannelActionType.Cast],
 *  lastActionTimestamp: {
 *    after: "2024-02-01T00:00:00Z",
 *    before: "2024-02-28T00:00:00Z",
 *  },
 *  limit: 100,
 * });
 * @param {Number} input.channel Farcaster channel ID, e.g. /airstack channel ID is "airstack"
 * @param {FarcasterChannelActionType[]} [input.actionType] Farcaster channel action type, either cast or reply
 * @param {Time} [input.lastActionTimestamp.before] get participants that participate before the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z"
 * @param {Time} [input.lastActionTimestamp.after] get participants that participate after the specified input. ISO 8601 date string, e.g. "2024-02-28T00:00:00Z"
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns Farcaster channels that the Farcaster user have participated in, either casted or replied to a cast.
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
