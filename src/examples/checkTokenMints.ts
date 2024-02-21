import {
  init,
  CheckTokenMintedByFarcasterUserInput,
  CheckTokenMintedByFarcasterUserOutput,
  checkTokenMintedByFarcasterUser,
  TokenBlockchain,
} from "..";
import { config } from "dotenv";

config();

(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: CheckTokenMintedByFarcasterUserInput = {
    fid: 15971,
    token: [
      {
        chain: TokenBlockchain.Base,
        tokenAddress: "0x57965af45c3b33571aa5419cc5e9012d8dcab181",
      },
      {
        chain: TokenBlockchain.Ethereum,
        tokenAddress: "0xad08067c7d3d3dbc14a9df8d671ff2565fc5a1ae",
      },
      {
        chain: TokenBlockchain.Zora,
        tokenAddress: "0xa15bb830acd9ab46164e6840e3ef2dbbf9c5e2b3",
      },
    ],
  };
  const { data, error }: CheckTokenMintedByFarcasterUserOutput =
    await checkTokenMintedByFarcasterUser(input);

  if (error) throw new Error(error);

  console.log(data);
})();
