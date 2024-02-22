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

/**
 * @description Check If a Farcaster user of a given FID has attended a list of POAP events.
 * @example
 * const { data, error } = await checkPoapAttendedByFarcasterUser({
 *  fid: 1,
 *  eventId: [2, 3, 4],
 * });
 * @param {Number} input.fid Farcaster user FID
 * @param {Array<Number>} input.eventId List of POAP event IDs to check if the Farcaster user has attended.
 * @returns List of the eventId in `eventId` with true or false associated on the status of whether the events are attended or not
 */
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
