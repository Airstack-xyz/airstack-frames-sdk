import { init, TokenBlockchain, NFTType, getFarcasterUserNFTMints } from "..";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await getFarcasterUserNFTMints({
    fid: 602,
    chains: [TokenBlockchain.Base],
    tokenType: [NFTType.ERC721],
    limit: 10,
  });
  console.log(data);
})();
