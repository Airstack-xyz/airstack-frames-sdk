import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserTokenReceivedByQuery as query } from "../graphql/query/farcasterUserTokenReceivedBy.query";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { formatFarcasterUserTokenReceivedBy } from "../utils/formatFarcasterUserTokenReceivedBy";
import {
  FarcasterUserTokenReceivedByInput,
  FarcasterUserTokenReceivedByOutput,
  FarcasterUserTokenReceivedByQueryVariables,
  FarcasterUserTokenReceivedByQuery,
} from "../types";

export async function getFarcasterUserTokenReceivedBy(
  input: FarcasterUserTokenReceivedByInput
): Promise<
  IteratePaginationResponse<
    (FarcasterUserTokenReceivedByOutput | null)[] | null | undefined
  >
> {
  const { fid, tokenType, chains, limit } = input ?? {};
  const variable: FarcasterUserTokenReceivedByQueryVariables = {
    identity: `fc_fid:${fid}`,
    tokenType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserTokenReceivedBy(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenReceivedByOutput | null)[] | null | undefined,
        FarcasterUserTokenReceivedByQuery
      >(getPrevPage, formatFarcasterUserTokenReceivedBy),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenReceivedByOutput | null)[] | null | undefined,
        FarcasterUserTokenReceivedByQuery
      >(getNextPage, formatFarcasterUserTokenReceivedBy),
  };
}
