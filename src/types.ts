import { FrameActionMessage } from "@farcaster/core";
import {
  Audience,
  Exact,
  FarcasterChannelActionType,
  InputMaybe,
  Scalars,
  TimeFrame,
  TokenBlockchain,
  TrendingMintsCriteria,
  TokenType as AirstackTokenType,
  TrendingTokensCriteria,
  Int_Comparator_Exp,
} from "./graphql/types";
import { ImageResponse } from "@vercel/og";
import type { UrlObject } from "url";

export {
  TokenBlockchain,
  TrendingTokensCriteria,
  FarcasterChannelActionType,
  Audience,
  TimeFrame,
  TrendingMintsCriteria as Criteria,
} from "./graphql/types";

export type ConfigType = {
  authKey: string;
};

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
  custodyAddress: string | null | undefined;
  connectedAddresses:
    | {
        address: any;
        blockchain: string | null;
        chainId: string | null;
        timestamp: any;
      }[]
    | null
    | undefined;
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
  custodyAddress: string | null | undefined;
  connectedAddresses:
    | {
        address: any;
        blockchain: string | null;
        chainId: string | null;
        timestamp: any;
      }[]
    | null
    | undefined;
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

export type FarcasterUserDetailsData =
  | {
      profileName: string | null | undefined;
      fnames: (string | null)[] | null | undefined;
      userAssociatedAddresses: string[] | null | undefined;
      followerCount: number | null | undefined;
      followingCount: number | null | undefined;
      custodyAddress: string | null | undefined;
      connectedAddresses:
        | {
            address: any;
            blockchain: string | null;
            chainId: string | null;
            timestamp: any;
          }[]
        | null
        | undefined;
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

export interface FarcasterUserDetailsOutput {
  error: any;
  data: FarcasterUserDetailsData;
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

export interface FarcasterUserERC20MintsOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
}

export type FarcasterUserERC20MintsOutput = IteratePaginationResponse<
  (FarcasterUserERC20MintsOutputData | null)[] | null | undefined
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

export interface FarcasterUserNFTMintsOutputData {
  blockchain: TokenBlockchain | null;
  tokenAddress: string;
  amount: number | null;
  amountInWei: string | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
  blockTimestamp: any | null;
  blockNumber: number | null;
  tokenId: string;
  tokenType: NFTType | null;
}

export type FarcasterUserNFTMintsOutput = IteratePaginationResponse<
  (FarcasterUserNFTMintsOutputData | null)[] | null | undefined
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
  custodyAddress: string | null | undefined;
  connectedAddresses:
    | {
        address: any;
        blockchain: string | null;
        chainId: string | null;
        timestamp: any;
      }[]
    | null
    | undefined;
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
  gold?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
  degen?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      formattedAmount: number | null;
      amount: string;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
};

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
  gold?: {
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
  degen?: {
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
  gold?: {
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
  degen?: {
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
      tokenType: NFTType | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      blockNumber: number | null;
      blockTimestamp: any | null;
      transactionHash: string;
      token: { name: string | null; symbol: string | null } | null;
      tokenId: string;
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
      tokenType: NFTType | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      tokenId: string;
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
      tokenType: NFTType | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      tokenId: string;
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
  gold?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: NFTType | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      tokenId: string;
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
  degen?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: NFTType | null;
      formattedAmount: number | null;
      amount: string | null;
      tokenAddress: any | null;
      tokenId: string;
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
  receiver: {
    addresses: any[] | null;
    socials:
      | {
          fid: string | null;
        }[]
      | null;
  } | null;
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
  gold?: {
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
  degen?: {
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
  gold?: {
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
  degen?: {
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
  sender: {
    addresses: any[] | null;
    socials:
      | {
          fid: string | null;
        }[]
      | null;
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
  gold?: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      amount: string;
    }> | null;
  } | null;
  degen?: {
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
  gold?: {
    TokenTransfer: Array<{
      blockchain: TokenBlockchain | null;
      tokenType: TokenType | null;
      formattedAmount: number | null;
      tokenAddress: any | null;
    }> | null;
  } | null;
  degen?: {
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

export interface FarcasterChannelDetailsInput {
  channel: string;
}

export interface FarcasterChannelDetailsOutput {
  error: any;
  data:
    | {
        name?: string;
        description?: string;
        warpcastUrl?: string;
        imageUrl?: string | null;
        createdAtTimestamp?: any;
        hosts?: Array<{
          profileName: string | null;
          fnames: Array<string | null> | null;
          fid: string | null;
          userAssociatedAddresses: Array<any> | null;
          followerCount: number | null;
          followingCount: number | null;
          custodyAddress: string | null | undefined;
          connectedAddresses:
            | {
                address: any;
                blockchain: string | null;
                chainId: string | null;
                timestamp: any;
              }[]
            | null
            | undefined;
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
        }> | null;
      }
    | null
    | undefined;
}

export interface FarcasterChannelParticipantsInput {
  channel: string;
  limit?: number;
  actionType?: FarcasterChannelActionType[];
  lastActionTimestamp?: {
    before?: any;
    after?: any;
  };
}

export interface FarcasterChannelParticipantsOutputData {
  profileName?: string | null | undefined;
  fnames?: (string | null)[] | null | undefined;
  fid?: string | null | undefined;
  userAssociatedAddresses?: string[] | null | undefined;
  followerCount?: number | null | undefined;
  followingCount?: number | null | undefined;
  custodyAddress?: string | null | undefined;
  connectedAddresses?:
    | {
        address: any;
        blockchain: string | null;
        chainId: string | null;
        timestamp: any;
      }[]
    | null
    | undefined;
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

export type FarcasterChannelParticipantsOutput = IteratePaginationResponse<
  FarcasterChannelParticipantsOutputData[] | null | undefined
>;

export interface FarcasterChannelsByParticipantInput {
  fid: number;
  limit?: number;
  actionType?: FarcasterChannelActionType[];
  lastActionTimestamp?: {
    before?: any;
    after?: any;
  };
}

export interface FarcasterChannelsByParticipantOutputData {
  name?: string;
  description?: string;
  warpcastUrl?: string;
  imageUrl?: string | null;
  createdAtTimestamp?: any;
  hosts?: Array<{
    profileName: string | null;
    fnames: Array<string | null> | null;
    fid: string | null;
    userAssociatedAddresses: Array<any> | null;
    followerCount: number | null;
    followingCount: number | null;
    custodyAddress: string | null | undefined;
    connectedAddresses:
      | {
          address: any;
          blockchain: string | null;
          chainId: string | null;
          timestamp: any;
        }[]
      | null
      | undefined;
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
  }> | null;
}

export type FarcasterChannelsByParticipantOutput = IteratePaginationResponse<
  FarcasterChannelsByParticipantOutputData[] | null | undefined
>;

export interface SearchFarcasterChannelsInput {
  channel: string;
  limit?: number;
  createdAtTimestamp?: {
    before?: any;
    after?: any;
  };
}

export interface SearchFarcasterChannelsOutputData {
  name?: string;
  description?: string;
  warpcastUrl?: string;
  imageUrl?: string | null;
  createdAtTimestamp?: any;
  hosts?: Array<{
    profileName: string | null;
    fnames: Array<string | null> | null;
    fid: string | null;
    userAssociatedAddresses: Array<any> | null;
    followerCount: number | null;
    followingCount: number | null;
    custodyAddress: string | null | undefined;
    connectedAddresses:
      | {
          address: any;
          blockchain: string | null;
          chainId: string | null;
          timestamp: any;
        }[]
      | null
      | undefined;
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
  }> | null;
}

export type SearchFarcasterChannelsOutput = IteratePaginationResponse<
  SearchFarcasterChannelsOutputData[] | null | undefined
>;

export interface FarcasterChannelsByHostInput {
  fid: number;
  limit?: number;
  createdAtTimestamp?: {
    before?: any;
    after?: any;
  };
}

export interface FarcasterChannelsByHostOutputData {
  name?: string;
  description?: string;
  warpcastUrl?: string;
  imageUrl?: string | null;
  createdAtTimestamp?: any;
  hosts?: Array<{
    profileName: string | null;
    fnames: Array<string | null> | null;
    fid: string | null;
    userAssociatedAddresses: Array<any> | null;
    followerCount: number | null;
    followingCount: number | null;
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
  }> | null;
}

export type FarcasterChannelsByHostOutput = IteratePaginationResponse<
  FarcasterChannelsByHostOutputData[] | null | undefined
>;

export interface ValidateFramesMessageInput {
  trustedData: {
    messageBytes: string;
  };
  untrustedData: {
    fid: number;
    url: string;
    messageHash: string;
    timestamp: number;
    network: number;
    buttonIndex: number;
    castId: {
      fid: number;
      hash: string;
    };
    inputText?: string;
    state?: string;
    address?: string;
    transactionId?: string;
  };
  clientProtocol?: string | undefined;
}

export interface ValidateFramesMessageJSONResponse {
  valid: boolean;
  message: FrameActionMessage | null;
}

export interface ValidateFramesMessageOutput {
  isValid: boolean;
  message?: FrameActionMessage | null;
  isAllowed?: boolean;
}

export interface AllowListCriteria {
  eventIds?: number[];
  isFollowingOnFarcaster?: number[];
  numberOfFollowersOnFarcaster?: number;
  tokens?: {
    tokenAddress: string;
    chain: TokenBlockchain;
  }[];
}

export interface GetTrendingMintsInput {
  timeFrame: TimeFrame;
  audience: Audience;
  criteria: TrendingMintsCriteria;
  limit?: number;
}

export interface GetTrendingMintsOutputData {
  address: string | null;
  erc1155TokenID: string | null;
  criteriaCount: number | null;
  timeFrom: any;
  timeTo: any;
  name: string | null | undefined;
  symbol: string | null | undefined;
  type: AirstackTokenType | null | undefined;
}

export type GetTrendingMintsOutput = IteratePaginationResponse<
  GetTrendingMintsOutputData[] | null | undefined
>;

export type CreateAllowListQueryVariables = Exact<{
  identity?: Scalars["Identity"]["input"];
  eventIds?: InputMaybe<
    Array<Scalars["String"]["input"]> | Scalars["String"]["input"]
  >;
  isFollowingOnFarcaster?: InputMaybe<
    Array<Scalars["Identity"]["input"]> | Scalars["Identity"]["input"]
  >;
  fid?: Scalars["String"]["input"];
  followerCountOnFarcaster?: Scalars["Int"]["input"];
  ethereumTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  baseTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  zoraTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  goldTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
  degenTokens?: InputMaybe<
    Array<Scalars["Address"]["input"]> | Scalars["Address"]["input"]
  >;
}>;

export type CreateAllowListQuery = {
  poaps?: { Poap: Array<{ eventId: string | null }> | null } | null;
  isFollowingOnFarcaster?: {
    socialFollowers: {
      Follower: Array<{
        followingAddress: {
          farcaster: Array<{ fid: string | null }> | null;
        } | null;
      }> | null;
    } | null;
  } | null;
  numberOfFollowersOnFC?: {
    Social: Array<{ followerCount: number | null }> | null;
  } | null;
  ethereum?: {
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
  zora: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      amount: string;
    }> | null;
  } | null;
  gold: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      amount: string;
    }> | null;
  } | null;
  degen: {
    TokenBalance: Array<{
      blockchain: TokenBlockchain | null;
      tokenAddress: any;
      amount: string;
    }> | null;
  } | null;
};

export interface CreateAllowListInput {
  fid: number | undefined;
  allowListCriteria: AllowListCriteria;
  isAllowedFunction?: ({
    isPoapsAttended,
    isFollowingUsersOnFarcaster,
    isFarcasterFollowerCountAbove,
    isTokensHold,
  }: {
    isPoapsAttended?: { eventId: number; isAttended: boolean }[];
    isFollowingUsersOnFarcaster?: { fid: number; isFollowing: boolean }[];
    isFarcasterFollowerCountAbove?: boolean;
    isTokensHold?: {
      chain: TokenBlockchain;
      tokenAddress: string;
      isHold: boolean;
    }[];
  }) => Promise<boolean> | boolean;
}

export interface CreateAllowListOutput {
  isAllowed?: boolean | null;
  error?: any;
}

export type Pretty<type> = { [key in keyof type]: type[key] } & unknown;

export interface OnchainDataMiddlewareParameters {
  apiKey?: string;
  features: {
    userDetails?: any;
    erc20Balances?: any;
    nftBalances?: any;
    erc20Mints?: any;
    nftMints?: any;
    poaps?: any;
    channels?: any;
    followers?: any;
    followings?: any;
  };
  env?: "prod" | "dev";
}

export type OnchainDataVariables = {
  userDetails?:
    | Pretty<{
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
      }>
    | null
    | undefined;
  erc20Balances?:
    | Pretty<(FarcasterUserERC20BalancesOutputData | null)[]>
    | null
    | undefined;
  nftBalances?:
    | Pretty<(FarcasterUserNFTBalancesOutputData | null)[]>
    | null
    | undefined;
  erc20Mints?:
    | Pretty<(FarcasterUserERC20MintsOutputData | null)[]>
    | null
    | undefined;
  nftMints?:
    | Pretty<(FarcasterUserNFTMintsOutputData | null)[]>
    | null
    | undefined;
  poaps?: Pretty<(FarcasterUserPoapsOutputData | null)[]> | null | undefined;
  channels?:
    | Pretty<(FarcasterChannelsByParticipantOutputData | null)[]>
    | null
    | undefined;
  followers?:
    | Pretty<(FarcasterFollowersOutputData | null)[]>
    | null
    | undefined;
  followings?:
    | Pretty<(FarcasterFollowingsOutputData | null)[]>
    | null
    | undefined;
};

export enum TransferType {
  All = "all",
  SelfInitiated = "self_initiated",
}

export interface GetTrendingTokensInput {
  timeFrame: TimeFrame;
  audience: Audience;
  criteria: TrendingTokensCriteria;
  transferType: TransferType;
  limit?: number;
  swappable: boolean;
}

export interface GetTrendingTokensOutputData {
  address: string | null;
  criteriaCount: number | null;
  timeFrom: any;
  timeTo: any;
  name: string | null | undefined;
  symbol: string | null | undefined;
  type: AirstackTokenType | null | undefined;
}

export type GetTrendingTokensOutput = IteratePaginationResponse<
  GetTrendingTokensOutputData[] | null | undefined
>;

export type FrameData = {
  address?: string | undefined;
  buttonIndex?: 1 | 2 | 3 | 4 | undefined;
  castId: { fid: number; hash: string };
  fid: number;
  inputText?: string | undefined;
  messageHash: string;
  network: number;
  state?: string | undefined;
  timestamp: number;
  transactionId?: string | undefined;
  url: string;
};

export type TrendingTokensQuery = {
  TrendingTokens: {
    TrendingToken: Array<{
      address: string | null;
      criteriaCount: number | null;
      timeFrom: any | null;
      timeTo: any | null;
      token: {
        name: string | null;
        symbol: string | null;
        type: AirstackTokenType | null;
      } | null;
    }> | null;
  } | null;
};

export type TrendingTokensQueryVariables = Exact<{
  transferType: TransferType;
  timeFrame: TimeFrame;
  criteria: TrendingTokensCriteria;
  audience: Audience;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  swappable: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type AllowListMiddlewareParameters = {
  env?: "dev" | "prod";
  apiKey?: string;
  allowListCriteria: AllowListCriteria;
  isAllowedFunction?: ({
    isPoapsAttended,
    isFollowingUsersOnFarcaster,
    isFarcasterFollowerCountAbove,
    isTokensHold,
  }: {
    isPoapsAttended?: { eventId: number; isAttended: boolean }[];
    isFollowingUsersOnFarcaster?: { fid: number; isFollowing: boolean }[];
    isFarcasterFollowerCountAbove?: boolean;
    isTokensHold?: {
      chain: TokenBlockchain;
      tokenAddress: string;
      isHold: boolean;
    }[];
  }) => Promise<boolean> | boolean;
};

export type AllowListMiddlewareVariables = {
  isAllowed: Pretty<boolean> | undefined;
};

export enum FrameRatio {
  _1__1 = "1:1",
  _1_91__1 = "1.91:1",
}

export interface GenerateCaptchaChallengeInput {
  options?: { ratio?: FrameRatio; includeImage?: boolean };
}

export interface GenerateCaptchaChallengeOutput {
  image?: string;
  data: {
    numA: number;
    numB: number;
  };
  state: {
    captchaId: string;
    valueHash: string;
  };
}

export interface ValidateCaptchaChallengeInput {
  inputText: string;
  state: { captchaId: string; valueHash: string };
  options?: { ratio?: FrameRatio; includeImage?: boolean };
}

export interface ValidateCaptchaChallengeOutput {
  image?: string;
  isValidated: boolean;
}

export type ClientProtocolId = { id: string; version: string };

export const Button: React.FunctionComponent<ButtonProps> = () => {
  return null;
};

type PostButtonProps = {
  /** A 256-byte string which is label of the button */
  children: string;
  action: "post";
  /**
   * Either full URL or relative path that will be resolved against current url and basePath
   * if omitted it will send use current url and path. Optionally pass in an object with properties `pathname`, `query`, ... instead.
   */
  target?: string | UrlObject;
};

type PostRedirectButton = {
  /** A 256-byte string which is label of the button */
  children: string;
  action: "post_redirect";
  /**
   * Either full URL or relative path that will be resolved against current url and basePath
   * if omitted it will send use current url and path. Optionally pass in an object with properties `pathname`, `query`, ... instead.
   */
  target?: string | UrlObject;
};

type MintButtonProps = {
  /** A 256-byte string which is label of the button */
  children: string;
  action: "mint";
  /** The target  property MUST be a valid [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md) address, plus an optional token_id. */
  target: string;
};

type LinkButtonProps = {
  /** A 256-byte string which is label of the button */
  children: string;
  action: "link";
  /** A Url to link to. Optionally pass in an object with properties `pathname`, `query`, ... instead. */
  target: string | UrlObject;
};

type TxButtonProps = {
  /** A 256-byte string which is label of the button */
  children: string;
  action: "tx";
  /**
   * URL which points to a valid Frame Transaction URL, which returns tx calldata.
   *
   * Either full URL or relative path that will be resolved against current url and basePath
   * if omitted it will send use current url and path
   */
  target: string | UrlObject;
  /**
   * URL where a frame message containing the transaction ID will be posted if the transaction succeeds.
   * Overrides the top level frame post_url.
   */
  post_url?: string | UrlObject;
};

export type ButtonProps =
  | PostButtonProps
  | PostRedirectButton
  | MintButtonProps
  | LinkButtonProps
  | TxButtonProps;

export type JsonObject = { [Key in string]: JsonValue } & {
  [Key in string]?: JsonValue | undefined;
};

export type JsonArray = JsonValue[] | readonly JsonValue[];

export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type FrameButtonElement = React.ReactComponentElement<typeof Button>;
type AllowedFrameButtonItems = FrameButtonElement | null | undefined | boolean;

/**
 * Frame definition, this is rendered by the frames
 */
export type FrameDefinition<TState extends JsonValue | undefined> = {
  /**
   * If string then it must be a valid URL
   */
  image: React.ReactElement | string;
  imageOptions?: {
    /**
     * @default '1.91:1'
     */
    aspectRatio?: "1.91:1" | "1:1";
  } & ConstructorParameters<typeof ImageResponse>[1];
  buttons?:
    | []
    | [AllowedFrameButtonItems]
    | [AllowedFrameButtonItems, AllowedFrameButtonItems]
    | [
        AllowedFrameButtonItems,
        AllowedFrameButtonItems,
        AllowedFrameButtonItems
      ]
    | [
        AllowedFrameButtonItems,
        AllowedFrameButtonItems,
        AllowedFrameButtonItems,
        AllowedFrameButtonItems
      ];
  /**
   * Label for text input, if no value is provided the input is not rendered
   */
  textInput?: string;
  /**
   * Global app state that will be available on next frame
   */
  state?: TState;
  /**
   * Open Frames spec: The minimum client protocol version accepted for the given protocol identifier. For example VNext, or 1.5 . At least one $protocol_identifier must be specified.
   */
  accepts?: ClientProtocolId[];
} & ResponseInit;

/**
 * Frame redirect, this should happen only in response to post_redirect button
 */
export type FrameRedirect = {
  kind: "redirect";
  location: string | URL;
} & ResponseInit;

export type FramesHandlerFunctionReturnType<
  TState extends JsonValue | undefined
> = FrameDefinition<TState> | FrameRedirect;

type AllowedFramesContextShape = Record<string, any>;

/**
 * Default frames context
 *
 * This is just internal object, if we have some values that are provided by frames by default
 * we should define them in here.
 */
export type FramesContext<TState extends JsonValue | undefined = JsonValue> = {
  /**
   * All frame relative targets will be resolved relative to this
   */
  basePath: string;
  /**
   * Values passed to createFrames()
   */
  readonly initialState: TState;
  request: Request;
  /**
   * Current request URL
   */
  url: URL;
};

type FramesMiddlewareNextFunction<
  TState extends JsonValue | undefined,
  TReturnedContext extends AllowedFramesContextShape
> = (context?: TReturnedContext) => FramesMiddlewareReturnType<TState>;

export type FramesMiddlewareReturnType<TState extends JsonValue | undefined> =
  Promise<FramesHandlerFunctionReturnType<TState> | Response>;

export type FramesMiddleware<
  TState extends JsonValue | undefined,
  TReturnedContext extends AllowedFramesContextShape
> = (
  context: FramesContext<TState>,
  next: FramesMiddlewareNextFunction<TState, TReturnedContext>
) => FramesMiddlewareReturnType<TState>;

export enum Features {
  /**
   * Fetches Farcaster user details, e.g. profile name, fid, number of followers/followings, etc.
   */
  USER_DETAILS = "user_details",
  /**
   * Fetches ERC20 mints of a Farcaster user across all chain supported by Airstack, including Ethereum, Base, Zora, etc.
   */
  ERC20_MINTS = "erc20_mints",
  /**
   * Fetches NFT mints of a Farcaster user across all chain supported by Airstack, including Ethereum, Base, Zora, etc.
   */
  NFT_MINTS = "nft_mints",
  /**
   * Fetches ERC20 balances of a Farcaster user across all chain supported by Airstack, including Ethereum, Base, Zora, etc.
   */
  ERC20_BALANCES = "erc20_balances",
  /**
   * Fetches NFT balances of a Farcaster user across all chain supported by Airstack, including Ethereum, Base, Zora, etc.
   */
  NFT_BALANCES = "nft_balances",
  /**
   * Fetches POAP events attended by a Farcaster user.
   */
  POAPS = "poaps",
  /**
   * Fetches token transfers sent by a Farcaster user across all chain supported by Airstack, including Ethereum, Base, Zora, etc.
   */
  TOKEN_TRANSFERS_SENT = "token_transfers_sent",
  /**
   * Fetches token transfers received by a Farcaster user across all chain supported by Airstack, including Ethereum, Base, Zora, etc.
   */
  TOKEN_TRANSFERS_RECEIVED = "token_transfers_received",
  /**
   * Fetches Farcaster followings of a Farcaster user.
   */
  FARCASTER_FOLLOWINGS = "farcaster_followings",
  /**
   * Fetches Farcaster followers of a Farcaster user.
   */
  FARCASTER_FOLLOWERS = "farcaster_followers",
  /**
   * Fetches Farcaster channels of a Farcaster user.
   */
  FARCASTER_CHANNELS = "farcaster_channels",
  /**
   * Fetches Farcaster casts of a Farcaster user.
   */
  FARCASTER_CASTS = "farcaster_casts",
}

export interface OnchainDataInput {
  /**
   * Airstack API Key. Get your key from https://app.airstack.xyz/profile-settings/api-keys.
   */
  apiKey: string;
  /**
   * List of features to fetch from the onchain data and injected into the Frame's context.
   */
  features: Features[];
}

export interface OnchainDataOutput {
  userDetails?: FarcasterUserDetailsData;
  erc20Mints?: (FarcasterUserERC20MintsOutputData | null)[] | null | undefined;
  nftMints?: (FarcasterUserNFTMintsOutputData | null)[] | null | undefined;
  erc20Balances?:
    | (FarcasterUserERC20BalancesOutputData | null)[]
    | null
    | undefined;
  nftBalances?:
    | (FarcasterUserNFTBalancesOutputData | null)[]
    | null
    | undefined;
  poaps?: (FarcasterUserPoapsOutputData | null)[] | null | undefined;
  tokenTransfersSent?:
    | (FarcasterUserTokenSentFromOutputData | null)[]
    | null
    | undefined;
  tokenTransfersReceived?:
    | (FarcasterUserTokenReceivedByOutputData | null)[]
    | null
    | undefined;
  farcasterFollowings?:
    | (FarcasterFollowingsOutputData | null)[]
    | null
    | undefined;
  farcasterFollowers?:
    | (FarcasterFollowersOutputData | null)[]
    | null
    | undefined;
  farcasterChannels?:
    | (FarcasterChannelsByParticipantOutputData | null)[]
    | null
    | undefined;
  farcasterCasts?: (FarcasterUserCastsOutputData | null)[] | null | undefined;
}

export enum AllowListCriteriaEnum {
  /**
   * Check if the user has certain number of farcaster followers
   */
  NUMBER_OF_FARCASTER_FOLLOWERS = "number_of_farcaster_followers",
  /**
   * Check if the user is followed by certain users on farcaster
   */
  FARCASTER_FOLLOWED_BY = "farcaster_followed_by",
  /**
   * Check if the user is following certain users on farcaster
   */
  FARCASTER_FOLLOWING = "farcaster_following",
  /**
   * Check if the user is following the caster
   */
  FARCASTER_FOLLOWING_CASTER = "farcaster_following_caster",
  /**
   * Check if the user is holding certain token
   */
  TOKEN_HOLD = "token_hold",
  /**
   * Check if the user has minted certain token
   */
  TOKEN_MINT = "token_mint",
}

export interface CheckNumberOfFarcasterFollowersrOutput {
  error?: any;
  data?: boolean;
}

export interface CheckNumberOfFarcasterFollowersInput {
  fid: number;
  followerCountCriteria: Int_Comparator_Exp;
}

export interface GetTrendingSwapsInput {
  chains: TrendingSwapsBlockchain[];
  criteria: TrendingSwapsCriteria;
  timeFrame: TimeFrame;
  limit?: number;
}

export interface GetTrendingSwapsOutputData {
  address: string | null;
  blockchain: string | null;
  buyTransactionCount: number | null;
  buyVolume: number | null;
  sellTransactionCount: number | null;
  sellVolume: number | null;
  timeFrom: any | null;
  timeTo: any | null;
  totalTransactionCount: number | null;
  totalUniqueWallets: number | null;
  totalVolume: number | null;
  uniqueBuyWallets: number | null;
  uniqueSellWallets: number | null;
  name: string | null | undefined;
  symbol: string | null | undefined;
}

export type GetTrendingSwapsOutput = IteratePaginationResponse<
  GetTrendingSwapsOutputData[] | null | undefined
>;

export type TrendingSwapsQueryVariables = Exact<{
  criteria: TrendingSwapsCriteria;
  timeFrame: TimeFrame;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type TrendingSwapsQuery = {
  ethereum?: {
    TrendingSwap: Array<{
      address: string | null;
      blockchain: string | null;
      buyTransactionCount: number | null;
      buyVolume: number | null;
      sellTransactionCount: number | null;
      sellVolume: number | null;
      timeFrom: any | null;
      timeTo: any | null;
      totalTransactionCount: number | null;
      totalUniqueWallets: number | null;
      totalVolume: number | null;
      uniqueBuyWallets: number | null;
      uniqueSellWallets: number | null;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
  base?: {
    TrendingSwap: Array<{
      address: string | null;
      blockchain: string | null;
      buyTransactionCount: number | null;
      buyVolume: number | null;
      sellTransactionCount: number | null;
      sellVolume: number | null;
      timeFrom: any | null;
      timeTo: any | null;
      totalTransactionCount: number | null;
      totalUniqueWallets: number | null;
      totalVolume: number | null;
      uniqueBuyWallets: number | null;
      uniqueSellWallets: number | null;
      token: { name: string | null; symbol: string | null } | null;
    }> | null;
  } | null;
};

export enum TrendingSwapsBlockchain {
  /**
   * Base chain (L2)
   */
  Base = "base",
  /**
   * Ethereum mainnet
   */
  Ethereum = "ethereum",
}

export enum TrendingSwapsCriteria {
  /**
   * Sort the trending swaps by the number of buy transactions.
   */
  BuyTransactionCount = "buy_transaction_count",
  /**
   * Sort the trending swaps by the number of buying volume.
   */
  BuyVolume = "buy_volume",
  /**
   * Sort the trending swaps by the number of sell transactions.
   */
  SellTransactionCount = "sell_transaction_count",
  /**
   * Sort the trending swaps by the number of selling volume.
   */
  SellVolume = "sell_volume",
  /**
   * Sort the trending swaps by the number of total buy & sell transactions.
   */
  TotalTransactionCount = "total_transaction_count",
  /**
   * Sort the trending swaps by the number of total unique buyer & seller wallets swapping.
   */
  TotalUniqueWallets = "total_unique_wallets",
  /**
   * Sort the trending swaps by the number of total buying & selling volume.
   */
  TotalVolume = "total_volume",
  /**
   * Sort the trending swaps by the number of unique buyer wallets swapping.
   */
  UniqueBuyWallets = "unique_buy_wallets",
  /**
   * Sort the trending swaps by the number of unique seller wallets swapping.
   */
  UniqueSellWallets = "unique_sell_wallets",
}

export interface FarcasterUserCastsInput {
  fid: number;
  hasEmbeds?: boolean;
  hasFrames?: boolean;
  hasMentions?: boolean;
  limit?: number;
}

export interface FarcasterUserCastsOutputData {
  castHash: string | null;
  castedAtTimestamp: any;
  castUrl: string | null;
  embeds: any[] | null;
  text: string | null;
  numberOfRecasts: number | null;
  numberOfLikes: number | null;
  numberOfReplies: number | null;
  channel: string | undefined;
  mentions: Array<{ fid: string | null; position: number | null }> | null;
  frame: { frameHash: string | null; frameUrl: string | null } | null;
}

export type FarcasterUserCastsOutput = IteratePaginationResponse<
  (FarcasterUserCastsOutputData | null)[] | null | undefined
>;

export type FarcasterUserCastsQueryVariables = Exact<{
  identity: Scalars["Identity"]["input"];
  hasEmbeds?: InputMaybe<Scalars["Boolean"]["input"]>;
  hasFrames?: Scalars["Boolean"]["input"];
  hasMentions?: Scalars["Boolean"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type FarcasterUserCastsQuery = {
  FarcasterCasts: {
    Cast: Array<{
      hash: string | null;
      castedAtTimestamp: any | null;
      embeds: Array<any | null> | null;
      url: string | null;
      text: string | null;
      numberOfRecasts: number | null;
      numberOfLikes: number | null;
      numberOfReplies: number | null;
      channel: { channelId: string } | null;
      mentions: Array<{ fid: string | null; position: number | null }> | null;
      frame: { frameHash: string | null; frameUrl: string | null } | null;
    }> | null;
  } | null;
};
