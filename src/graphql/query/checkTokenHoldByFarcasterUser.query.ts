import { TokenBlockchain } from "../types";

export const checkTokenHoldByFarcasterUserQuery = (
  chains: TokenBlockchain[] | null | undefined
) => {
  return (
    /* GraphQL */ `
    query CheckTokenHoldByFarcasterUserQuery(
      $owner: Identity!
      ` +
    `
      ${chains?.map?.((chain) => `$${chain}Tokens: [Address!]`).join("\n")}
    ` +
    `
    ) {
    ` +
    chains
      ?.map(
        (chain) => `
      ${chain}: TokenBalances(
        input: {
          filter: {
            owner: { _eq: $owner }
            tokenAddress: { _in: $${chain}Tokens }
          }
          blockchain: ${chain}
          limit: 200
        }
      ) {
        TokenBalance {
          blockchain
          tokenAddress
          amount
        }
      }`
      )
      ?.join("") +
    `
    }
  `
  );
};
