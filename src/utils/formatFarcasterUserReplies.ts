import { FarcasterUserRepliesQuery } from "../graphql/types";

export function formatFarcasterUserReplies(data: FarcasterUserRepliesQuery) {
  return (
    data?.FarcasterReplies?.Reply?.map(
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
