import { fetchQuery } from "@airstack/node";
import { farcasterChannelDetailsQuery as query } from "../graphql/query/farcasterChannelDetails.query";
import type {
  FarcasterChannelDetailsQueryQuery,
  FarcasterChannelDetailsQueryQueryVariables,
} from "../graphql/types";
import {
  FarcasterChannelDetailsInput,
  FarcasterChannelDetailsOutput,
} from "../types";

/**
 * @description Fetch Farcaster user details provided fid
 * @example
 * const { data, error } = await getFarcasterUserDetails({
 *  fid: 1
 * });
 * @param {Number} input.fid Farcaster user FID
 * @returns Farcaster user details, including profile name, fname, fid, images, etc.
 */
export async function getFarcasterChannelDetails(
  input: FarcasterChannelDetailsInput
): Promise<FarcasterChannelDetailsOutput> {
  const { channel } = input ?? {};
  const variable: FarcasterChannelDetailsQueryQueryVariables = {
    channel,
  };
  const { data, error } = await fetchQuery(query, variable);
  const channelDetailsRes = (data as FarcasterChannelDetailsQueryQuery)
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
