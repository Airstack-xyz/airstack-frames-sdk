import { init, getFarcasterChannelDetails } from "../index";
import {
  FarcasterChannelDetailsInput,
  FarcasterChannelDetailsOutput,
} from "../types";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterChannelDetailsInput = {
    channel: "warpcast",
  };
  const { data, error }: FarcasterChannelDetailsOutput =
    await getFarcasterChannelDetails(input);

  if (error) throw new Error(error);

  console.log(data);
})();
