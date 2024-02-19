export const farcasterUserNFTMints = /* GraphQL */ `
  query FarcasterUserNFTMints(
    $identity: Identity!
    $limit: Int = 200
    $tokenType: [TokenType!] = [ERC721, ERC1155]
  ) {
    ethereum: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenType: { _in: $tokenType }
        }
        blockchain: ethereum
        order: { blockTimestamp: DESC }
        limit: $limit
      }
    ) {
      TokenTransfer {
        blockchain
        tokenType
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
        token {
          name
          symbol
        }
        tokenNft {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
          }
          metaData {
            name
            description
            image
            imageData
            externalUrl
            animationUrl
            youtubeUrl
            backgroundColor
            attributes {
              displayType
              maxValue
              trait_type
              value
            }
          }
        }
      }
    }
    polygon: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenType: { _in: $tokenType }
        }
        blockchain: polygon
        order: { blockTimestamp: DESC }
        limit: $limit
      }
    ) {
      TokenTransfer {
        blockchain
        tokenType
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
        token {
          name
          symbol
        }
        tokenNft {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
          }
          metaData {
            name
            description
            image
            imageData
            externalUrl
            animationUrl
            youtubeUrl
            backgroundColor
            attributes {
              displayType
              maxValue
              trait_type
              value
            }
          }
        }
      }
    }
    base: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenType: { _in: $tokenType }
        }
        blockchain: base
        order: { blockTimestamp: DESC }
        limit: $limit
      }
    ) {
      TokenTransfer {
        blockchain
        tokenType
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
        token {
          name
          symbol
        }
        tokenNft {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
          }
          metaData {
            name
            description
            image
            imageData
            externalUrl
            animationUrl
            youtubeUrl
            backgroundColor
            attributes {
              displayType
              maxValue
              trait_type
              value
            }
          }
        }
      }
    }
    zora: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenType: { _in: $tokenType }
        }
        blockchain: zora
        order: { blockTimestamp: DESC }
        limit: $limit
      }
    ) {
      TokenTransfer {
        blockchain
        tokenType
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
        token {
          name
          symbol
        }
        tokenNft {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
              original
            }
          }
          metaData {
            name
            description
            image
            imageData
            externalUrl
            animationUrl
            youtubeUrl
            backgroundColor
            attributes {
              displayType
              maxValue
              trait_type
              value
            }
          }
        }
      }
    }
  }
`;
