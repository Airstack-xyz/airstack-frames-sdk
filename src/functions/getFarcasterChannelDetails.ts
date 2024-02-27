import { fetchQuery } from "@airstack/node";
import { farcasterChannelDetailsQuery as query } from "../graphql/query/farcasterChannelDetails.query";
import type {
  FarcasterChannelDetailsQuery,
  FarcasterChannelDetailsQueryVariables,
} from "../graphql/types";
import {
  FarcasterChannelDetailsInput,
  FarcasterChannelDetailsOutput,
} from "../types";

/**
 * @description Fetch Farcaster channel details provided fid
 * @example
 * const { data, error } = await getFarcasterChannelDetails({
 *  channel: "airstack"
 * });
 * @param {Number} input.channel Farcaster channel ID, e.g. /airstack channel ID is "airstack"
 * @returns Farcaster channel details, including name, description, warpcast URL, image URL, etc.
 */
export async function getFarcasterChannelDetails(
  input: FarcasterChannelDetailsInput
): Promise<FarcasterChannelDetailsOutput> {
  const { channel } = input ?? {};
  const variable: FarcasterChannelDetailsQueryVariables = {
    channel,
  };
  const { data, error } = await fetchQuery(query, variable);
  const channelDetailsRes = (data as FarcasterChannelDetailsQuery)
    ?.FarcasterChannels?.FarcasterChannel;
  return {
    data: error
      ? null
      : (channelDetailsRes ?? [])?.length >= 0
      ? {
          ...(channelDetailsRes?.[0] ?? {}),
          hosts: (channelDetailsRes?.[0]?.hosts ?? []).map((host) => ({
            ...host,
            profileImage: host?.profileImage?.image,
          })),
          warpcastUrl: `https://warpcast.com/~/channel/${channel}`,
        }
      : {},
    error,
  };
}
