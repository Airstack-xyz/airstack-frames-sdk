import { TokenBlockchain } from "../types";

export const checkTokenMintedByFarcasterUserQuery = (
  chains: TokenBlockchain[] | null | undefined
) =>
  /* GraphQL */ `
  query CheckTokenMintedByFarcasterUser(
    $identity: Identity!
    ` +
  `
    ${chains?.map?.((chain) => `$${chain}Tokens: [Address!]`).join("\n")}
    ` +
  `
  ) {
` +
  chains
    ?.map(
      (chain) =>
        `${chain}: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenAddress: { _in: $${chain}Tokens }
        }
        blockchain: ${chain}
        limit: 200
      }
    ) {
      TokenTransfer {
        blockchain
        tokenType
        formattedAmount
        tokenAddress
      }
    }
    `
    )
    .join("") +
  `
  }
`;
