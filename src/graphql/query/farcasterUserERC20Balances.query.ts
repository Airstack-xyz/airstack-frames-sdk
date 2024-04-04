import { TokenBlockchain } from "../types";

export const farcasterUserERC20Balances = (
  chains: TokenBlockchain[] | null | undefined = [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
    TokenBlockchain.Gold,
  ]
) => {
  return (
    /* GraphQL */ `
  query FarcasterERC20Balances($identity: Identity = "", $limit: Int = 200) {
    ` +
    chains
      ?.map(
        (chain) => `${chain}: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _eq: ERC20 } }
        blockchain: ${chain}
        limit: $limit
      }
    ) {
      TokenBalance {
        blockchain
        tokenAddress
        formattedAmount
        amount
        token {
          name
          symbol
        }
      }
    }`
      )
      .join("") +
    `
  }
`
  );
};
