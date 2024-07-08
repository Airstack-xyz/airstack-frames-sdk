import { fetchQuery } from "@airstack/node";
import {
  CheckTokenMintedByFarcasterUserInput,
  CheckTokenMintedByFarcasterUserOutput,
  CheckTokenMintedByFarcasterUserQuery,
  CheckTokenMintedByFarcasterUserQueryVariables,
  TokenBlockchain,
} from "../types";
import { checkTokenMintedByFarcasterUserQuery as query } from "../graphql/query/checkTokenMintedByFarcasterUser.query";

/**
 * @description Check If a Farcaster user of a given FID minted a list of ERC20/721/1155 tokens across Ethereum, Base, Zora, and Gold.
 * @example
 * const { data, error } = await checkTokenHoldByFarcasterUser({
 *  fid: 1,
 *  token: [
 *    {
 *      chain: TokenBlockchain.Base,
 *      tokenAddress: "0x4c17ff12d9a925a0dec822a8cbf06f46c6268553",
 *    }
 *  ]
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Object} input.token List of tokens to check if the Farcaster user minted any of them.
 * @returns List of the tokens in `token` with true or false associated on the status of whether the token is minted by the user
 */
export async function checkTokenMintedByFarcasterUser(
  input: CheckTokenMintedByFarcasterUserInput
): Promise<CheckTokenMintedByFarcasterUserOutput> {
  const { fid, token } = input ?? {};
  const ethereumTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Ethereum)
    ?.map((t) => t?.tokenAddress);
  const baseTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Base)
    ?.map((t) => t?.tokenAddress);
  const zoraTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Zora)
    ?.map((t) => t?.tokenAddress);
  const goldTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Gold)
    ?.map((t) => t?.tokenAddress);
  const degenTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Degen)
    ?.map((t) => t?.tokenAddress);
  const hamTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Ham)
    ?.map((t) => t?.tokenAddress);
  const stpTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Stp)
    ?.map((t) => t?.tokenAddress);
  const variable: CheckTokenMintedByFarcasterUserQueryVariables = {
    identity: `fc_fid:${fid}`,
    ...(ethereumTokens?.length > 0 ? { ethereumTokens } : {}),
    ...(baseTokens?.length > 0 ? { baseTokens } : {}),
    ...(zoraTokens?.length > 0 ? { zoraTokens } : {}),
    ...(goldTokens?.length > 0 ? { goldTokens } : {}),
    ...(degenTokens?.length > 0 ? { degenTokens } : {}),
    ...(hamTokens?.length > 0 ? { hamTokens } : {}),
    ...(stpTokens?.length > 0 ? { stpTokens } : {}),
  };
  const chains = [
    ...(ethereumTokens?.length > 0 ? [TokenBlockchain.Ethereum] : []),
    ...(baseTokens?.length > 0 ? [TokenBlockchain.Base] : []),
    ...(zoraTokens?.length > 0 ? [TokenBlockchain.Zora] : []),
    ...(goldTokens?.length > 0 ? [TokenBlockchain.Gold] : []),
    ...(degenTokens?.length > 0 ? [TokenBlockchain.Degen] : []),
    ...(hamTokens?.length > 0 ? [TokenBlockchain.Ham] : []),
    ...(stpTokens?.length > 0 ? [TokenBlockchain.Stp] : []),
  ];
  const { data, error } = await fetchQuery(query(chains), variable);
  const { ethereum, base, zora, gold, degen, ham, stp } =
    (data as CheckTokenMintedByFarcasterUserQuery) ?? {};
  return {
    data: error
      ? null
      : token?.map(({ chain, tokenAddress }) => {
          switch (chain) {
            case TokenBlockchain.Ethereum:
              return {
                chain,
                tokenAddress,
                isMinted: (ethereum?.TokenTransfer ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Base:
              return {
                chain,
                tokenAddress,
                isMinted: (base?.TokenTransfer ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Zora:
              return {
                chain,
                tokenAddress,
                isMinted: (zora?.TokenTransfer ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Gold:
              return {
                chain,
                tokenAddress,
                isMinted: (gold?.TokenTransfer ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Degen:
              return {
                chain,
                tokenAddress,
                isMinted: (degen?.TokenTransfer ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Ham:
              return {
                chain,
                tokenAddress,
                isMinted: (ham?.TokenTransfer ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Stp:
              return {
                chain,
                tokenAddress,
                isMinted: (stp?.TokenTransfer ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            default:
              return {
                chain,
                tokenAddress,
                isMinted: false,
              };
          }
        }),
    error,
  };
}
