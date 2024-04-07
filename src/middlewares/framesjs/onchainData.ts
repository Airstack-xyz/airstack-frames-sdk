import {
  getFarcasterChannelsByParticipant,
  getFarcasterFollowers,
  getFarcasterFollowings,
  getFarcasterUserCasts,
  getFarcasterUserDetails,
  getFarcasterUserERC20Balances,
  getFarcasterUserERC20Mints,
  getFarcasterUserNFTBalances,
  getFarcasterUserNFTMints,
  getFarcasterUserPoaps,
  getFarcasterUserTokenReceivedBy,
  getFarcasterUserTokenSentFrom,
  init,
} from "../../";
import {
  Features,
  FramesMiddleware,
  OnchainDataInput,
  OnchainDataOutput,
} from "../../types";
import { config } from "dotenv";
import { decodeFrameActionPayloadFromRequest } from "../../utils/decodeFrameActionPayloadFromRequest";
import { FrameActionMessage, Message } from "@farcaster/core";
import { config as configEnv } from "../../config";

config();

/**
 *
 * @param input
 * @returns
 */
export const onchainDataFramesjsMiddleware = (
  input: OnchainDataInput
): FramesMiddleware<any, OnchainDataOutput> => {
  const { apiKey, features } = input ?? {};
  // If an apiKey is provided, initialize the SDK with custom API key
  if (apiKey && !configEnv?.authKey) init(apiKey);
  return async (ctx, next) => {
    let onchainRes = {};

    // frame message is available only if the request is a POST request
    if (ctx.request.method !== "POST") {
      return next();
    }
    // body must be a JSON object
    const payload = await decodeFrameActionPayloadFromRequest(ctx.request);

    // for initial frame, directly return the Frame
    if (!payload) {
      return next();
    }

    const decodedMessage = Message.decode(
      Buffer.from(payload.trustedData.messageBytes, "hex")
    ) as FrameActionMessage;

    const { fid } = decodedMessage?.data ?? {};
    try {
      const [
        userDetailsResponse,
        erc20MintsResponse,
        nftMintsResponse,
        erc20BalancesResponse,
        nftBalancesResponse,
        poapsResponse,
        tokenTransfersSentResponse,
        tokenTransfersReceivedResponse,
        farcasterFollowingsResponse,
        farcasterFollowersResponse,
        farcasterChannelsResponse,
        farcasterCastsResponse,
      ] = await Promise.all([
        features.includes(Features.USER_DETAILS)
          ? getFarcasterUserDetails({
              fid,
            })
          : Promise.resolve(undefined),
        features.includes(Features.ERC20_MINTS)
          ? getFarcasterUserERC20Mints({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.NFT_MINTS)
          ? getFarcasterUserNFTMints({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.ERC20_BALANCES)
          ? getFarcasterUserERC20Balances({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.NFT_BALANCES)
          ? getFarcasterUserNFTBalances({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.POAPS)
          ? getFarcasterUserPoaps({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.TOKEN_TRANSFERS_SENT)
          ? getFarcasterUserTokenSentFrom({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.TOKEN_TRANSFERS_RECEIVED)
          ? getFarcasterUserTokenReceivedBy({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.FARCASTER_FOLLOWINGS)
          ? getFarcasterFollowings({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.FARCASTER_FOLLOWERS)
          ? getFarcasterFollowers({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.FARCASTER_CHANNELS)
          ? getFarcasterChannelsByParticipant({ fid })
          : Promise.resolve(undefined),
        features.includes(Features.FARCASTER_CASTS)
          ? getFarcasterUserCasts({ fid })
          : Promise.resolve(undefined),
      ]);

      if (userDetailsResponse) {
        onchainRes = { ...onchainRes, userDetails: userDetailsResponse.data };
      }

      if (erc20MintsResponse) {
        onchainRes = { ...onchainRes, erc20Mints: erc20MintsResponse.data };
      }

      if (nftMintsResponse) {
        onchainRes = { ...onchainRes, nftMints: nftMintsResponse.data };
      }

      if (erc20BalancesResponse) {
        onchainRes = {
          ...onchainRes,
          erc20Balances: erc20BalancesResponse.data,
        };
      }

      if (nftBalancesResponse) {
        onchainRes = { ...onchainRes, nftBalances: nftBalancesResponse.data };
      }

      if (poapsResponse) {
        onchainRes = { ...onchainRes, poaps: poapsResponse.data };
      }

      if (tokenTransfersSentResponse) {
        onchainRes = {
          ...onchainRes,
          tokenTransfersSent: tokenTransfersSentResponse.data,
        };
      }

      if (tokenTransfersReceivedResponse) {
        onchainRes = {
          ...onchainRes,
          tokenTransfersReceived: tokenTransfersReceivedResponse.data,
        };
      }

      if (farcasterFollowingsResponse) {
        onchainRes = {
          ...onchainRes,
          farcasterFollowings: farcasterFollowingsResponse.data,
        };
      }

      if (farcasterFollowersResponse) {
        onchainRes = {
          ...onchainRes,
          farcasterFollowers: farcasterFollowersResponse.data,
        };
      }

      if (farcasterChannelsResponse) {
        onchainRes = {
          ...onchainRes,
          farcasterChannels: farcasterChannelsResponse.data,
        };
      }

      if (farcasterCastsResponse) {
        onchainRes = {
          ...onchainRes,
          farcasterCasts: farcasterCastsResponse.data,
        };
      }

      return next(onchainRes);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  };
};
