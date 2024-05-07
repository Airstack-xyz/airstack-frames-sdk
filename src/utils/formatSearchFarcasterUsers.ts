import { SearchFarcasterUsersQuery } from "../graphql/types";

export function formatSearchFarcasterUsers(data: SearchFarcasterUsersQuery) {
  return (
    data?.Socials?.Social?.map(
      ({
        profileName,
        fnames,
        custodyAddress,
        connectedAddresses,
        userAssociatedAddresses,
        followerCount,
        followingCount,
        fid,
        profileImageContentValue,
      }) => {
        const { image: profileImage } = profileImageContentValue ?? {};
        return {
          profileName,
          fnames,
          custodyAddress,
          connectedAddresses,
          userAssociatedAddresses,
          followerCount,
          followingCount,
          fid,
          profileImage,
        };
      }
    ) ?? []
  );
}
