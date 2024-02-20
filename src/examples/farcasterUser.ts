import { init } from "@airstack/node";
import { getFarcasterUserDetails } from "../functions/getFarcasterUserDetails";
import { config } from "dotenv";
import {
  FarcasterUserDetailsInput,
  FarcasterUserDetailsOutput,
} from "../types";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterUserDetailsInput = {
    fid: 602,
  };
  const { data }: FarcasterUserDetailsOutput = await getFarcasterUserDetails(
    input
  );
  console.log(data);
})();
