import {
  init,
  getFarcasterUserNFTBalances,
  FarcasterUserNFTBalancesInput,
  FarcasterUserNFTBalancesOutput,
  TokenBlockchain,
} from "..";
import { config } from "dotenv";

config();

(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const variables: FarcasterUserNFTBalancesInput = {
    fid: 602,
    chains: [TokenBlockchain.Base],
    limit: 10,
  };
  const { data, error }: FarcasterUserNFTBalancesOutput =
    await getFarcasterUserNFTBalances(variables);
  console.log(data);
})();
