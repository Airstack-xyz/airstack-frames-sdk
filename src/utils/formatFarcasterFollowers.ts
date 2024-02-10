import { FarcasterFollowersQuery } from "../graphql/types";

interface FormatFarcasterFollowersInput {
  data: FarcasterFollowersQuery;
  fid: number;
}

export function formatFarcasterFollowers(input: FormatFarcasterFollowersInput) {
  const { data, fid } = input ?? {};
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
