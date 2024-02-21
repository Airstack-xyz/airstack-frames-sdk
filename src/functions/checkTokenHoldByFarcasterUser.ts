import { fetchQuery } from "@airstack/node";
import {
  CheckTokenHoldByFarcasterUserInput,
  CheckTokenHoldByFarcasterUserOutput,
  CheckTokenHoldByFarcasterUserQuery,
  CheckTokenHoldByFarcasterUserQueryVariables,
  TokenBlockchain,
} from "../types";
import { checkTokenHoldByFarcasterUserQuery as query } from "../graphql/query/checkTokenHoldByFarcasterUser.query";

export async function checkTokenHoldByFarcasterUser(
  input: CheckTokenHoldByFarcasterUserInput
): Promise<CheckTokenHoldByFarcasterUserOutput> {
  const { fid, token } = input ?? {};
  const ethereumTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Ethereum)
    ?.map((t) => t?.tokenAddress);
  const polygonTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Polygon)
    ?.map((t) => t?.tokenAddress);
  const baseTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Base)
    ?.map((t) => t?.tokenAddress);
  const zoraTokens = token
    ?.filter((t) => t?.chain === TokenBlockchain.Zora)
    ?.map((t) => t?.tokenAddress);
  const variable: CheckTokenHoldByFarcasterUserQueryVariables = {
    owner: `fc_fid:${fid}`,
    ...(ethereumTokens?.length > 0 ? { ethereumTokens } : {}),
    ...(polygonTokens?.length > 0 ? { polygonTokens } : {}),
    ...(baseTokens?.length > 0 ? { baseTokens } : {}),
    ...(zoraTokens?.length > 0 ? { zoraTokens } : {}),
  };
  const chains = [
    ...(ethereumTokens?.length > 0 ? [TokenBlockchain.Ethereum] : []),
    ...(polygonTokens?.length > 0 ? [TokenBlockchain.Polygon] : []),
    ...(baseTokens?.length > 0 ? [TokenBlockchain.Base] : []),
    ...(zoraTokens?.length > 0 ? [TokenBlockchain.Zora] : []),
  ];
  const { data, error } = await fetchQuery(query(chains), variable);
  const { ethereum, polygon, base, zora } =
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
            case TokenBlockchain.Polygon:
              return {
                chain,
                tokenAddress,
                isHold: (polygon?.TokenBalance ?? [])?.some(
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
