import { init, getFarcasterUserTokenSentFrom } from "../";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await getFarcasterUserTokenSentFrom({
    fid: 602,
    limit: 10,
  });
  console.log(data);
})();
