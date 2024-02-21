import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserNFTBalances as query } from "../graphql/query/farcasterUserNFTBalances.query";
import { iteratePagination } from "../utils/iteratePagination";
import { formatFarcasterUserNFTBalances } from "../utils/formatFarcasterUserNFTBalances";
import {
  FarcasterUserNFTBalancesInput,
  FarcasterUserNFTBalancesOutputData,
  FarcasterUserNFTBalancesOutput,
  FarcasterNftBalancesQuery,
  FarcasterNftBalancesQueryVariables,
} from "../types";

export async function getFarcasterUserNFTBalances(
  input: FarcasterUserNFTBalancesInput
): Promise<FarcasterUserNFTBalancesOutput> {
  const { fid, limit, tokenType, chains } = input ?? {};
  const variable: FarcasterNftBalancesQueryVariables = {
    identity: `fc_fid:${fid}`,
    tokenType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserNFTBalances(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTBalancesOutputData | null)[] | null | undefined,
        FarcasterNftBalancesQuery
      >(getPrevPage, formatFarcasterUserNFTBalances),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTBalancesOutputData | null)[] | null | undefined,
        FarcasterNftBalancesQuery
      >(getNextPage, formatFarcasterUserNFTBalances),
  };
}
