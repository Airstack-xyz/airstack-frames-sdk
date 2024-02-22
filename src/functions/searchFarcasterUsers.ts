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
  SearchFarcastersOutputData,
  SearchFarcastersOutput,
} from "../types";

/**
 * @description Search Farcaster users that contain a given string input, e.g. all Farcaster users that contain "a" in their profile name.
 * @example
 * const { data, error } = await searchFarcasterUsers({
 *  profileName: "a",
 *  limit: 100,
 * });
 * @param {String} input.profileName String to match with the profile name. Only profile name that contains this inputted string will be returned in the response.
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns All Farcaster users that contain a given string in `profileName` with their full Farcaster profile details.
 */
export async function searchFarcasterUsers(
  input: SearchFarcasterUsersInput
): Promise<SearchFarcastersOutput> {
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
