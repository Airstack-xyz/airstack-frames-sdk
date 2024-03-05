import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterChannelsByParticipantQuery as query } from "../graphql/query/farcasterChannelsByParticipant.query";
import type {
  FarcasterChannelsByParticipantQuery,
  FarcasterChannelsByParticipantQueryVariables,
} from "../graphql/types";
import { iteratePagination } from "../utils/iteratePagination";
import {
  FarcasterChannelsByParticipantInput,
  FarcasterChannelsByParticipantOutput,
  FarcasterChannelsByParticipantOutputData,
} from "../types";
import { formatFarcasterChannelsByParticipant } from "../utils/formatFarcasterChannelsByParticipant";

/**
 * @description Fetch Farcaster channels by participants
 * @example
 * const { data, error } = await getFarcasterChannelParticipants({
 *  channel: 1,
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
 * @returns Farcaster followers array with their profile details
 */
export async function getFarcasterChannelsByParticipant(
  input: FarcasterChannelsByParticipantInput
): Promise<FarcasterChannelsByParticipantOutput> {
  const { fid, actionType, lastActionTimestamp, limit } = input ?? {};
  const { before, after } = lastActionTimestamp ?? {};
  const variable: FarcasterChannelsByParticipantQueryVariables = {
    identity: `fc_fid:${fid}`,
    actionType,
    before: before ?? new Date()?.toISOString()?.split(".")[0] + "Z",
    after,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterChannelsByParticipant(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        FarcasterChannelsByParticipantOutputData[] | null | undefined,
        FarcasterChannelsByParticipantQuery
      >(getPrevPage, formatFarcasterChannelsByParticipant),
    getNextPage: async () =>
      await iteratePagination<
        FarcasterChannelsByParticipantOutputData[] | null | undefined,
        FarcasterChannelsByParticipantQuery
      >(getNextPage, formatFarcasterChannelsByParticipant),
  };
}
