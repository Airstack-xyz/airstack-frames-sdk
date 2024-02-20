import { init, getFarcasterUserERC20Mints, TokenBlockchain } from "..";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await getFarcasterUserERC20Mints({
    fid: 602,
    chains: [TokenBlockchain.Base, TokenBlockchain?.Polygon],
    limit: 10,
  });
  console.log(data);
})();
