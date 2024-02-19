import { init } from "@airstack/node";
import { checkIsFollowingFarcasterUser } from "../functions/checkIsFollowingFarcasterUser";
import { config } from "dotenv";

config();

describe("checkIsFollowingFarcasterUser", () => {
  it("should fail if no api key is porivded", async () => {
    const { data, error } = await checkIsFollowingFarcasterUser({
      fid: 602,
      isFollowing: [15971, 2602],
    });
    expect(error).toBeTruthy();
    expect(data).toBeNull();
  });

  it("should return a promise with the data and error properties", async () => {
    init(process.env.AIRSTACK_API_KEY ?? "");
    const { data, error } = await checkIsFollowingFarcasterUser({
      fid: 602,
      isFollowing: [15971, 2602],
    });
    expect(error).toBeNull();
    expect(data).toBeTruthy();
    // By default, without any limit input, should return a maximum of 200 NFTs
    expect(data?.length).toBeLessThanOrEqual(200);
  });
});
