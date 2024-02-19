import { init } from "@airstack/node";
import { getFarcasterUserNFTMints } from "../functions/getFarcasterUserNFTMints";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await getFarcasterUserNFTMints({
    fid: 602,
    limit: 10,
  });
  console.log(data);
})();
