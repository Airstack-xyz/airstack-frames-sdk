import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserNFTBalances as query } from "../graphql/query/farcasterUserNFTBalances.query";
import {
  FarcasterNftBalancesQuery,
  FarcasterNftBalancesQueryVariables,
  InputMaybe,
  TokenBlockchain,
  TokenType,
} from "../graphql/types";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { formatFarcasterUserNFTBalances } from "../utils/formatFarcasterUserNFTBalances";

export interface FarcasterUserNFTBalancesInput {
  fid: number;
  tokenType?: InputMaybe<TokenType | TokenType[]>;
  chains?: TokenBlockchain[];
  limit?: number;
}

export interface FarcasterUserNFTBalancesOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string;
  name: string | null | undefined;
  symbol: string | null | undefined;
}

export async function getFarcasterUserNFTBalances(
  input: FarcasterUserNFTBalancesInput
): Promise<
  IteratePaginationResponse<
    (FarcasterUserNFTBalancesOutputData | null)[] | null | undefined
  >
> {
  const { fid, limit, tokenType } = input ?? {};
  const variable: FarcasterNftBalancesQueryVariables = {
    identity: `fc_fid:${fid}`,
    tokenType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserNFTBalances(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTBalancesOutputData | null)[] | null | undefined,
        FarcasterNftBalancesQuery
      >(fid, getPrevPage, formatFarcasterUserNFTBalances),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTBalancesOutputData | null)[] | null | undefined,
        FarcasterNftBalancesQuery
      >(fid, getNextPage, formatFarcasterUserNFTBalances),
  };
}
