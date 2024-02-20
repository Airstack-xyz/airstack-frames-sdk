import {
  Exact,
  InputMaybe,
  Scalars,
  TokenBlockchain,
  TokenType,
} from "./graphql/types";

export interface FarcasterFollowersInput {
  fid: number;
  limit?: number;
}

export interface FarcasterFollowersOutput {
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

export interface FarcasterFollowingsInput {
  fid: number;
  limit?: number;
}

export interface FarcasterFollowingsOutput {
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

export interface FarcasterUserERC20BalancesOutput {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string;
  name: string | null | undefined;
  symbol: string | null | undefined;
}

export interface FarcasterUserERC20MintsInput {
  fid: number;
  chains?: TokenBlockchain[];
  limit?: number;
}

export interface FarcasterERC20MintsOutput {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
}

export interface FarcasterUserNFTBalancesInput {
  fid: number;
  tokenType?: InputMaybe<NFTType | NFTType[]>;
  chains?: TokenBlockchain[];
  limit?: number;
}

export interface FarcasterUserNFTBalancesOutput {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string;
  name: string | null | undefined;
  symbol: string | null | undefined;
}

export interface FarcasterUserNFTMintsInput {
  fid: number;
  chains?: TokenBlockchain[];
  tokenType?: InputMaybe<NFTType | NFTType[]>;
  limit?: number;
}

export interface FarcasterNFTMintsOutput {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
}

export interface FarcasterUserPoapsInput {
  fid: number;
  limit?: number;
}

export interface FarcasterUserPoapsOutput {
  eventName: string | null;
  eventId: string | null;
  eventURL: string | null;
  city: string | null;
  isVirtualEvent: boolean | null;
  startDate: any;
  endDate: any;
}

export interface SearchFarcasterUsersInput {
  profileName: string;
  limit?: number;
}

export interface SearchFarcastersOutput {
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
  tokenType?: InputMaybe<NFTType | NFTType[]>;
  limit?: number;
}

export interface FarcasterUserTokenSentFromOutput {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
}
