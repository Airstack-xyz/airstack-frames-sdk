import {
  init,
  getFarcasterUserDetails,
  FarcasterUserDetailsInput,
  FarcasterUserDetailsOutput,
} from "..";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterUserDetailsInput = {
    fid: 602,
  };
  const { data, error }: FarcasterUserDetailsOutput =
    await getFarcasterUserDetails(input);

  if (error) throw new Error(error);

  console.log(data);
})();
