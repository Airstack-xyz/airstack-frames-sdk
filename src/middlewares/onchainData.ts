import {
  init,
  validateFramesMessage,
  getFarcasterUserERC20Balances,
  getFarcasterUserDetails,
  getFarcasterUserNFTBalances,
  getFarcasterUserERC20Mints,
  getFarcasterUserNFTMints,
  getFarcasterUserPoaps,
  getFarcasterChannelsByParticipant,
} from "..";
import type {
  OnchainDataMiddlewareParameters,
  OnchainDataVariables,
} from "../types";
import type { MiddlewareHandler } from "hono";
import { config } from "../config";

export const onchainData = (
  parameters: OnchainDataMiddlewareParameters
): MiddlewareHandler<{ Variables: OnchainDataVariables }> => {
  const { apiKey, features, env = "prod" } = parameters ?? {};
  const {
    userDetails,
    erc20Balances,
    nftBalances,
    erc20Mints,
    nftMints,
    poaps,
    channels,
  } = features ?? {};
  // If an apiKey is provided, initialize the SDK with custom API key
  if (apiKey && !config?.authKey) init(apiKey);
  return async (c, next) => {
    let fid = 1;
    const body = (await c.req.json().catch(() => {})) || {};
    if (env === "dev") {
      const { untrustedData } = body ?? {};
      fid = untrustedData?.fid as number;
    } else {
      // In production, get fid from the validated message
      const { message } = await validateFramesMessage(body);
      const { data } = message ?? {};
      fid = data?.fid as number;
    }

    if (fid) {
      const [
        userDetailsResponse,
        erc20BalancesResponse,
        nftBalancesResponse,
        erc20MintsResponse,
        nftMintsResponse,
        poapsResponse,
        channelsResponse,
      ] = await Promise.all([
        userDetails
          ? getFarcasterUserDetails({ fid, ...(userDetails ?? {}) })
          : Promise.resolve(undefined),
        erc20Balances
          ? getFarcasterUserERC20Balances({ fid, ...(erc20Balances ?? {}) })
          : Promise.resolve(undefined),
        nftBalances
          ? getFarcasterUserNFTBalances({ fid, ...(nftBalances ?? {}) })
          : Promise.resolve(undefined),
        erc20Mints
          ? getFarcasterUserERC20Mints({ fid, ...(erc20Mints ?? {}) })
          : Promise.resolve(undefined),
        nftMints
          ? getFarcasterUserNFTMints({ fid, ...(nftMints ?? {}) })
          : Promise.resolve(undefined),
        poaps
          ? getFarcasterUserPoaps({ fid, ...(poaps ?? {}) })
          : Promise.resolve(undefined),
        channels
          ? getFarcasterChannelsByParticipant({ fid, ...(channels ?? {}) })
          : Promise.resolve(undefined),
      ]);

      if (userDetailsResponse)
        c.set<"userDetails">("userDetails", userDetailsResponse.data);
      if (erc20BalancesResponse)
        c.set<"erc20Balances">("erc20Balances", erc20BalancesResponse.data);
      if (nftBalancesResponse)
        c.set<"nftBalances">("nftBalances", nftBalancesResponse.data);
      if (erc20MintsResponse)
        c.set<"erc20Mints">("erc20Mints", erc20MintsResponse.data);
      if (nftMintsResponse)
        c.set<"nftMints">("nftMints", nftMintsResponse.data);
      if (poapsResponse) c.set<"poaps">("poaps", poapsResponse.data);
      if (channelsResponse)
        c.set<"channels">("channels", channelsResponse.data);
    }

    await next();
  };
};
