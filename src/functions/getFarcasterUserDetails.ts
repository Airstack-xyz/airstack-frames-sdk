import { fetchQuery } from "@airstack/node";
import { farcasterUserDetailsQuery as query } from "../graphql/query/farcasterUserDetails.query";
import type {
  FarcasterUserDetailsQuery,
  FarcasterUserDetailsQueryVariables,
} from "../graphql/types";
import {
  FarcasterUserDetailsInput,
  FarcasterUserDetailsOutput,
} from "../types";

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
          fnames,
          profileImage,
          userAssociatedAddresses,
          followerCount,
          followingCount,
        },
    error,
  };
}
