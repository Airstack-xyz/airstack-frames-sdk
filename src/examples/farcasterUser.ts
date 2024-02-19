import { init } from "@airstack/node";
import { getFarcasterUserDetails } from "../functions/getFarcasterUserDetails";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await getFarcasterUserDetails({
    fid: 602,
  });
  console.log(data);
})();
