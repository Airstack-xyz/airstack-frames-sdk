import {
  FarcasterChannelActionType,
  FarcasterChannelFollowersInput,
  FarcasterChannelFollowersOutput,
} from "../types";
import { getFarcasterChannelParticipants } from "./getFarcasterChannelParticipants";

export async function getFarcasterChannelFollowers(
  input: FarcasterChannelFollowersInput
): Promise<FarcasterChannelFollowersOutput> {
  return await getFarcasterChannelParticipants({
    ...input,
    actionType: [FarcasterChannelActionType.Follow],
  });
}
