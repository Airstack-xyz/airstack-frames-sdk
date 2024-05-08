import { FarcasterUserRecastsQuery } from "../graphql/types";

export function formatFarcasterUserRecasts(data: FarcasterUserRecastsQuery) {
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
