import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserTokenSentFromQuery as query } from "../graphql/query/farcasterUserTokenSentFrom.query";
import { iteratePagination } from "../utils/iteratePagination";
import { formatFarcasterUserTokenSentFrom } from "../utils/formatFarcasterUserTokenSentFrom";
import {
  FarcasterUserTokenSentFromInput,
  FarcasterUserTokenSentFromOutputData,
  FarcasterUserTokenSentFromOutput,
  FarcasterUserTokenSentFromQuery,
  FarcasterUserTokenSentFromQueryVariables,
} from "../types";

/**
 * @description Fetch ERC20/721/1155 token transfers sent from a Farcaster user of a gived FID
 * @example
 * const { data, error } = await getFarcasterUserTokenReceivedBy({
 *  fid: 1,
 *  chains: [TokenBlockchain.Ethereum],
 *  tokenType: [NFTType.ERC721],
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<TokenBlockchain>} [input.chains=[TokenBlockchain.Ethereum, TokenBlockchain.Base, TokenBlockchain.Zora, TokenBlockchain.Gold]] Array of chains to query
 * @param {Array<TokenType>} [input.tokenType=[TokenType.ERC20, TokenType.ERC721, TokenType.ERC1155]] Type of tokens: ERC20, ERC721, or ERC1155.
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of ERC20/721/1155 token transfers sent from Farcaster user
 */
export async function getFarcasterUserTokenSentFrom(
  input: FarcasterUserTokenSentFromInput
): Promise<FarcasterUserTokenSentFromOutput> {
  const { fid, tokenType, chains, limit } = input ?? {};
  const variable: FarcasterUserTokenSentFromQueryVariables = {
    identity: `fc_fid:${fid}`,
    tokenType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserTokenSentFrom(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenSentFromOutputData | null)[] | null | undefined,
        FarcasterUserTokenSentFromQuery
      >(getPrevPage, formatFarcasterUserTokenSentFrom),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserTokenSentFromOutputData | null)[] | null | undefined,
        FarcasterUserTokenSentFromQuery
      >(getNextPage, formatFarcasterUserTokenSentFrom),
  };
}
