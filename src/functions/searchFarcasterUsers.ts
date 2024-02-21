import { fetchQueryWithPagination } from "@airstack/node";
import { searchFarcasterUsersQuery as query } from "../graphql/query/searchFarcasterUsers.query";
import {
  SearchFarcasterUsersQuery,
  SearchFarcasterUsersQueryVariables,
} from "../graphql/types";
import { iteratePagination } from "../utils/iteratePagination";
import { formatSearchFarcasterUsers } from "../utils/formatSearchFarcasterUsers";
import {
  SearchFarcasterUsersInput,
  SearchFarcastersOutput,
  IteratePaginationResponse,
} from "../types";

export async function searchFarcasterUsers(
  input: SearchFarcasterUsersInput
): Promise<
  IteratePaginationResponse<
    (SearchFarcastersOutput | null)[] | null | undefined
  >
> {
  const { profileName, limit } = input ?? {};
  const variable: SearchFarcasterUsersQueryVariables = {
    profileName,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query, variable);
  return {
    data: error ? null : formatSearchFarcasterUsers(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (SearchFarcastersOutput | null)[] | null | undefined,
        SearchFarcasterUsersQuery
      >(getPrevPage, formatSearchFarcasterUsers),
    getNextPage: async () =>
      await iteratePagination<
        (SearchFarcastersOutput | null)[] | null | undefined,
        SearchFarcasterUsersQuery
      >(getNextPage, formatSearchFarcasterUsers),
  };
}
