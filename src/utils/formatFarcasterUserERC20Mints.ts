import { FarcasterUserErc20MintsQuery } from "../types";

export function formatFarcasterUserERC20Mints(
  data: FarcasterUserErc20MintsQuery
) {
  const { ethereum, base, zora, gold, degen, ham } = data ?? {};
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
    ...(gold?.TokenTransfer?.map(
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
    ...(degen?.TokenTransfer?.map(
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
    ...(ham?.TokenTransfer?.map(
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
