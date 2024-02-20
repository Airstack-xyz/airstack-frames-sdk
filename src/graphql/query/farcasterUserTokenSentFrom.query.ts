export const farcasterUserTokenSentFromQuery = /* GraphQL */ `
  query FarcasterUserTokenSentFrom(
    $identity: Identity!
    $tokenType: [TokenType!] = [ERC20, ERC721, ERC1155]
    $limit: Int = 200
  ) {
    ethereum: TokenTransfers(
      input: {
        filter: { from: { _eq: $identity }, tokenType: { _in: $tokenType } }
        blockchain: ethereum
        limit: $limit
        order: { blockTimestamp: DESC }
      }
    ) {
      TokenTransfer {
        blockchain
        amountInWei: amount
        amount: formattedAmount
        blockTimestamp
        blockNumber
        tokenAddress
        tokenId
        tokenType
        txHash: transactionHash
        token {
          name
          symbol
        }
        receiver: to {
          addresses
          socials(input: { filter: { dappName: { _eq: farcaster } } }) {
            fid: userId
          }
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
