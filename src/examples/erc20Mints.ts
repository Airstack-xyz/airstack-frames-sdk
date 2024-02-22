import {
  init,
  getFarcasterUserERC20Mints,
  TokenBlockchain,
  FarcasterUserERC20MintsInput,
  FarcasterUserERC20MintsOutput,
} from "..";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterUserERC20MintsInput = {
    fid: 602,
    chains: [
      TokenBlockchain.Ethereum,
      TokenBlockchain.Polygon,
      TokenBlockchain.Base,
      TokenBlockchain.Zora,
    ],
    limit: 10,
  };
  const { data, error }: FarcasterUserERC20MintsOutput =
    await getFarcasterUserERC20Mints(input);

  if (error) throw new Error(error);

  console.log(data);
})();
