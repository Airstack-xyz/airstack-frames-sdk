import {
  init,
  getFarcasterUserNFTBalances,
  FarcasterUserNFTBalancesInput,
  FarcasterUserNFTBalancesOutput,
  TokenBlockchain,
  IteratePaginationResponse,
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
  const {
    data,
    error,
  }: IteratePaginationResponse<
    (FarcasterUserNFTBalancesOutput | null)[] | null | undefined
  > = await getFarcasterUserNFTBalances(variables);
  console.log(data);
})();
