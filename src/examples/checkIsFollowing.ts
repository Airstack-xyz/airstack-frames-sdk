import {
  init,
  checkIsFollowingFarcasterUser,
  CheckIsFollowingFarcasterUserInput,
  CheckIsFollowingFarcasterUserOutput,
} from "../";
import { config } from "dotenv";

config();

(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: CheckIsFollowingFarcasterUserInput = {
    fid: 602,
    isFollowing: [2602, 15971, 13242],
  };
  const { data, error }: CheckIsFollowingFarcasterUserOutput =
    await checkIsFollowingFarcasterUser(input);

  if (error) throw new Error(error);

  console.log(data);
})();
