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
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
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
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
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
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          image,
          metaData,
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
      }) => {
        const { name, symbol } = token ?? {};
        const { contentValue, metaData } = tokenNfts ?? {};
        const { image } = contentValue ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          image,
          metaData,
        };
      }
    ) ?? []),
  ];
}
