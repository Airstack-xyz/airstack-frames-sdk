import { AllowListCriteria } from "../types";
import { fetchQuery } from "@airstack/node";
import { createAllowListQuery as query } from "../graphql/query/createAllowList.query";

export async function checkIfUserIsAllowed(
  fid: number | undefined,
  allowListCriteria: AllowListCriteria
): Promise<boolean> {
  const { eventIds, numberOfFollowersOnFarcaster, isFollowingOnFarcaster } =
    allowListCriteria;
  const { data, error } = await fetchQuery(query, {
    fid: fid?.toString(),
    identity: `fc_fid:${fid}`,
    eventIds: eventIds?.map((id) => id.toString()),
    isFollowingOnFarcaster: isFollowingOnFarcaster?.map((id) => `fc_fid:${id}`),
    followerCountOnFarcaster: numberOfFollowersOnFarcaster,
  });

  if (!error) {
    console.log(data);
    return true;
  } else {
    console.log(error);
    throw new Error(error);
  }
}
