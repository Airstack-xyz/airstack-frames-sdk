import { init, getFarcasterUserTokenSentFrom, TokenType } from "../";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await getFarcasterUserTokenSentFrom({
    fid: 602,
    tokenType: [TokenType.ERC721, TokenType.ERC1155],
    limit: 10,
  });
  console.log(data);
})();
