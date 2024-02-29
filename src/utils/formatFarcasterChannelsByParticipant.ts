import { FarcasterChannelsByParticipantQuery } from "../graphql/types";

export function formatFarcasterChannelsByParticipant(
  data: FarcasterChannelsByParticipantQuery
) {
  return data?.FarcasterChannelParticipants?.FarcasterChannelParticipant?.map(
    ({ channel, channelId }) => ({
      ...channel,
      hosts: (channel?.hosts ?? []).map((host) => ({
        ...host,
        profileImage: host?.profileImage?.image,
      })),
      warpcastUrl: `https://warpcast.com/~/channel/${channelId}`,
    })
  );
}
