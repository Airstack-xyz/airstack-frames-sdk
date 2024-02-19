export const farcasterUserNFTBalances = /* GraphQL */ `
  query FarcasterNFTBalances(
    $identity: Identity = ""
    $tokenType: [TokenType!] = [ERC721, ERC1155]
    $limit: Int = 200
  ) {
    ethereum: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _in: $tokenType } }
        blockchain: ethereum
        limit: $limit
      }
    ) {
      TokenBalance {
        tokenType
        blockchain
        tokenAddress
        formattedAmount
        amount
        token {
          name
          symbol
        }
        tokenNfts {
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
    polygon: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _in: $tokenType } }
        blockchain: polygon
        limit: $limit
      }
    ) {
      TokenBalance {
        tokenType
        blockchain
        tokenAddress
        formattedAmount
        amount
        token {
          name
          symbol
        }
        tokenNfts {
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
    base: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _in: $tokenType } }
        blockchain: base
        limit: $limit
      }
    ) {
      TokenBalance {
        tokenType
        blockchain
        tokenAddress
        formattedAmount
        amount
        token {
          name
          symbol
        }
        tokenNfts {
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
    zora: TokenBalances(
      input: {
        filter: { owner: { _eq: $identity }, tokenType: { _in: $tokenType } }
        blockchain: zora
        limit: $limit
      }
    ) {
      TokenBalance {
        tokenType
        blockchain
        tokenAddress
        formattedAmount
        amount
        token {
          name
          symbol
        }
        tokenNfts {
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
