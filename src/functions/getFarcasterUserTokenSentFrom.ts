import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserTokenSentFromQuery as query } from "../graphql/query/farcasterUserTokenSentFrom.query";
import { iteratePagination } from "../utils/iteratePagination";
import { formatFarcasterUserTokenSentFrom } from "../utils/formatFarcasterUserTokenSentFrom";
import {
  FarcasterUserTokenSentFromInput,
  FarcasterUserTokenSentFromOutputData,
  FarcasterUserTokenSentFromOutput,
  FarcasterUserTokenSentFromQuery,
  FarcasterUserTokenSentFromQueryVariables,
} from "../types";

export async function getFarcasterUserTokenSentFrom(
  input: FarcasterUserTokenSentFromInput
): Promise<FarcasterUserTokenSentFromOutput> {
  const { fid, tokenType, chains, limit } = input ?? {};
  const variable: FarcasterUserTokenSentFromQueryVariables = {
    identity: `fc_fid:${fid}`,
    tokenType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserTokenSentFrom(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenSentFromOutputData | null)[] | null | undefined,
        FarcasterUserTokenSentFromQuery
      >(getPrevPage, formatFarcasterUserTokenSentFrom),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenSentFromOutputData | null)[] | null | undefined,
        FarcasterUserTokenSentFromQuery
      >(getNextPage, formatFarcasterUserTokenSentFrom),
  };
}
