import {
  init,
  getFarcasterChannelParticipants,
  FarcasterChannelActionType,
  FarcasterChannelParticipantsInput,
  FarcasterChannelParticipantsOutput,
} from "../index";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterChannelParticipantsInput = {
    channel: "airstack",
    actionType: [FarcasterChannelActionType.Cast],
    lastActionTimestamp: {
      after: "2024-02-01T00:00:00Z",
      before: "2024-02-28T00:00:00Z",
    },
    limit: 2,
  };
  const { data, error }: FarcasterChannelParticipantsOutput =
    await getFarcasterChannelParticipants(input);

  if (error) throw new Error(error);

  console.log(data);
})();
