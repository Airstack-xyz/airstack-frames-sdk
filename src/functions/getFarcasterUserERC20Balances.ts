import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserERC20Balances as query } from "../graphql/query/farcasterUserERC20Balances.query";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { formatFarcasterUserERC20Balances } from "../utils/formatFarcasterUserERC20Balances";
import {
  FarcasterUserERC20BalancesInput,
  FarcasterUserERC20BalancesOutput,
  FarcasterErc20BalancesQuery,
  FarcasterErc20BalancesQueryVariables,
} from "../types";

/**
 * @description Fetch Farcaster user's xERC20 balances of a gived FID
 * @example
 * const { data: followers, error } = await getFarcasterUserERC20Balances({
 *  fid: 1,
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Number} input.limit Number of JSON responses returned per API call
 * @param {Array<String>} input.chains Array of chains to query
 * @returns An array of ERC20 tokens hold by Farcaster user
 */
export async function getFarcasterUserERC20Balances(
  input: FarcasterUserERC20BalancesInput
): Promise<
  IteratePaginationResponse<
    (FarcasterUserERC20BalancesOutput | null)[] | null | undefined
  >
> {
  const { fid, limit, chains } = input ?? {};
  const variable: FarcasterErc20BalancesQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserERC20Balances(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserERC20BalancesOutput | null)[] | null | undefined,
        FarcasterErc20BalancesQuery
      >(getPrevPage, formatFarcasterUserERC20Balances),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserERC20BalancesOutput | null)[] | null | undefined,
        FarcasterErc20BalancesQuery
      >(getNextPage, formatFarcasterUserERC20Balances),
  };
}
