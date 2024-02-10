import { FarcasterFollowersQuery } from "../graphql/types";

export const formatFarcasterFollowers = (
  data: FarcasterFollowersQuery,
  fid: number
) =>
  data?.SocialFollowers?.Follower?.map(({ followerAddress }) => {
    const {
      profileName,
      fnames,
      profileImageContentValue,
      userAssociatedAddresses,
      followerCount,
      followingCount,
    } = followerAddress?.socials?.[0] ?? {};
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
