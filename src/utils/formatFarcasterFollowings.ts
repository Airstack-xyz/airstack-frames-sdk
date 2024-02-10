import { FarcasterFollowingsQuery } from "../graphql/types";

export function formatFarcasterFollowings(
  data: FarcasterFollowingsQuery,
  fid: number
) {
  return data?.SocialFollowings?.Following?.map(({ followingAddress }) => {
    const {
      profileName,
      fnames,
      profileImageContentValue,
      userAssociatedAddresses,
      followerCount,
      followingCount,
    } = followingAddress?.socials?.[0] ?? {};
    const { image: profileImage } = profileImageContentValue ?? {};
    return {
      profileName,
      fid,
      fnames,
      profileImage,
      userAssociatedAddresses,
      followerCount,
      followingCount,
    };
  });
}
