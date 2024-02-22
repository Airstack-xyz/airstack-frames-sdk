import {
  init,
  getFarcasterFollowers,
  FarcasterFollowersInput,
  FarcasterFollowersOutput,
} from "..";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterFollowersInput = {
    fid: 602,
    limit: 100,
  };
  const { data, error }: FarcasterFollowersOutput = await getFarcasterFollowers(
    input
  );

  if (error) throw new Error(error);

  console.log(data);
})();
