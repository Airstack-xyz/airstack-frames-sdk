import { fetchQueryWithPagination } from "@airstack/node";
import { searchFarcasterUsersQuery as query } from "../graphql/query/searchFarcasterUsers.query";
import {
  SearchFarcasterUsersQuery,
  SearchFarcasterUsersQueryVariables,
} from "../graphql/types";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { formatSearchFarcasterUsers } from "../utils/formatSearchFarcasterUsers";

export interface SearchFarcasterUsersInput {
  profileName: string;
}

export interface SearchFarcastersOutputData {
  profileName: string | null;
  fnames: Array<string | null> | null;
  userAssociatedAddresses: Array<any> | null;
  followerCount: number | null;
  followingCount: number | null;
  fid: string | null;
  profileImage:
    | {
        extraSmall: string | null;
        small: string | null;
        medium: string | null;
        large: string | null;
        original: string | null;
      }
    | null
    | undefined;
}

export async function searchFarcasterUsers(
  input: SearchFarcasterUsersInput
): Promise<
  IteratePaginationResponse<
    (SearchFarcastersOutputData | null)[] | null | undefined
  >
> {
  const { profileName } = input ?? {};
  const variable: SearchFarcasterUsersQueryVariables = {
    profileName,
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
        (SearchFarcastersOutputData | null)[] | null | undefined,
        SearchFarcasterUsersQuery
      >(getPrevPage, formatSearchFarcasterUsers),
    getNextPage: async () =>
      await iteratePagination<
        (SearchFarcastersOutputData | null)[] | null | undefined,
        SearchFarcasterUsersQuery
      >(getNextPage, formatSearchFarcasterUsers),
  };
}
