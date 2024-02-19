import { init } from "@airstack/node";
import { checkIsFollowingFarcasterUser } from "../functions/checkIsFollowingFarcasterUser";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await checkIsFollowingFarcasterUser({
    fid: 602,
    isFollowing: [2602, 15971, 13242],
  });
  console.log(data);
})();
