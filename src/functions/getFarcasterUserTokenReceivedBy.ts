import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserTokenReceivedByQuery as query } from "../graphql/query/farcasterUserTokenReceivedBy.query";
import { iteratePagination } from "../utils/iteratePagination";
import { formatFarcasterUserTokenReceivedBy } from "../utils/formatFarcasterUserTokenReceivedBy";
import {
  FarcasterUserTokenReceivedByInput,
  FarcasterUserTokenReceivedByOutputData,
  FarcasterUserTokenReceivedByOutput,
  FarcasterUserTokenReceivedByQueryVariables,
  FarcasterUserTokenReceivedByQuery,
} from "../types";

/**
 * @description Fetch ERC20/721/1155 token transfers received by a Farcaster user of a gived FID
 * @example
 * const { data, error } = await getFarcasterUserTokenReceivedBy({
 *  fid: 1,
 *  chains: [TokenBlockchain.Ethereum],
 *  tokenType: [NFTType.ERC721],
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<TokenBlockchain>} [input.chains=[TokenBlockchain.Ethereum, TokenBlockchain.Base, TokenBlockchain.Zora, TokenBlockchain.Gold, TokenBlockchain.Degen]] Array of chains to query
 * @param {Array<TokenType>} [input.tokenType=[TokenType.ERC20, TokenType.ERC721, TokenType.ERC1155]] Type of tokens: ERC20, ERC721, or ERC1155.
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of ERC20/721/1155 token transfers received by Farcaster user
 */
export async function getFarcasterUserTokenReceivedBy(
  input: FarcasterUserTokenReceivedByInput
): Promise<FarcasterUserTokenReceivedByOutput> {
  const { fid, tokenType, chains, limit } = input ?? {};
  const variable: FarcasterUserTokenReceivedByQueryVariables = {
    identity: `fc_fid:${fid}`,
    tokenType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserTokenReceivedBy(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenReceivedByOutputData | null)[] | null | undefined,
        FarcasterUserTokenReceivedByQuery
      >(getPrevPage, formatFarcasterUserTokenReceivedBy),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenReceivedByOutputData | null)[] | null | undefined,
        FarcasterUserTokenReceivedByQuery
      >(getNextPage, formatFarcasterUserTokenReceivedBy),
  };
}
