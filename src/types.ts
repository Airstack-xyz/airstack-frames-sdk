import { Exact, InputMaybe, Scalars, TokenBlockchain } from "./graphql/types";

export interface FarcasterFollowersInput {
  fid: number;
  limit?: number;
}

export interface FarcasterFollowersOutputData {
  profileName: string | null | undefined;
  fnames: (string | null)[] | null | undefined;
  fid: string | null | undefined;
  userAssociatedAddresses: string[] | null | undefined;
  followerCount: number | null | undefined;
  followingCount: number | null | undefined;
  profileImage:
    | {
        extraSmall: string | null;
        small: string | null;
        medium: string | null;
        large: string | null;
        original: string | null | undefined;
      }
    | null
    | undefined;
}

export type FarcasterFollowersOutput = IteratePaginationResponse<
  FarcasterFollowersOutputData[] | null | undefined
>;

export interface FarcasterFollowingsInput {
  fid: number;
  limit?: number;
}

export interface FarcasterFollowingsOutputData {
  profileName: string | null | undefined;
  fnames: (string | null)[] | null | undefined;
  fid: string | null | undefined;
  userAssociatedAddresses: string[] | null | undefined;
  followerCount: number | null | undefined;
  followingCount: number | null | undefined;
  profileImage:
    | {
        extraSmall: string | null;
        small: string | null;
        medium: string | null;
        large: string | null;
        original: string | null | undefined;
      }
    | null
    | undefined;
}

export type FarcasterFollowingsOutput = IteratePaginationResponse<
  FarcasterFollowingsOutputData[] | null | undefined
>;

export interface FarcasterUserDetailsInput {
  fid: number;
}

export interface FarcasterUserDetailsOutput {
  error: any;
  data:
    | {
        profileName: string | null | undefined;
        fnames: (string | null)[] | null | undefined;
        userAssociatedAddresses: string[] | null | undefined;
        followerCount: number | null | undefined;
        followingCount: number | null | undefined;
        profileImage:
          | {
              extraSmall: string | null;
              small: string | null;
              medium: string | null;
              large: string | null;
              original: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
}

export interface FarcasterUserERC20BalancesInput {
  fid: number;
  chains?: TokenBlockchain[];
  limit?: number;
}

export interface FarcasterUserERC20BalancesOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string;
  name: string | null | undefined;
  symbol: string | null | undefined;
}

export type FarcasterUserERC20BalancesOutput = IteratePaginationResponse<
  (FarcasterUserERC20BalancesOutputData | null)[] | null | undefined
>;

export interface FarcasterUserERC20MintsInput {
  fid: number;
  chains?: TokenBlockchain[];
  limit?: number;
}

export interface FarcasterERC20MintsOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
}

export type FarcasterERC20MintsOutput = IteratePaginationResponse<
  (FarcasterERC20MintsOutputData | null)[] | null | undefined
>;

export interface FarcasterUserNFTBalancesInput {
  fid: number;
  tokenType?: InputMaybe<NFTType | NFTType[]>;
  chains?: TokenBlockchain[];
  limit?: number;
}

export interface FarcasterUserNFTBalancesOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  tokenId: string;
  amount: number | null;
  amountInWei: string;
  name: string | null | undefined;
  symbol: string | null | undefined;
}

export type FarcasterUserNFTBalancesOutput = IteratePaginationResponse<
  (FarcasterUserNFTBalancesOutputData | null)[] | null | undefined
>;

export interface FarcasterUserNFTMintsInput {
  fid: number;
  chains?: TokenBlockchain[];
  tokenType?: InputMaybe<NFTType | NFTType[]>;
  limit?: number;
}

export interface FarcasterNFTMintsOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
}

export type FarcasterNFTMintsOutput = IteratePaginationResponse<
  (FarcasterNFTMintsOutputData | null)[] | null | undefined
>;

export interface FarcasterUserPoapsInput {
  fid: number;
  limit?: number;
}

export interface FarcasterUserPoapsOutputData {
  eventName: string | null;
  eventId: string | null;
  eventURL: string | null;
  city: string | null;
  isVirtualEvent: boolean | null;
  startDate: any;
  endDate: any;
}

export type FarcasterUserPoapsOutput = IteratePaginationResponse<
  (FarcasterUserPoapsOutputData | null)[] | null | undefined
>;

export interface SearchFarcasterUsersInput {
  profileName: string;
  limit?: number;
}

