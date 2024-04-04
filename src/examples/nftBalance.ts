import {
  init,
  getFarcasterUserNFTBalances,
  FarcasterUserNFTBalancesInput,
  FarcasterUserNFTBalancesOutput,
  TokenBlockchain,
  NFTType,
} from "..";
import { config } from "dotenv";

config();

(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const variables: FarcasterUserNFTBalancesInput = {
    fid: 602,
    tokenType: [NFTType.ERC721, NFTType.ERC1155],
    chains: [
      TokenBlockchain.Ethereum,
      TokenBlockchain.Base,
      TokenBlockchain.Zora,
      TokenBlockchain.Gold,
    ],
    limit: 10,
  };
  const { data, error }: FarcasterUserNFTBalancesOutput =
    await getFarcasterUserNFTBalances(variables);

  if (error) throw new Error(error);

  console.log(data);
})();
