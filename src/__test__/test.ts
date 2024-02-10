import { init, getFarcasterFollowers } from "../index";
import { config } from "dotenv";

config();

const main = async () => {
  if (!process.env.AIRSTACK_API_KEY) throw new Error("No API Key provided!");
  // Initialize SDK
  init(process.env.AIRSTACK_API_KEY);
  const {
    data: followers,
    hasNextPage,
    getNextPage,
  } = await getFarcasterFollowers({
    fid: 1,
    limit: 5,
  });
  console.log(followers);

  if (hasNextPage) {
    const { data: followers2, hasPrevPage, getPrevPage } = await getNextPage();
    console.log(followers2);
    if (hasPrevPage) {
      const { data: followers3 } = await getPrevPage();
      console.log(followers3);
    }
  }
  //   console.log(followers, error);
};

main();
