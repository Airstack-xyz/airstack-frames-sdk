import {
  init,
  getFarcasterUserTokenReceivedBy,
  TokenType,
  FarcasterUserTokenReceivedByInput,
  TokenBlockchain,
  FarcasterUserTokenReceivedByOutput,
} from "..";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterUserTokenReceivedByInput = {
    fid: 602,
    chains: [
      TokenBlockchain.Ethereum,
      TokenBlockchain.Polygon,
      TokenBlockchain.Base,
      TokenBlockchain.Zora,
    ],
    tokenType: [TokenType.ERC20, TokenType.ERC721, TokenType.ERC1155],
    limit: 10,
  };
  const { data, error }: FarcasterUserTokenReceivedByOutput =
    await getFarcasterUserTokenReceivedBy(input);

  if (error) throw new Error(error);

  console.log(data);
})();
