import { FarcasterFollowingsQuery } from "../graphql/types";

export function formatFarcasterFollowings(data: FarcasterFollowingsQuery) {
  return (
    data?.SocialFollowings?.Following?.map(({ followingAddress }) => {
      const {
        profileName,
        fnames,
        userId: fid,
        profileImageContentValue,
        custodyAddress,
        connectedAddresses,
        userAssociatedAddresses,
        followerCount,
        followingCount,
      } = followingAddress?.socials?.[0] ?? {};
      const { image: profileImage } = profileImageContentValue ?? {};
      return {
        profileName,
        fnames,
        fid,
        profileImage,
        custodyAddress,
        connectedAddresses,
        userAssociatedAddresses,
        followerCount,
        followingCount,
      };
    }) ?? []
  );
}
