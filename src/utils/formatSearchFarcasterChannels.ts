import { SearchFarcasterChannelsQuery } from "../graphql/types";

export function formatSearchFarcasterChannels(
  data: SearchFarcasterChannelsQuery
) {
  return data?.FarcasterChannels?.FarcasterChannel?.map((channel) => {
    const {
      name,
      description,
      imageUrl,
      createdAtTimestamp,
      hosts,
      channelId,
    } = channel ?? {};
    return {
      name,
      description,
      imageUrl,
      createdAtTimestamp,
      hosts: (hosts ?? []).map((host) => ({
        ...host,
        profileImage: host?.profileImage?.image,
      })),
      warpcastUrl: `https://warpcast.com/~/channel/${channelId}`,
    };
  });
}
