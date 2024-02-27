import { FarcasterChannelParticipantsQuery } from "../graphql/types";

export function formatFarcasterChannelParticipants(
  data: FarcasterChannelParticipantsQuery
) {
  return data?.FarcasterChannelParticipants?.FarcasterChannelParticipant?.map(
    ({ participant }) => {
      const { profileImage } = participant ?? {};
      return {
        ...participant,
        profileImage: profileImage?.image,
      };
    }
  );
}
