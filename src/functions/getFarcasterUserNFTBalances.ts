import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserNFTBalances as query } from "../graphql/query/farcasterUserNFTBalances.query";
import {
  FarcasterNftBalancesQuery,
  FarcasterNftBalancesQueryVariables,
} from "../graphql/types";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { formatFarcasterUserNFTBalances } from "../utils/formatFarcasterUserNFTBalances";
import {
  FarcasterUserNFTBalancesInput,
  FarcasterUserNFTBalancesOutput,
} from "../types";

export async function getFarcasterUserNFTBalances(
  input: FarcasterUserNFTBalancesInput
): Promise<
  IteratePaginationResponse<
    (FarcasterUserNFTBalancesOutput | null)[] | null | undefined
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
        (FarcasterUserNFTBalancesOutput | null)[] | null | undefined,
        FarcasterNftBalancesQuery
      >(getPrevPage, formatFarcasterUserNFTBalances),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTBalancesOutput | null)[] | null | undefined,
        FarcasterNftBalancesQuery
      >(getNextPage, formatFarcasterUserNFTBalances),
  };
}
