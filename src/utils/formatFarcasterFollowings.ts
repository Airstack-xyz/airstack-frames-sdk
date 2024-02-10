import { FarcasterFollowingsQuery } from "../graphql/types";

interface FormatFarcasterFollowingsInput {
  data: FarcasterFollowingsQuery;
  fid: number;
}

export function formatFarcasterFollowings({
  data,
  fid,
}: FormatFarcasterFollowingsInput) {
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
