export const farcasterUserERC20Balances = /* GraphQL */ `
  query FarcasterERC20Balances($identity: Identity = "", $limit: Int = 200) {
    ethereum: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _eq: ERC20 } }
        blockchain: ethereum
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
    }
    polygon: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _eq: ERC20 } }
        blockchain: polygon
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
    }
    base: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _eq: ERC20 } }
        blockchain: base
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
    }
    zora: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _eq: ERC20 } }
        blockchain: zora
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
    }
  }
`;
