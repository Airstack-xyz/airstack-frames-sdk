import { fetchQuery } from "@airstack/node";
import { farcasterUserDetailsQuery as query } from "../graphql/query/farcasterUserDetails.query";
import type {
  FarcasterUserDetailsQuery,
  FarcasterUserDetailsQueryVariables,
} from "../graphql/types";

export interface FarcasterUserDetailsInput {
  fid: number;
}

export interface FarcasterUserDetailsOutput {
  error: any;
  data:
    | {
        profileName: string | null | undefined;
        fid: number;
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

/**
 * @description Fetch Farcaster user details provided fid
 * @example
 * const { data: userDetails, error } = await getFarcasterUserDetails({
 *  fid: 1
 * });
 * @param {Number} input.fid Farcaster user FID
 * @returns Farcaster user details, including profile name, fname, fid, images, etc.
 */
export async function getFarcasterUserDetails(
  input: FarcasterUserDetailsInput
): Promise<FarcasterUserDetailsOutput> {
  const { fid } = input ?? {};
  const variable: FarcasterUserDetailsQueryVariables = {
    fid: fid.toString(),
  };
  const { data, error } = await fetchQuery(query, variable);
  const {
    profileName,
    fnames,
    profileImageContentValue,
    userAssociatedAddresses,
    followerCount,
    followingCount,
  } = (data as FarcasterUserDetailsQuery)?.Socials?.Social?.[0] ?? {};
  const { image: profileImage } = profileImageContentValue ?? {};
  return {
    data: error
      ? null
      : {
          profileName,
          fid,
          fnames,
          profileImage,
          userAssociatedAddresses,
          followerCount,
          followingCount,
        },
    error,
  };
}
