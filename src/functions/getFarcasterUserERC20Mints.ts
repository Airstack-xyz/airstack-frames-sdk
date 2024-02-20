import { fetchQueryWithPagination } from "@airstack/node";
import {
  IteratePaginationResponse,
  iteratePagination,
} from "../utils/iteratePagination";
import { farcasterUserERC20Mints as query } from "../graphql/query/farcasterUserERC20Mints.query";
import { formatFarcasterUserERC20Mints } from "../utils/formatFarcasterUserERC20Mints";
import {
  FarcasterERC20MintsOutput,
  FarcasterUserERC20MintsInput,
  FarcasterUserErc20MintsQuery,
  FarcasterUserErc20MintsQueryVariables,
} from "../types";

export async function getFarcasterUserERC20Mints(
  input: FarcasterUserERC20MintsInput
): Promise<
  IteratePaginationResponse<
    (FarcasterERC20MintsOutput | null)[] | null | undefined
  >
> {
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
        (FarcasterERC20MintsOutput | null)[] | null | undefined,
        FarcasterUserErc20MintsQuery
      >(getPrevPage, formatFarcasterUserERC20Mints),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterERC20MintsOutput | null)[] | null | undefined,
        FarcasterUserErc20MintsQuery
      >(getNextPage, formatFarcasterUserERC20Mints),
  };
}
