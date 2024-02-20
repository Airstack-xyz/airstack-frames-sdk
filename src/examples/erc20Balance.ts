import { init, getFarcasterUserERC20Balances, TokenBlockchain } from "../";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await getFarcasterUserERC20Balances({
    fid: 602,
    chains: [TokenBlockchain.Base],
    limit: 10,
  });
  console.log(data);
})();
