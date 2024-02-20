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
