import { fetchQueryWithPagination } from "@airstack/node";
import { iteratePagination } from "../utils/iteratePagination";
import { farcasterUserNFTMints as query } from "../graphql/query/farcasterUserNFTMints.query";
import { formatFarcasterUserNFTMints } from "../utils/formatFarcasterUserNFTMints";
import {
  FarcasterUserNFTMintsOutputData,
  FarcasterUserNFTMintsOutput,
  FarcasterUserNFTMintsInput,
  FarcasterUserNftMintsQuery,
  FarcasterUserNftMintsQueryVariables,
} from "../types";

export async function getFarcasterUserNFTMints(
  input: FarcasterUserNFTMintsInput
): Promise<FarcasterUserNFTMintsOutput> {
  const { fid, limit, chains, tokenType } = input ?? {};
  const variable: FarcasterUserNftMintsQueryVariables = {
    identity: `fc_fid:${fid}`,
    tokenType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserNFTMints(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTMintsOutputData | null)[] | null | undefined,
        FarcasterUserNftMintsQuery
      >(getPrevPage, formatFarcasterUserNFTMints),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTMintsOutputData | null)[] | null | undefined,
        FarcasterUserNftMintsQuery
      >(getNextPage, formatFarcasterUserNFTMints),
  };
}
