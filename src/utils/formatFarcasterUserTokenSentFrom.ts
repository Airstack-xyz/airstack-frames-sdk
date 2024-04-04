import { FarcasterUserTokenSentFromQuery, TokenType } from "../types";

export function formatFarcasterUserTokenSentFrom(
  data: FarcasterUserTokenSentFromQuery
) {
  const { ethereum, base, zora, gold } = data ?? {};
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
        if (tokenType !== TokenType.ERC20)
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
          tokenType,
          receiver,
          ...nftData,
        };
      }
    ) ?? []),
    ...(base?.TokenTransfer?.map(
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
        if (tokenType !== TokenType.ERC20)
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
          tokenType,
          txHash,
          receiver,
          ...nftData,
        };
      }
    ) ?? []),
    ...(zora?.TokenTransfer?.map(
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
        if (tokenType !== TokenType.ERC20)
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
          tokenType,
          txHash,
          receiver,
          ...nftData,
        };
      }
    ) ?? []),
    ...(gold?.TokenTransfer?.map(
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
        if (tokenType !== TokenType.ERC20)
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
          tokenType,
          txHash,
          receiver,
          ...nftData,
        };
      }
    ) ?? []),
  ];
}
