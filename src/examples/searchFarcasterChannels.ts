import {
  init,
  searchFarcasterChannels,
  SearchFarcasterChannelsInput,
  SearchFarcasterChannelsOutput,
} from "../index";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: SearchFarcasterChannelsInput = {
    channel: "airstack",
    createdAtTimestamp: {
      after: "2024-02-01T00:00:00Z",
      before: "2024-02-28T00:00:00Z",
    },
    limit: 2,
  };
  const { data, error }: SearchFarcasterChannelsOutput =
    await searchFarcasterChannels(input);

  if (error) throw new Error(error);

  console.log(data);
})();
