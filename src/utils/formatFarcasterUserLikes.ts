import { FarcasterUserLikesQuery } from "../graphql/types";

export function formatFarcasterUserLikes(data: FarcasterUserLikesQuery) {
  return (
    data?.FarcasterReactions?.Reaction?.map(({ cast }) => {
      const {
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
      } = cast ?? {};
      return {
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
      };
    }) ?? []
  );
}
