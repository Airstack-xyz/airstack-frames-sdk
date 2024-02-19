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

export interface FarcasterUserPoapsInput {
  fid: number;
  limit?: number;
}

export interface FarcasterUserPoapsOutputData {
  eventName: string | null;
  eventId: string | null;
  eventURL: string | null;
  city: string | null;
  isVirtualEvent: boolean | null;
  startDate: any;
  endDate: any;
}

export async function getFarcasterUserPoaps(
  input: FarcasterUserPoapsInput
): Promise<
  IteratePaginationResponse<
    (FarcasterUserPoapsOutputData | null)[] | null | undefined
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
        (FarcasterUserPoapsOutputData | null)[] | null | undefined,
        FarcasterUserPoaPsQuery
      >(getPrevPage, formatFarcasterUserPoaps),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserPoapsOutputData | null)[] | null | undefined,
        FarcasterUserPoaPsQuery
      >(getNextPage, formatFarcasterUserPoaps),
  };
}