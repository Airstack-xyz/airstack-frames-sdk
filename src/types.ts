import { InputMaybe, TokenBlockchain, TokenType } from "./graphql/types";

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
  tokenType?: InputMaybe<TokenType | TokenType[]>;
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
