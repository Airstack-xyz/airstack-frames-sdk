import { FarcasterChannelsByHostQuery } from "../graphql/types";

export function formatFarcasterChannelsByHost(
  data: FarcasterChannelsByHostQuery
) {
  return data?.FarcasterChannels?.FarcasterChannel?.map((channel) => {
    const { warpcastUrl: channelId } = channel ?? {};
    return {
      ...channel,
      warpcastUrl: `https://warpcast.com/~/channel/${channelId}`,
    };
  });
}
