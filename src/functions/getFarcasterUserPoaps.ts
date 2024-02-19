import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserPoaps as query } from "../graphql/query/farcasterUserPoaps.query";
import {
  FarcasterUserPoaPsQuery,
  FarcasterUserPoaPsQueryVariables,
} from "../graphql/types";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { formatFarcasterUserPoaps } from "../utils/formatFarcasterUserPoaps";
import { FarcasterUserPoapsInput, FarcasterUserPoapsOutput } from "../types";

export async function getFarcasterUserPoaps(
  input: FarcasterUserPoapsInput
): Promise<
  IteratePaginationResponse<
    (FarcasterUserPoapsOutput | null)[] | null | undefined
  >
> {
  const { fid, limit } = input ?? {};
  const variable: FarcasterUserPoaPsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatFarcasterUserPoaps(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserPoapsOutput | null)[] | null | undefined,
        FarcasterUserPoaPsQuery
      >(getPrevPage, formatFarcasterUserPoaps),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserPoapsOutput | null)[] | null | undefined,
        FarcasterUserPoaPsQuery
      >(getNextPage, formatFarcasterUserPoaps),
  };
}
