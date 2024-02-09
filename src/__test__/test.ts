import { init, getFarcasterUserDetails } from "../index";
import { config } from "dotenv";

config();

const main = async () => {
  if (!process.env.AIRSTACK_API_KEY) throw new Error("No API Key provided!");
  // Initialize SDK
  init(process.env.AIRSTACK_API_KEY);
  const { userDetails, error } = await getFarcasterUserDetails({ fid: 1 });
  console.log(userDetails, error);
};

main();
