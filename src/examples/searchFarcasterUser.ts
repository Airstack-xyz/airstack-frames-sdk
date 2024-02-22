import {
  init,
  searchFarcasterUsers,
  SearchFarcasterUsersInput,
  SearchFarcastersOutput,
} from "..";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: SearchFarcasterUsersInput = {
    profileName: "a",
    limit: 10,
  };
  const { data, error }: SearchFarcastersOutput = await searchFarcasterUsers(
    input
  );

  if (error) throw new Error(error);

  console.log(data);
})();
