import {
  init,
  getFarcasterChannelsByParticipant,
  FarcasterChannelActionType,
  FarcasterChannelsByParticipantInput,
  FarcasterChannelsByParticipantOutput,
} from "../index";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterChannelsByParticipantInput = {
    fid: 602,
    actionType: [FarcasterChannelActionType.Cast],
    lastActionTimestamp: {
      after: "2024-02-01T00:00:00Z",
      before: "2024-02-28T00:00:00Z",
    },
    limit: 2,
  };
  const { data, error }: FarcasterChannelsByParticipantOutput =
    await getFarcasterChannelsByParticipant(input);

  if (error) throw new Error(error);

  console.log(data);
})();
