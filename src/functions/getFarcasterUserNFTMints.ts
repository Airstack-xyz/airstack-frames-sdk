import { fetchQueryWithPagination } from "@airstack/node";
import { iteratePagination } from "../utils/iteratePagination";
import { farcasterUserNFTMints as query } from "../graphql/query/farcasterUserNFTMints.query";
import { formatFarcasterUserNFTMints } from "../utils/formatFarcasterUserNFTMints";
import {
  FarcasterUserNFTMintsOutputData,
  FarcasterUserNFTMintsOutput,
  FarcasterUserNFTMintsInput,
  FarcasterUserNftMintsQuery,
  FarcasterUserNftMintsQueryVariables,
} from "../types";

/**
 * @description Fetch Farcaster user's ERC721 and ERC1155 NFT mints of a gived FID
 * @example
 * const { data, error } = await getFarcasterUserNFTMints({
 *  fid: 1,
 *  chains: [TokenBlockchain.Ethereum],
 *  tokenType: [NFTType.ERC721],
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<TokenBlockchain>} [input.chains=[TokenBlockchain.Ethereum, TokenBlockchain.Base, TokenBlockchain.Zora, TokenBlockchain.Gold, TokenBlockchain.Degen, TokenBlockchain.Ham, TokenBlockchain.Stp]] Array of chains to query
 * @param {Array<NFTType>} [input.tokenType=[NFTType.ERC721, NFTType.ERC1155]] Type of NFT, either ERC721 or ERC1155.
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of ERC721 and ERC1155 NFTs minted by Farcaster user
 */
export async function getFarcasterUserNFTMints(
  input: FarcasterUserNFTMintsInput
): Promise<FarcasterUserNFTMintsOutput> {
  const { fid, limit, chains, tokenType } = input ?? {};
  const variable: FarcasterUserNftMintsQueryVariables = {
    identity: `fc_fid:${fid}`,
    tokenType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserNFTMints(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTMintsOutputData | null)[] | null | undefined,
        FarcasterUserNftMintsQuery
      >(getPrevPage, formatFarcasterUserNFTMints),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTMintsOutputData | null)[] | null | undefined,
        FarcasterUserNftMintsQuery
      >(getNextPage, formatFarcasterUserNFTMints),
  };
}
