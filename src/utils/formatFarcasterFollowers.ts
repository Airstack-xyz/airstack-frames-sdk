import { FarcasterFollowersQuery } from "../graphql/types";

export function formatFarcasterFollowers(
  data: FarcasterFollowersQuery,
  fid: number
) {
  return data?.SocialFollowers?.Follower?.map(({ followerAddress }) => {
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
}
