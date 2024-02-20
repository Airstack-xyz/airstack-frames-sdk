import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserTokenSentFromQuery as query } from "../graphql/query/farcasterUserTokenSentFrom.query";
import {
  FarcasterUserTokenSentFromQuery,
  FarcasterUserTokenSentFromQueryVariables,
} from "../graphql/types";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { formatFarcasterUserTokenSentFrom } from "../utils/formatFarcasterUserTokenSentFrom";
import {
  FarcasterUserTokenSentFromInput,
  FarcasterUserTokenSentFromOutput,
} from "../types";

export async function getFarcasterUserTokenSentFrom(
  input: FarcasterUserTokenSentFromInput
): Promise<
  IteratePaginationResponse<
    (FarcasterUserTokenSentFromOutput | null)[] | null | undefined
  >
> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterUserTokenSentFromQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserTokenSentFrom(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenSentFromOutput | null)[] | null | undefined,
        FarcasterUserTokenSentFromQuery
      >(getPrevPage, formatFarcasterUserTokenSentFrom),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenSentFromOutput | null)[] | null | undefined,
        FarcasterUserTokenSentFromQuery
      >(getNextPage, formatFarcasterUserTokenSentFrom),
  };
}
