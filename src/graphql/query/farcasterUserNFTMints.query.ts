import { TokenBlockchain } from "../types";

export const farcasterUserNFTMints = (
  chains: TokenBlockchain[] | null | undefined = [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
    TokenBlockchain.Gold,
    TokenBlockchain.Degen,
  ]
) =>
  /* GraphQL */ `
  query FarcasterUserNFTMints(
    $identity: Identity!
    $limit: Int = 200
    $tokenType: [TokenType!] = [ERC721, ERC1155]
  ) {
  ` +
  chains
    ?.map(
      (chain) => `
    ${chain}: TokenTransfers(
      input: {
        filter: {
          operator: { _eq: $identity }
          from: { _eq: "0x0000000000000000000000000000000000000000" }
          to: { _eq: $identity }
          tokenType: { _in: $tokenType }
        }
        blockchain: ${chain}
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
        tokenId
        blockNumber
        blockTimestamp
        transactionHash
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
  `
    )
    .join("") +
  `
  }
`;
