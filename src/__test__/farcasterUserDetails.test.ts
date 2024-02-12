import { init } from "@airstack/node";
import { getFarcasterUserDetails } from "../functions/getFarcasterUserDetails";
import { config } from "dotenv";

config();

describe("getFarcasterUserDetails", () => {
  it("should fail if no api key is porivded", async () => {
    const { data, error } = await getFarcasterUserDetails({ fid: 1 });
    expect(error).toBeTruthy();
    expect(data).toBeNull();
  });

  it("should return a promise with the data and error properties", async () => {
    init(process.env.AIRSTACK_API_KEY ?? "");
    const { data, error } = await getFarcasterUserDetails({ fid: 1 });
    expect(error).toBeNull();
    expect(data).toBeTruthy();
  });
});
