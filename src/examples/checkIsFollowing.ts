import { init } from "@airstack/node";
import { checkIsFollowingFarcasterUser } from "../functions/checkIsFollowingFarcasterUser";
import {
  CheckIsFollowingFarcasterUserInput,
  CheckIsFollowingFarcasterUserOutput,
} from "../types";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: CheckIsFollowingFarcasterUserInput = {
    fid: 602,
    isFollowing: [2602, 15971, 13242],
  };
  const { data }: CheckIsFollowingFarcasterUserOutput =
    await checkIsFollowingFarcasterUser(input);
  console.log(data);
})();
