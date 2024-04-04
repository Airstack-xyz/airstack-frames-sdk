import { TokenBlockchain } from "../types";

export const farcasterUserTokenReceivedByQuery = (
  chains: TokenBlockchain[] | null | undefined = [
    TokenBlockchain.Ethereum,
    TokenBlockchain.Base,
    TokenBlockchain.Zora,
    TokenBlockchain.Gold,
  ]
) =>
  /* GraphQL */ `
  query FarcasterUserTokenReceivedBy(
    $identity: Identity!
    $tokenType: [TokenType!] = [ERC20, ERC721, ERC1155]
    $limit: Int = 200
  ) {` +
  chains
    ?.map?.(
      (chain) =>
        `${chain}: TokenTransfers(
      input: {
        filter: { to: { _eq: $identity }, tokenType: { _in: $tokenType } }
        blockchain: ${chain}
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
        sender: from {
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
    `
    )
    .join("") +
  `
  }
`;
