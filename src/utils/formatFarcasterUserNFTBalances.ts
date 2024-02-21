import { FarcasterNftBalancesQuery } from "../types";

export function formatFarcasterUserNFTBalances(
  data: FarcasterNftBalancesQuery
) {
  const { ethereum, polygon, base, zora } = data ?? {};
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
    ...(polygon?.TokenBalance?.map(
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
  ];
}
