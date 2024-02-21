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
  const {
    data,
    error,
    hasNextPage,
    hasPrevPage,
    getNextPage,
    getPrevPage,
  }: FarcasterFollowersOutput = await getFarcasterFollowers(input);

  if (error) throw new Error(error);

  console.log(data);
})();
