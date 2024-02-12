import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserERC20Balances as query } from "../graphql/query/farcasterUserERC20Balances.query";
import {
  FarcasterErc20BalancesQuery,
  FarcasterErc20BalancesQueryVariables,
  TokenBlockchain,
} from "../graphql/types";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { formatFarcasterUserERC20Balances } from "../utils/formatFarcasterUserERC20Balances";

export interface FarcasterUserERC20BalancesInput {
  fid: number;
  chains?: TokenBlockchain[];
  limit?: number;
}

export interface FarcasterUserERC20BalancesOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string;
  name: string | null | undefined;
  symbol: string | null | undefined;
}

export async function getFarcasterUserERC20Balances(
  input: FarcasterUserERC20BalancesInput
): Promise<
  IteratePaginationResponse<
    (FarcasterUserERC20BalancesOutputData | null)[] | null | undefined
  >
> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterErc20BalancesQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserERC20Balances(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserERC20BalancesOutputData | null)[] | null | undefined,
        FarcasterErc20BalancesQuery
      >(fid, getPrevPage, formatFarcasterUserERC20Balances),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserERC20BalancesOutputData | null)[] | null | undefined,
        FarcasterErc20BalancesQuery
      >(fid, getNextPage, formatFarcasterUserERC20Balances),
  };
}
