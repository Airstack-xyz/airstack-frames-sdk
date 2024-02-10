import { FarcasterFollowingsQuery } from "../graphql/types";

export const formatFarcasterFollowings = (
  data: FarcasterFollowingsQuery,
  fid: number
) =>
  data?.SocialFollowings?.Following?.map(({ followingAddress }) => {
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
