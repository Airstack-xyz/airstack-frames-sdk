import { fetchQueryWithPagination } from "@airstack/node";
import {
  FarcasterUserNftMintsQuery,
  FarcasterUserNftMintsQueryVariables,
} from "../graphql/types";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { farcasterUserNFTMints as query } from "../graphql/query/farcasterUserNFTMints.query";
import { formatFarcasterUserNFTMints } from "../utils/formatFarcasterUserNFTMints";
import { FarcasterNFTMintsOutput, FarcasterUserNFTMintsInput } from "../types";

export async function getFarcasterUserNFTMints(
  input: FarcasterUserNFTMintsInput
): Promise<
  IteratePaginationResponse<
    (FarcasterNFTMintsOutput | null)[] | null | undefined
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
        (FarcasterNFTMintsOutput | null)[] | null | undefined,
        FarcasterUserNftMintsQuery
      >(getPrevPage, formatFarcasterUserNFTMints),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterNFTMintsOutput | null)[] | null | undefined,
        FarcasterUserNftMintsQuery
      >(getNextPage, formatFarcasterUserNFTMints),
  };
}
