import { fetchQuery } from "@airstack/node";
import {
  CheckPoapAttendedByFarcasterUserQuery,
  CheckPoapAttendedByFarcasterUserQueryVariables,
} from "../graphql/types";
import {
  CheckPoapAttendedByFarcasterUserInput,
  CheckPoapAttendedByFarcasterUserOutput,
} from "../types";
import { checkPoapAttendedByFarcasterUserQuery as query } from "../graphql/query/checkPoapAttendedByFarcasterUser.query";

export async function checkPoapAttendedByFarcasterUser(
  input: CheckPoapAttendedByFarcasterUserInput
): Promise<CheckPoapAttendedByFarcasterUserOutput> {
  const { fid, eventId } = input ?? {};
  const variable: CheckPoapAttendedByFarcasterUserQueryVariables = {
    owner: `fc_fid:${fid}`,
    eventId: eventId?.map((id) => id?.toString()),
  };
  const { data, error } = await fetchQuery(query, variable);
  const { Poap } = (data as CheckPoapAttendedByFarcasterUserQuery)?.Poaps ?? {};
  return {
    data: error
      ? null
      : eventId?.map((id) => ({
          eventId: id,
          isAttended: (Poap ?? [])?.some((p) => p?.eventId === id?.toString()),
        })) ?? [],
    error,
  };
}
