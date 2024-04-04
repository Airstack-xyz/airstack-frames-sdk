import {
  init,
  getFarcasterUserTokenSentFrom,
  TokenType,
  FarcasterUserTokenSentFromInput,
  TokenBlockchain,
  FarcasterUserTokenSentFromOutput,
} from "../";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterUserTokenSentFromInput = {
    fid: 602,
    chains: [
      TokenBlockchain.Ethereum,
      TokenBlockchain.Gold,
      TokenBlockchain.Base,
      TokenBlockchain.Zora,
    ],
    tokenType: [TokenType.ERC20, TokenType.ERC721, TokenType.ERC1155],
    limit: 10,
  };
  const { data }: FarcasterUserTokenSentFromOutput =
    await getFarcasterUserTokenSentFrom(input);
  console.log(data);
})();
