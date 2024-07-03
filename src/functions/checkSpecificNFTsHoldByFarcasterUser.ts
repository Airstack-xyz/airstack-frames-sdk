import { fetchQuery } from "@airstack/node";
import {
  CheckSpecificNFTsHoldByFarcasterUserInput,
  CheckSpecificNFTsHoldByFarcasterUserOutput,
  CheckSpecificNFTsHoldFarcasterUserQuery,
  CheckSpecificNFTsHoldFarcasterUserQueryVariables,
} from "../types";
import { checkSpecificNFTsHoldFarcasterUserQuery as query } from "../graphql/query/checkSpecificNFTsHoldByFarcasterUser.query";

/**
 * @description Check If a Farcaster user of a given FID holds a list of specific token IDs from various ERC721/1155 NFT collections across Ethereum, Base, Zora, and other Airstack-supported chains.
 * @example
 * const { data, error } = await checkSpecificNFTsHoldFarcasterUser({
 *  fid: 1,
 *  nfts: [
 *    {
 *      tokenAddress: "0xe2fb0e28d391ca747481b3f0dff906644416fac9",
 *      tokenId: "1",
 *      chain: TokenBlockchain.Base,
 *    },
 *  ]
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Object} input.nfts List of NFTs to check if the Farcaster user hold any of them.
 * @returns List of the NFTs in `nfts` with true or false associated on the status of whether the token is currently hold by the user
 */
export async function checkSpecificNFTsHoldFarcasterUser(
  input: CheckSpecificNFTsHoldByFarcasterUserInput
): Promise<CheckSpecificNFTsHoldByFarcasterUserOutput> {
  const { fid, nfts } = input ?? {};
  const variable: CheckSpecificNFTsHoldFarcasterUserQueryVariables = {
    identity: `fc_fid:${fid}`,
    ...Object.assign(
      {},
      ...nfts?.map((_, i) => ({
        [`tokenAddress${i}`]: _.tokenAddress,
        [`tokenId${i}`]: _.tokenId,
        [`chain${i}`]: _.chain,
      }))
    ),
  };
  const { data, error } = await fetchQuery(query(nfts?.length), variable);
  return {
    data: error
      ? null
      : nfts?.map(({ chain, tokenAddress, tokenId }, i) => ({
          chain,
          tokenAddress,
          tokenId,
          isHold:
            (data as CheckSpecificNFTsHoldFarcasterUserQuery)?.[
              `nft${i}`
            ]?.TokenBalance?.some(
              (t) =>
                t.tokenAddress === tokenAddress &&
                t.tokenId === tokenId &&
                t.blockchain === chain
            ) ?? false,
        })),
    error,
  };
}
