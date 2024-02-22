import { fetchQueryWithPagination } from "@airstack/node";
import { farcasterUserNFTBalances as query } from "../graphql/query/farcasterUserNFTBalances.query";
import { iteratePagination } from "../utils/iteratePagination";
import { formatFarcasterUserNFTBalances } from "../utils/formatFarcasterUserNFTBalances";
import {
  FarcasterUserNFTBalancesInput,
  FarcasterUserNFTBalancesOutputData,
  FarcasterUserNFTBalancesOutput,
  FarcasterNftBalancesQuery,
  FarcasterNftBalancesQueryVariables,
} from "../types";

/**
 * @description Fetch Farcaster user's ERC721 and ERC1155 NFT balances of a gived FID
 * @example
 * const { data, error } = await getFarcasterUserNFTBalances({
 *  fid: 1,
 *  chains: [TokenBlockchain.Ethereum],
 *  tokenType: [NFTType.ERC721],
 *  limit: 100,
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<TokenBlockchain>} [input.chains=[TokenBlockchain.Ethereum, TokenBlockchain.Polygon, TokenBlockchain.Base, TokenBlockchain.Zora]] Array of chains to query
 * @param {Array<NFTType>} [input.tokenType=[NFTType.ERC721, NFTType.ERC1155]] Type of NFT, either ERC721 or ERC1155.
 * @param {Number} [input.limit=200] Number of JSON responses returned per API call. Maximum value is 200.
 * @returns An array of ERC721 and ERC1155 NFTs hold by Farcaster user
 */
export async function getFarcasterUserNFTBalances(
  input: FarcasterUserNFTBalancesInput
): Promise<FarcasterUserNFTBalancesOutput> {
  const { fid, limit, tokenType, chains } = input ?? {};
  const variable: FarcasterNftBalancesQueryVariables = {
    identity: `fc_fid:${fid}`,
    tokenType,
    limit,
  };
  const { data, error, hasPrevPage, hasNextPage, getPrevPage, getNextPage } =
    await fetchQueryWithPagination(query(chains), variable);
  return {
    data: error ? null : formatFarcasterUserNFTBalances(data),
    error,
    hasPrevPage,
    hasNextPage,
    getPrevPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTBalancesOutputData | null)[] | null | undefined,
        FarcasterNftBalancesQuery
      >(getPrevPage, formatFarcasterUserNFTBalances),
    getNextPage: async () =>
      await iteratePagination<
        (FarcasterUserNFTBalancesOutputData | null)[] | null | undefined,
        FarcasterNftBalancesQuery
      >(getNextPage, formatFarcasterUserNFTBalances),
  };
}
