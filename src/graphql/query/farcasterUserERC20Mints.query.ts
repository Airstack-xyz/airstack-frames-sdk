export const farcasterUserERC20Mints = /* GraphQL */ `
  query FarcasterUserERC20Mints($identity: Identity!, $limit: Int = 200) {
    ethereum: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenType: { _eq: ERC20 }
        }
        blockchain: ethereum
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
    }
    polygon: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenType: { _eq: ERC20 }
        }
        blockchain: polygon
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
    }
    base: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenType: { _eq: ERC20 }
        }
        blockchain: base
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
    }
    zora: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenType: { _eq: ERC20 }
        }
        blockchain: zora
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
    }
  }
`;
