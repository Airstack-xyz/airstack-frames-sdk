import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserERC20Balances as query } from "../graphql/query/farcasterUserERC20Balances.query";
import { iteratePagination } from "../utils/iteratePagination";
import { formatFarcasterUserERC20Balances } from "../utils/formatFarcasterUserERC20Balances";
import {
  FarcasterUserERC20BalancesInput,
  FarcasterUserERC20BalancesOutputData,
  FarcasterErc20BalancesQuery,
  FarcasterErc20BalancesQueryVariables,
  FarcasterUserERC20BalancesOutput,
} from "../types";

/**
 * @description Fetch Farcaster user's ERC20 balances of a gived FID
 * @example
 * const { data, error } = await getFarcasterUserERC20Balances({
 *  fid: 1,
 *  chains: [TokenBlockchain.Ethereum],
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<TokenBlockchain>} [input.chains=[TokenBlockchain.Ethereum, TokenBlockchain.Base, TokenBlockchain.Zora, TokenBlockchain.Gold, TokenBlockchain.Degen, TokenBlockchain.Ham]] Array of chains to query
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of ERC20 tokens hold by Farcaster user
 */
export async function getFarcasterUserERC20Balances(
  input: FarcasterUserERC20BalancesInput
): Promise<FarcasterUserERC20BalancesOutput> {
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
        (FarcasterUserERC20BalancesOutputData | null)[] | null | undefined,
        FarcasterErc20BalancesQuery
      >(getPrevPage, formatFarcasterUserERC20Balances),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserERC20BalancesOutputData | null)[] | null | undefined,
        FarcasterErc20BalancesQuery
      >(getNextPage, formatFarcasterUserERC20Balances),
  };
}
