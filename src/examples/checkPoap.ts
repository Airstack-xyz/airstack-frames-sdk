import { init } from "@airstack/node";
import {
  CheckPoapAttendedByFarcasterUserInput,
  CheckPoapAttendedByFarcasterUserOutput,
} from "../types";
import { config } from "dotenv";
import { checkPoapAttendedByFarcasterUser } from "../functions";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: CheckPoapAttendedByFarcasterUserInput = {
    fid: 15971,
    eventId: [160005, 159993, 13242],
  };
  const { data, error }: CheckPoapAttendedByFarcasterUserOutput =
    await checkPoapAttendedByFarcasterUser(input);

  if (error) throw new Error(error);

  console.log(data);
})();
