import { FarcasterUserCastsQuery } from "../types";

export function formatFarcasterUserCasts(data: FarcasterUserCastsQuery) {
  return (
    data?.FarcasterCasts?.Cast?.map(
      ({
        hash: castHash,
        castedAtTimestamp,
        embeds,
        url: castUrl,
        text,
        numberOfRecasts,
        numberOfLikes,
        numberOfReplies,
        channel,
        mentions,
        frame,
      }) => ({
        castHash,
        castedAtTimestamp,
        castUrl,
        embeds,
        text,
        numberOfRecasts,
        numberOfLikes,
        numberOfReplies,
        channel: channel?.channelId,
        mentions,
        frame,
      })
    ) ?? []
  );
}
