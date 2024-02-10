import { init } from "@airstack/node";
import { getFarcasterFollowings } from "../functions/getFarcasterFollowings";
import { config } from "dotenv";

config();

describe("getFarcasterFollowings", () => {
  it("should fail if no api key is porivded", async () => {
    const { data, error } = await getFarcasterFollowings({ fid: 1 });
    expect(error).toBeTruthy();
    // expect(data).toHaveLength(10);
    expect(data).toBeNull();
  });

  it("should return a promise with the data and error properties", async () => {
    init(process.env.AIRSTACK_API_KEY ?? "");
    const { data, error } = await getFarcasterFollowings({ fid: 2 });
    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect(data?.length).toBeLessThanOrEqual(200);
  });

  it("should return the followings lengths that has less than or equal to the set limit", async () => {
    init(process.env.AIRSTACK_API_KEY ?? "");
    const limit = 10;
    const { data, error } = await getFarcasterFollowings({ fid: 1, limit });
    expect(error).toBeNull();
    expect(data?.length).toBeLessThanOrEqual(limit);
  });

  it("should paginate data correctly by data comparison", async () => {
    init(process.env.AIRSTACK_API_KEY ?? "");
    const { data } = await getFarcasterFollowings({
      fid: 1,
      limit: 2,
    });
    expect(data).toBeTruthy();
    expect(data?.length).toBeLessThanOrEqual(2);
    const {
      data: data2,
      hasNextPage,
      getNextPage,
    } = await getFarcasterFollowings({
      fid: 1,
      limit: 1,
    });
    // Check if the 1st data from each result are the same
    expect(data?.[0]?.fid)?.toEqual(data2?.[0]?.fid);
    if (data && data?.length > 1 && hasNextPage) {
      const { data: data3 } = await getNextPage();
      // Check if the 2nd data from each result are the same
      expect(data?.[1]?.fid)?.toEqual(data3?.[0]?.fid);
    }
  });
});
