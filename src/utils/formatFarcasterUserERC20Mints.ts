import { FarcasterUserErc20MintsQuery } from "../graphql/types";

export function formatFarcasterUserERC20Mints(
  data: FarcasterUserErc20MintsQuery
) {
  const { ethereum, polygon, base, zora } = data ?? {};
  return [
    ...(ethereum?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        blockTimestamp,
        blockNumber,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
        };
      }
    ) ?? []),
    ...(polygon?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        blockTimestamp,
        blockNumber,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
        };
      }
    ) ?? []),
    ...(base?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        blockTimestamp,
        blockNumber,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
        };
      }
    ) ?? []),
    ...(zora?.TokenTransfer?.map(
      ({
        blockchain,
        tokenAddress,
        formattedAmount: amount,
        amount: amountInWei,
        token,
        blockTimestamp,
        blockNumber,
      }) => {
        const { name, symbol } = token ?? {};
        return {
          blockchain,
          tokenAddress,
          amount,
          amountInWei,
          name,
          symbol,
          blockTimestamp,
          blockNumber,
        };
      }
    ) ?? []),
  ];
}
