import { FarcasterFollowersQuery } from "../graphql/types";

export function formatFarcasterFollowers(data: FarcasterFollowersQuery) {
  return data?.SocialFollowers?.Follower?.map(({ followerAddress }) => {
    const {
      profileName,
      userId: fid,
      fnames,
      profileImageContentValue,
      userAssociatedAddresses,
      followerCount,
      followingCount,
    } = followerAddress?.socials?.[0] ?? {};
    const { image: profileImage } = profileImageContentValue ?? {};
    return {
      profileName,
      fnames,
      fid,
      profileImage,
      userAssociatedAddresses,
      followerCount,
      followingCount,
    };
  });
}
