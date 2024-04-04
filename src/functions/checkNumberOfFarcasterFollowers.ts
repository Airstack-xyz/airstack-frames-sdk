import { GraphQLClient } from "graphql-request";
import { numberOfFarcasterFollowersQuery as query } from "../graphql/query/numberOfFarcasterFollowers.query";
import {
  NumberOfFarcasterFollowersQuery,
  NumberOfFarcasterFollowersQueryVariables,
} from "../graphql/types";
import {
  CheckNumberOfFarcasterFollowersInput,
  CheckNumberOfFarcasterFollowersrOutput,
} from "../types";
import { config } from "../config";

export async function checkNumberOfFarcasterFollowers(
  input: CheckNumberOfFarcasterFollowersInput
): Promise<CheckNumberOfFarcasterFollowersrOutput> {
  try {
    const { fid, followerCountCriteria } = input ?? {};
    const client = new GraphQLClient("https://api.airstack.xyz/gql", {
      headers: {
        Authorization: config.authKey,
      },
    });

    const variable: NumberOfFarcasterFollowersQueryVariables = {
      identity: `fc_fid:${fid}`,
      followerCountCriteria,
    };

    const data = await client.request(query, variable);
    return {
      data: Boolean(
        (data as NumberOfFarcasterFollowersQuery)?.Socials?.Social?.[0]
          ?.followerCount
      ),
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
