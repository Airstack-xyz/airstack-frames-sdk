export const checkSpecificNFTsHoldFarcasterUserQuery = (nftLength: number) => {
  const numbersArray = Array.from(Array(nftLength).keys());
  return (
    /* GraphQL */ `
  query CheckSpecificNFTsHoldFarcasterUser(
    $identity: Identity
    ` +
    numbersArray
      ?.map(
        (k) => `
    $tokenAddress${k}: Address
    $tokenId${k}: String
    $chain${k}: TokenBlockchain!
    `
      )
      ?.join("\n") +
    `
  ) {
    ` +
    numbersArray
      .map(
        (k) => `
    nft${k}: TokenBalances(
      input: {
        filter: {
          tokenType: { _in: [ERC1155, ERC721] }
          tokenAddress: { _eq: $tokenAddress${k} }
          tokenId: { _eq: $tokenId${k} }
          owner: { _eq: $identity }
        }
        blockchain: $chain${k}
      }
    ) {
      TokenBalance {
        blockchain
        tokenAddress
        tokenId
        formattedAmount
      }
    }`
      )
      ?.join("\n") +
    `
  }
`
  );
};
