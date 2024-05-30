import { FarcasterNftBalancesQuery } from "../types";

export function formatFarcasterUserNFTBalances(
  data: FarcasterNftBalancesQuery
) {
  const { ethereum, base, zora, gold, degen, ham } = data ?? {};
  return [
    ...(ethereum?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        tokenNfts,
        tokenType,
        tokenId,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          tokenType,
          amount,
          amountInWei,
          name,
          symbol,
          image,
          metaData,
        };
      }
    ) ?? []),
    ...(base?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        tokenNfts,
        tokenId,
        tokenType,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          amount,
          amountInWei,
          name,
          symbol,
          image,
          metaData,
          tokenType,
        };
      }
    ) ?? []),
    ...(zora?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        tokenNfts,
        tokenId,
        tokenType,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          amount,
          amountInWei,
          name,
          symbol,
          image,
          metaData,
          tokenType,
        };
      }
    ) ?? []),
    ...(gold?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        tokenNfts,
        tokenId,
        tokenType,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          amount,
          amountInWei,
          name,
          symbol,
          image,
          metaData,
          tokenType,
        };
      }
    ) ?? []),
    ...(degen?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        tokenNfts,
        tokenId,
        tokenType,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          amount,
          amountInWei,
          name,
          symbol,
          image,
          metaData,
          tokenType,
        };
      }
    ) ?? []),
    ...(ham?.TokenBalance?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        tokenNfts,
        tokenId,
        tokenType,
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          tokenId,
          amount,
          amountInWei,
          name,
          symbol,
          image,
          metaData,
          tokenType,
        };
      }
    ) ?? []),
  ];
}
