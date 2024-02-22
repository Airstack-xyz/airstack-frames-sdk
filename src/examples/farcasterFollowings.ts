import {
  init,
  getFarcasterFollowings,
  FarcasterFollowingsInput,
  FarcasterFollowingsOutput,
} from "..";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterFollowingsInput = {
    fid: 602,
    limit: 100,
  };
  const { data, error }: FarcasterFollowingsOutput =
    await getFarcasterFollowings(input);

  if (error) throw new Error(error);

  console.log(data);
})();
