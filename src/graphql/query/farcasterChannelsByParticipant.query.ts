export const farcasterChannelsByParticipantQuery = /* GraphQL */ `
  query FarcasterChannelsByParticipant(
    $identity: Identity!
    $before: Time
    $after: Time = "1970-01-01T00:00:00Z"
    $limit: Int = 200
    $actionType: [FarcasterChannelActionType!] = [cast, reply]
  ) {
    FarcasterChannelParticipants(
      input: {
        filter: {
          participant: { _eq: $identity }
          channelActions: { _in: $actionType }
          lastActionTimestamp: { _lte: $before, _gte: $after }
        }
        blockchain: ALL
        limit: $limit
      }
    ) {
      FarcasterChannelParticipant {
        channelId
        channel {
          name
          description
          imageUrl
          createdAtTimestamp
          hosts: leadProfiles {
            profileName
            fnames
            fid: userId
            profileImage: profileImageContentValue {
              image {
                extraSmall
                small
                medium
                large
                original
              }
            }
            custodyAddress: userAddress
            connectedAddresses {
              address
              blockchain
              chainId
              timestamp
            }
            userAssociatedAddresses
            followerCount
            followingCount
          }
        }
      }
    }
  }
`;
