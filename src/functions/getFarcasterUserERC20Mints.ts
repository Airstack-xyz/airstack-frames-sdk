import { fetchQueryWithPagination } from "@airstack/node";
import { iteratePagination } from "../utils/iteratePagination";
import { farcasterUserERC20Mints as query } from "../graphql/query/farcasterUserERC20Mints.query";
import { formatFarcasterUserERC20Mints } from "../utils/formatFarcasterUserERC20Mints";
import {
  FarcasterUserERC20MintsOutputData,
  FarcasterUserERC20MintsOutput,
  FarcasterUserERC20MintsInput,
  FarcasterUserErc20MintsQuery,
  FarcasterUserErc20MintsQueryVariables,
} from "../types";

/**
 * @description Fetch Farcaster user's ERC20 mints of a gived FID
 * @example
 * const { data, error } = await getFarcasterUserERC20Mints({
 *  fid: 1,
 *  chains: [TokenBlockchain.Ethereum],
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<TokenBlockchain>} [input.chains=[TokenBlockchain.Ethereum, TokenBlockchain.Base, TokenBlockchain.Zora, TokenBlockchain.Gold]] Array of chains to query
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of ERC20 tokens minted by Farcaster user
 */
export async function getFarcasterUserERC20Mints(
  input: FarcasterUserERC20MintsInput
): Promise<FarcasterUserERC20MintsOutput> {
  const { fid, limit, chains } = input ?? {};
  const variable: FarcasterUserErc20MintsQueryVariables = {
    identity: `fc_fid:${fid}`,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserERC20Mints(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserERC20MintsOutputData | null)[] | null | undefined,
        FarcasterUserErc20MintsQuery
      >(getPrevPage, formatFarcasterUserERC20Mints),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserERC20MintsOutputData | null)[] | null | undefined,
        FarcasterUserErc20MintsQuery
      >(getNextPage, formatFarcasterUserERC20Mints),
  };
}