export interface SearchFarcastersOutputData {
  profileName: string | null;
  fnames: Array<string | null> | null;
  userAssociatedAddresses: Array<any> | null;
  followerCount: number | null;
  followingCount: number | null;
  fid: string | null;
  profileImage:
    | {
        extraSmall: string | null;
        small: string | null;
        medium: string | null;
        large: string | null;
        original: string | null;
      }
    | null
    | undefined;
}

export type SearchFarcastersOutput = IteratePaginationResponse<
  (SearchFarcastersOutputData | null)[] | null | undefined
>;

export interface CheckIsFollowingFarcasterUserInput {
  fid: number;
  isFollowing: number[];
}

export interface CheckIsFollowingFarcasterUserOutput {
  error: any;
  data:
    | {
        fid: number;
        isFollowing: boolean;
      }[]
    | null;
}

export interface CheckIsFollowedByFarcasterUserInput {
  fid: number;
  isFollowedBy: number[];
}

export interface CheckIsFollowedByFarcasterUserOutput {
  error: any;
  data:
    | {
        fid: number;
        isFollowedBy: boolean;
      }[]
    | null;
}

export interface CheckPoapAttendedByFarcasterUserInput {
  fid: number;
  eventId: number[];
}

export interface CheckPoapAttendedByFarcasterUserOutput {
  error: any;
  data:
    | {
        eventId: number;
        isAttended: boolean;
      }[]
    | null;
}

