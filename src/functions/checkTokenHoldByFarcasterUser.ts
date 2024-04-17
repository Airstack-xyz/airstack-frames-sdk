import { fetchQuery } from "@airstack/node";
import {
  CheckTokenHoldByFarcasterUserInput,
  CheckTokenHoldByFarcasterUserOutput,
  CheckTokenHoldByFarcasterUserQuery,
  CheckTokenHoldByFarcasterUserQueryVariables,
  TokenBlockchain,
} from "../types";
import { checkTokenHoldByFarcasterUserQuery as query } from "../graphql/query/checkTokenHoldByFarcasterUser.query";

/**
 * @description Check If a Farcaster user of a given FID holds a list of ERC20/721/1155 tokens across Ethereum, Base, Zora, and Gold.
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
 * @param {Object} input.token List of tokens to check if the Farcaster user hold any of them.
 * @returns List of the tokens in `token` with true or false associated on the status of whether the token is currently hold by the user
 */
export async function checkTokenHoldByFarcasterUser(
  input: CheckTokenHoldByFarcasterUserInput
): Promise<CheckTokenHoldByFarcasterUserOutput> {
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
  const variable: CheckTokenHoldByFarcasterUserQueryVariables = {
    owner: `fc_fid:${fid}`,
    ...(ethereumTokens?.length > 0 ? { ethereumTokens } : {}),
    ...(baseTokens?.length > 0 ? { baseTokens } : {}),
    ...(zoraTokens?.length > 0 ? { zoraTokens } : {}),
    ...(goldTokens?.length > 0 ? { goldTokens } : {}),
    ...(degenTokens?.length > 0 ? { goldTokens } : {}),
  };
  const chains = [
    ...(ethereumTokens?.length > 0 ? [TokenBlockchain.Ethereum] : []),
    ...(baseTokens?.length > 0 ? [TokenBlockchain.Base] : []),
    ...(zoraTokens?.length > 0 ? [TokenBlockchain.Zora] : []),
    ...(goldTokens?.length > 0 ? [TokenBlockchain.Gold] : []),
    ...(degenTokens?.length > 0 ? [TokenBlockchain.Degen] : []),
  ];
  const { data, error } = await fetchQuery(query(chains), variable);
  const { ethereum, base, zora, gold, degen } =
    (data as CheckTokenHoldByFarcasterUserQuery) ?? {};
  return {
    data: error
      ? null
      : token?.map(({ chain, tokenAddress }) => {
          switch (chain) {
            case TokenBlockchain.Ethereum:
              return {
                chain,
                tokenAddress,
                isHold: (ethereum?.TokenBalance ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Base:
              return {
                chain,
                tokenAddress,
                isHold: (base?.TokenBalance ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Zora:
              return {
                chain,
                tokenAddress,
                isHold: (zora?.TokenBalance ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Gold:
              return {
                chain,
                tokenAddress,
                isHold: (gold?.TokenBalance ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            case TokenBlockchain.Degen:
              return {
                chain,
                tokenAddress,
                isHold: (degen?.TokenBalance ?? [])?.some(
                  (t) => t?.tokenAddress === tokenAddress
                ),
              };
            default:
              return {
                chain,
                tokenAddress,
                isHold: false,
              };
          }
        }),
    error,
  };
}
