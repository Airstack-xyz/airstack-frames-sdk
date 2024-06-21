import { fetchQuery } from "@airstack/node";
import {
  CheckChannelActionsByFarcasterUserQuery,
  CheckChannelActionsByFarcasterUserQueryVariables,
} from "../graphql/types";
import {
  CheckChannelActionsByFarcasterUserInput,
  CheckChannelActionsByFarcasterUserOutput,
} from "../types";
import { checkChannelActionsByFarcasterUserQuery as query } from "../graphql/query/checkChannelActionsByFarcasterUser.query";

/**
 * @description Check If a Farcaster user of a given FID has taken any channel action (cast, reply, of follow) on a specific channel.
 * @example
 * const { data, error } = await checkChannelActionsByFarcasterUser({
 *  fid: 1,
 *  channelActions: [FarcasterChannelActionType.Cast],
 *  channelId: "airstack",
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<Number>} input.channelActions List of channel actions to check if the user has taken any of the listed actions
 * @param {String} input.channelId The Farcaster Channel ID
 * @returns List of the actions and return status of whether user takes any of the listed action on the channel, returned in `isActionTaken` field
 */
export async function checkChannelActionsByFarcasterUser(
  input: CheckChannelActionsByFarcasterUserInput
): Promise<CheckChannelActionsByFarcasterUserOutput> {
  const { fid, channelActions, channelId } = input ?? {};
  const variable: CheckChannelActionsByFarcasterUserQueryVariables = {
    identity: `fc_fid:${fid}`,
    channelActions,
    channelId,
  };
  const { data, error } = await fetchQuery(query, variable);
  const { channelActions: channelActionsRes } =
    (data as CheckChannelActionsByFarcasterUserQuery)
      ?.FarcasterChannelParticipants?.FarcasterChannelParticipant?.[0] ?? {};
  return {
    data: error
      ? null
      : channelActions?.map((action) => ({
          channelAction: action,
          isActionTaken: channelActionsRes?.includes(action) ?? false,
        })),
    error,
  };
}