export type FarcasterErc20BalancesQueryVariables = Exact<{
  identity?: InputMaybe<Scalars["Identity"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FarcasterErc20BalancesQuery = {
  ethereum?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
  polygon?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
  base?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
  zora?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
};

export { TokenBlockchain } from "./graphql/types";

export type FarcasterUserErc20MintsQueryVariables = Exact<{
  identity: Scalars["Identity"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FarcasterUserErc20MintsQuery = {
  ethereum?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      blockNumber: number | null;
      blockTimestamp: any | null;
      transactionHash: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
  polygon?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      blockNumber: number | null;
      blockTimestamp: any | null;
      transactionHash: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
  base?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      blockNumber: number | null;
      blockTimestamp: any | null;
      transactionHash: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
  zora?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      blockNumber: number | null;
      blockTimestamp: any | null;
      transactionHash: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
};

export enum NFTType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export type FarcasterNftBalancesQueryVariables = Exact<{
  identity?: InputMaybe<Scalars["Identity"]["input"]>;
  tokenType?: InputMaybe<Array<NFTType> | NFTType>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FarcasterNftBalancesQuery = {
  ethereum?: {
    TokenBalance: Array<{
      tokenType: TokenType | null;
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
      tokenId: string;
      tokenNfts: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  polygon?: {
    TokenBalance: Array<{
      tokenType: TokenType | null;
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      tokenId: string;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
      tokenNfts: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  base?: {
    TokenBalance: Array<{
      tokenType: TokenType | null;
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      tokenId: string;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
      tokenNfts: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  zora?: {
    TokenBalance: Array<{
      tokenType: TokenType | null;
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      tokenId: string;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
      tokenNfts: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
};

export type FarcasterUserNftMintsQueryVariables = Exact<{
  identity: Scalars["Identity"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  tokenType?: InputMaybe<Array<NFTType> | NFTType>;
}>;

export type FarcasterUserNftMintsQuery = {
  ethereum?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: TokenType | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      blockNumber: number | null;
      blockTimestamp: any | null;
      transactionHash: string;
      token: { name: string | null; symbol: string | null } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  polygon?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: TokenType | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      blockNumber: number | null;
      blockTimestamp: any | null;
      transactionHash: string;
      token: { name: string | null; symbol: string | null } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  base?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: TokenType | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      blockNumber: number | null;
      blockTimestamp: any | null;
      transactionHash: string;
      token: { name: string | null; symbol: string | null } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  zora?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: TokenType | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      blockNumber: number | null;
      blockTimestamp: any | null;
      transactionHash: string;
      token: { name: string | null; symbol: string | null } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
};

export interface FarcasterUserTokenSentFromInput {
  fid: number;
  chains?: TokenBlockchain[];
  tokenType?: InputMaybe<TokenType | TokenType[]>;
  limit?: number;
}

export interface FarcasterUserTokenSentFromOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
  tokenType: TokenType | null;
  tokenId?: number | null;
  metaData?: {
    name: string | null;
    description: string | null;
    image: string | null;
    imageData: string | null;
    externalUrl: string | null;
    animationUrl: string | null;
    youtubeUrl: string | null;
    backgroundColor: string | null;
    attributes: Array<{
      displayType: string | null;
      maxValue: string | null;
      trait_type: string | null;
      value: string | null;
    }> | null;
  } | null;
  image?: {
    extraSmall: string | null;
    small: string | null;
    medium: string | null;
    large: string | null;
    original: string | null;
  } | null;
}

export type FarcasterUserTokenSentFromOutput = IteratePaginationResponse<
  (FarcasterUserTokenSentFromOutputData | null)[] | null | undefined
>;

export type FarcasterUserTokenSentFromQueryVariables = Exact<{
  identity: Scalars["Identity"]["input"];
  tokenType?: InputMaybe<Array<TokenType> | TokenType>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FarcasterUserTokenSentFromQuery = {
  ethereum?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      blockTimestamp: any | null;
      blockNumber: number | null;
      tokenAddress: any | null;
      tokenId: string | null;
      tokenType: TokenType | null;
      amountInWei: string | null;
      amount: number | null;
      txHash: string;
      token: { name: string | null; symbol: string | null } | null;
      receiver: {
        addresses: Array<any> | null;
        socials: Array<{ fid: string | null }> | null;
      } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  polygon?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      blockTimestamp: any | null;
      blockNumber: number | null;
      tokenAddress: any | null;
      tokenId: string | null;
      tokenType: TokenType | null;
      amountInWei: string | null;
      amount: number | null;
      txHash: string;
      token: { name: string | null; symbol: string | null } | null;
      receiver: {
        addresses: Array<any> | null;
        socials: Array<{ fid: string | null }> | null;
      } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  base?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      blockTimestamp: any | null;
      blockNumber: number | null;
      tokenAddress: any | null;
      tokenId: string | null;
      tokenType: TokenType | null;
      amountInWei: string | null;
      amount: number | null;
      txHash: string;
      token: { name: string | null; symbol: string | null } | null;
      receiver: {
        addresses: Array<any> | null;
        socials: Array<{ fid: string | null }> | null;
      } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  zora?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      blockTimestamp: any | null;
      blockNumber: number | null;
      tokenAddress: any | null;
      tokenId: string | null;
      tokenType: TokenType | null;
      amountInWei: string | null;
      amount: number | null;
      txHash: string;
      token: { name: string | null; symbol: string | null } | null;
      receiver: {
        addresses: Array<any> | null;
        socials: Array<{ fid: string | null }> | null;
      } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
};

export enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export type FarcasterUserTokenReceivedByQueryVariables = Exact<{
  identity: Scalars["Identity"]["input"];
  tokenType?: InputMaybe<Array<TokenType> | TokenType>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FarcasterUserTokenReceivedByQuery = {
  ethereum?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      blockTimestamp: any | null;
      blockNumber: number | null;
      tokenAddress: any | null;
      tokenId: string | null;
      tokenType: TokenType | null;
      amountInWei: string | null;
      amount: number | null;
      txHash: string;
      token: { name: string | null; symbol: string | null } | null;
      sender: {
        addresses: Array<any> | null;
        socials: Array<{ fid: string | null }> | null;
      } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  polygon?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      blockTimestamp: any | null;
      blockNumber: number | null;
      tokenAddress: any | null;
      tokenId: string | null;
      tokenType: TokenType | null;
      amountInWei: string | null;
      amount: number | null;
      txHash: string;
      token: { name: string | null; symbol: string | null } | null;
      sender: {
        addresses: Array<any> | null;
        socials: Array<{ fid: string | null }> | null;
      } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  base?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      blockTimestamp: any | null;
      blockNumber: number | null;
      tokenAddress: any | null;
      tokenId: string | null;
      tokenType: TokenType | null;
      amountInWei: string | null;
      amount: number | null;
      txHash: string;
      token: { name: string | null; symbol: string | null } | null;
      sender: {
        addresses: Array<any> | null;
        socials: Array<{ fid: string | null }> | null;
      } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
  zora?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      blockTimestamp: any | null;
      blockNumber: number | null;
      tokenAddress: any | null;
      tokenId: string | null;
      tokenType: TokenType | null;
      amountInWei: string | null;
      amount: number | null;
      txHash: string;
      token: { name: string | null; symbol: string | null } | null;
      sender: {
        addresses: Array<any> | null;
        socials: Array<{ fid: string | null }> | null;
      } | null;
      tokenNft: {
        contentValue: {
          image: {
            extraSmall: string | null;
            small: string | null;
            medium: string | null;
            large: string | null;
            original: string | null;
          } | null;
        } | null;
        metaData: {
          name: string | null;
          description: string | null;
          image: string | null;
          imageData: string | null;
          externalUrl: string | null;
          animationUrl: string | null;
          youtubeUrl: string | null;
          backgroundColor: string | null;
          attributes: Array<{
            displayType: string | null;
            maxValue: string | null;
            trait_type: string | null;
            value: string | null;
          }> | null;
        } | null;
      } | null;
    }> | null;
  } | null;
};

export interface FarcasterUserTokenReceivedByInput {
  fid: number;
  chains?: TokenBlockchain[];
  tokenType?: InputMaybe<TokenType | TokenType[]>;
  limit?: number;
}

export interface FarcasterUserTokenReceivedByOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
  tokenType: TokenType | null;
  tokenId?: string | null;
  metaData?: {
    name: string | null;
    description: string | null;
    image: string | null;
    imageData: string | null;
    externalUrl: string | null;
    animationUrl: string | null;
    youtubeUrl: string | null;
    backgroundColor: string | null;
    attributes: Array<{
      displayType: string | null;
      maxValue: string | null;
      trait_type: string | null;
      value: string | null;
    }> | null;
  } | null;
  image?: {
    extraSmall: string | null;
    small: string | null;
    medium: string | null;
    large: string | null;
    original: string | null;
  } | null;
}

export type FarcasterUserTokenReceivedByOutput = IteratePaginationResponse<
  (FarcasterUserTokenReceivedByOutputData | null)[] | null | undefined
>;

export type CheckTokenHoldByFarcasterUserQueryVariables = Exact<{
  owner: Scalars["Identity"]["input"];
  ethereumTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  polygonTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  baseTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  zoraTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
}>;

export type CheckTokenHoldByFarcasterUserQuery = {
  ethereum?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      amount: string;
    }> | null;
  } | null;
  polygon?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      amount: string;
    }> | null;
  } | null;
  base?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      amount: string;
    }> | null;
  } | null;
  zora?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      amount: string;
    }> | null;
  } | null;
};

export interface CheckTokenHoldByFarcasterUserInput {
  fid: number;
  token: {
    tokenAddress: string;
    chain: TokenBlockchain;
  }[];
}

export interface CheckTokenHoldByFarcasterUserOutput {
  error: any;
  data:
    | {
        chain: TokenBlockchain;
        tokenAddress: string;
        isHold: boolean;
      }[]
    | null;
}

export type CheckTokenMintedByFarcasterUserQueryVariables = Exact<{
  identity: Scalars["Identity"]["input"];
  ethereumTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  polygonTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  baseTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  zoraTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
}>;

export type CheckTokenMintedByFarcasterUserQuery = {
  ethereum?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: TokenType | null;
      formattedAmount: number | null;
      tokenAddress: any | null;
    }> | null;
  } | null;
  polygon?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: TokenType | null;
      formattedAmount: number | null;
      tokenAddress: any | null;
    }> | null;
  } | null;
  base?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: TokenType | null;
      formattedAmount: number | null;
      tokenAddress: any | null;
    }> | null;
  } | null;
  zora?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: TokenType | null;
      formattedAmount: number | null;
      tokenAddress: any | null;
    }> | null;
  } | null;
};

export interface CheckTokenMintedByFarcasterUserInput {
  fid: number;
  token: {
    tokenAddress: string;
    chain: TokenBlockchain;
  }[];
}

export interface CheckTokenMintedByFarcasterUserOutput {
  error: any;
  data:
    | {
        chain: TokenBlockchain;
        tokenAddress: string;
        isMinted: boolean;
      }[]
    | null;
}

export interface IteratePaginationResponse<Data> {
  data: Data | null | undefined;
  error?: any;
  hasPrevPage: boolean | undefined;
  hasNextPage: boolean | undefined;
  getPrevPage: () => Promise<IteratePaginationResponse<Data>>;
  getNextPage: () => Promise<IteratePaginationResponse<Data>>;
}
