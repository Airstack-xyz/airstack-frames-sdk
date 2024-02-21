import {
  init,
  CheckTokenHoldByFarcasterUserInput,
  CheckTokenHoldByFarcasterUserOutput,
  checkTokenHoldByFarcasterUser,
  TokenBlockchain,
} from "../";
import { config } from "dotenv";

config();

(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: CheckTokenHoldByFarcasterUserInput = {
    fid: 15971,
    token: [
      {
        chain: TokenBlockchain.Base,
        tokenAddress: "0x4c17ff12d9a925a0dec822a8cbf06f46c6268553",
      },
      {
        chain: TokenBlockchain.Ethereum,
        tokenAddress: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
      },
      {
        chain: TokenBlockchain.Zora,
        tokenAddress: "0xa15bb830acd9ab46164e6840e3ef2dbbf9c5e2b3",
      },
    ],
  };
  const { data, error }: CheckTokenHoldByFarcasterUserOutput =
    await checkTokenHoldByFarcasterUser(input);

  if (error) throw new Error(error);

  console.log(data);
})();
