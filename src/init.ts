import { config } from "./config";
import { init as sdkInit } from "@airstack/node";

export function init(key: string) {
  config.authKey = key;
  sdkInit(key);
}
