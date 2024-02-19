import { fetchQueryWithPagination } from "@airstack/node";
import {
  FarcasterUserErc20MintsQuery,
  FarcasterUserErc20MintsQueryVariables,
  TokenBlockchain,
} from "../graphql/types";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { farcasterUserERC20Mints as query } from "../graphql/query/farcasterUserERC20Mints.query";
import { formatFarcasterUserERC20Mints } from "../utils/formatFarcasterUserERC20Mints";

export interface FarcasterUserERC20MintsInput {
  fid: number;
  chains?: TokenBlockchain[];
  limit?: number;
}

export interface FarcasterERC20MintsOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
}

export async function getFarcasterUserERC20Mints(
  input: FarcasterUserERC20MintsInput
): Promise<
  IteratePaginationResponse<
    (FarcasterERC20MintsOutputData | null)[] | null | undefined
  >
> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterUserErc20MintsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserERC20Mints(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterERC20MintsOutputData | null)[] | null | undefined,
        FarcasterUserErc20MintsQuery
      >(fid, getPrevPage, formatFarcasterUserERC20Mints),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterERC20MintsOutputData | null)[] | null | undefined,
        FarcasterUserErc20MintsQuery
      >(fid, getNextPage, formatFarcasterUserERC20Mints),
  };
}
