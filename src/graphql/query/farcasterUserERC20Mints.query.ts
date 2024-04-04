import { TokenBlockchain } from "../types";

export const farcasterUserERC20Mints = (
  chains: TokenBlockchain[] | null | undefined = [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
    TokenBlockchain.Gold,
  ]
) =>
  /* GraphQL */ `
  query FarcasterUserERC20Mints($identity: Identity!, $limit: Int = 200) {
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
          tokenType: { _eq: ERC20 }
        }
        blockchain: ${chain}
        order: { blockTimestamp: DESC }
        limit: $limit
      }
    ) {
      TokenTransfer {
        blockchain
        formattedAmount
        amount
        tokenAddress
        blockNumber
        blockTimestamp
        transactionHash
        token {
          name
          symbol
        }
      }
    }`
    )
    ?.join("") +
  `
  }
`;
