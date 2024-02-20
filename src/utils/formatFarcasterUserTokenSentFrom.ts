import { FarcasterUserTokenSentFromQuery, TokenType } from "../graphql/types";

export function formatFarcasterUserTokenSentFrom(
  data: FarcasterUserTokenSentFromQuery
) {
  const { ethereum } = data ?? {};
  return [
    ...(ethereum?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        amount,
        amountInWei,
        token,
        blockTimestamp,
        blockNumber,
        txHash,
        receiver,
        tokenNft,
        tokenType,
        tokenId,
      }) => {
        let nftData = {};
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNft ?? {};
        const { image } = contentValue ?? {};
        if (tokenType !== TokenType.Erc20)
          nftData = { ...nftData, metaData, image, tokenId };
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
          txHash,
          receiver,
          ...nftData,
        };
      }
    ) ?? []),
    // ...(polygon?.TokenTransfer?.map(
    //   ({
    //     blockchain,
    //     tokenAddress,
    //     formattedAmount: amount,
    //     amount: amountInWei,
    //     token,
    //     blockTimestamp,
    //     blockNumber,
    //     tokenNft,
    //   }) => {
    //     const { name, symbol } = token ?? {};
    //     const { contentValue, metaData } = tokenNft ?? {};
    //     const { image } = contentValue ?? {};
    //     return {
    //       blockchain,
    //       tokenAddress,
    //       amount,
    //       amountInWei,
    //       name,
    //       symbol,
    //       blockTimestamp,
    //       blockNumber,
    //       image,
    //       metaData,
    //     };
    //   }
    // ) ?? []),
    // ...(base?.TokenTransfer?.map(
    //   ({
    //     blockchain,
    //     tokenAddress,
    //     formattedAmount: amount,
    //     amount: amountInWei,
    //     token,
    //     blockTimestamp,
    //     blockNumber,
    //     tokenNft,
    //   }) => {
    //     const { name, symbol } = token ?? {};
    //     const { contentValue, metaData } = tokenNft ?? {};
    //     const { image } = contentValue ?? {};
    //     return {
    //       blockchain,
    //       tokenAddress,
    //       amount,
    //       amountInWei,
    //       name,
    //       symbol,
    //       blockTimestamp,
    //       blockNumber,
    //       image,
    //       metaData,
    //     };
    //   }
    // ) ?? []),
    // ...(zora?.TokenTransfer?.map(
    //   ({
    //     blockchain,
    //     tokenAddress,
    //     formattedAmount: amount,
    //     amount: amountInWei,
    //     token,
    //     blockTimestamp,
    //     blockNumber,
    //     tokenNft,
    //   }) => {
    //     const { name, symbol } = token ?? {};
    //     const { contentValue, metaData } = tokenNft ?? {};
    //     const { image } = contentValue ?? {};
    //     return {
    //       blockchain,
    //       tokenAddress,
    //       amount,
    //       amountInWei,
    //       name,
    //       symbol,
    //       blockTimestamp,
    //       blockNumber,
    //       image,
    //       metaData,
    //     };
    //   }
    // ) ?? []),
  ];
}
