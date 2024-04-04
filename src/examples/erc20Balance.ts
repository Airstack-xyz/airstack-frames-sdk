import {
  init,
  getFarcasterUserERC20Balances,
  FarcasterUserERC20BalancesInput,
  FarcasterUserERC20BalancesOutput,
  TokenBlockchain,
} from "../";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterUserERC20BalancesInput = {
    fid: 602,
    chains: [
      TokenBlockchain.Ethereum,
      TokenBlockchain.Base,
      TokenBlockchain.Zora,
    ],
    limit: 10,
  };
  const { data, error }: FarcasterUserERC20BalancesOutput =
    await getFarcasterUserERC20Balances(input);

  if (error) throw new Error(error);

  console.log(data);
})();
