import { FarcasterUserQuotedRecastsQuery } from "../graphql/types";

export function formatFarcasterUserQuotedRecasts(
  data: FarcasterUserQuotedRecastsQuery
) {
  return (
    data?.FarcasterQuotedRecasts?.QuotedRecast?.map(
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
