import {
  init,
  checkIsFollowedByFarcasterUser,
  CheckIsFollowedByFarcasterUserInput,
  CheckIsFollowedByFarcasterUserOutput,
} from "..";
import { config } from "dotenv";

config();

(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: CheckIsFollowedByFarcasterUserInput = {
    fid: 602,
    isFollowedBy: [2602, 15971, 13242],
  };
  const { data, error }: CheckIsFollowedByFarcasterUserOutput =
    await checkIsFollowedByFarcasterUser(input);

  if (error) throw new Error(error);

  console.log(data);
})();
