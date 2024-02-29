import {
  init,
  getFarcasterChannelsByHost,
  FarcasterChannelsByHostInput,
  FarcasterChannelsByHostOutput,
} from "../index";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterChannelsByHostInput = {
    fid: 602,
    createdAtTimestamp: {
      after: "2024-02-01T00:00:00Z",
      before: "2024-02-28T00:00:00Z",
    },
    limit: 2,
  };
  const { data, error }: FarcasterChannelsByHostOutput =
    await getFarcasterChannelsByHost(input);

  if (error) throw new Error(error);

  console.log(data);
})();
