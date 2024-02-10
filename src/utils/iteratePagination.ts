import { FetchQuery } from "@airstack/node/dist/types/types";

export interface IteratePaginationResponse<Data> {
  data: Data | null | undefined;
  error?: any;
  hasPrevPage: boolean | undefined;
  hasNextPage: boolean | undefined;
  getPrevPage: () => Promise<IteratePaginationResponse<Data>>;
  getNextPage: () => Promise<IteratePaginationResponse<Data>>;
}

/**
 * @description Iterate through the pagination of Airstack queries w/ formatting included
 * @example
 * const fid = 2;
 * const { getNextPage } = await fetchQueryWithPagination(query, variables);
 * const res = await iteratePagination(fid, getNextPage);
 *
 * @param fid Farcaster user FID
 * @param iteratePage Either `getNextPage` or `getPrevPage` from `fetchQueryWithPagination`
 * @returns Next/previous page result of Airstack queries w/ formatting included
 */
export async function iteratePagination<Data, FormatFunctionInput>(
  fid: number,
  iteratePage: (() => Promise<FetchQuery | null>) | undefined,
  formatFunction: (input: FormatFunctionInput) => any
  // TODO: need to generalize this output type
): Promise<IteratePaginationResponse<Data>> {
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    (await iteratePage?.()) ?? {};
  const input = { data, fid };
  return {
    data: formatFunction?.(input as FormatFunctionInput),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination(fid, getPrevPage, formatFunction),
    getNextPage: async () =>
      await iteratePagination(fid, getNextPage, formatFunction),
  };
}
