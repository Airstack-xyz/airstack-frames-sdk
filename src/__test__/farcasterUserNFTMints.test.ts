import { init } from "@airstack/node";
import { getFarcasterUserNFTMints } from "../functions/getFarcasterUserNFTMints";
import { config } from "dotenv";

config();

describe("getFarcasterUserNFTMints", () => {
  it("should fail if no api key is porivded", async () => {
    const { data, error } = await getFarcasterUserNFTMints({ fid: 3 });
    expect(error).toBeTruthy();
    expect(data).toBeNull();
  });

  it("should return a promise with the data and error properties", async () => {
    init(process.env.AIRSTACK_API_KEY ?? "");
    const { data, error } = await getFarcasterUserNFTMints({ fid: 3 });
    expect(error).toBeNull();
    expect(data).toBeTruthy();
    // By default, without any limit input, should return a maximum of 200 NFTs
    expect(data?.length).toBeLessThanOrEqual(200 * 4);
  });

  it("should return the NFT balances lengths that has less than or equal to the set limit", async () => {
    init(process.env.AIRSTACK_API_KEY ?? "");
    const limit = 10;
    const { data, error } = await getFarcasterUserNFTMints({
      fid: 3,
      limit,
    });
    expect(error).toBeNull();
    expect(data?.length).toBeLessThanOrEqual(limit * 4);
  });
});
