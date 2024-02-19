import { fetchQueryWithPagination } from "@airstack/node";
import {
  FarcasterUserNftMintsQuery,
  FarcasterUserNftMintsQueryVariables,
  TokenBlockchain,
} from "../graphql/types";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { farcasterUserNFTMints as query } from "../graphql/query/farcasterUserNFTMints.query";
import { formatFarcasterUserNFTMints } from "../utils/formatFarcasterUserNFTMints";

export interface FarcasterUserNFTMintsInput {
  fid: number;
  chains?: TokenBlockchain[];
  limit?: number;
}

export interface FarcasterNFTMintsOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
}

export async function getFarcasterUserNFTMints(
  input: FarcasterUserNFTMintsInput
): Promise<
  IteratePaginationResponse<
    (FarcasterNFTMintsOutputData | null)[] | null | undefined
  >
> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterUserNftMintsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserNFTMints(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterNFTMintsOutputData | null)[] | null | undefined,
        FarcasterUserNftMintsQuery
      >(fid, getPrevPage, formatFarcasterUserNFTMints),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterNFTMintsOutputData | null)[] | null | undefined,
        FarcasterUserNftMintsQuery
      >(fid, getNextPage, formatFarcasterUserNFTMints),
  };
}
