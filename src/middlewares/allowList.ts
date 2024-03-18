import type { MiddlewareHandler } from "hono";
import {
  type AllowListCriteria,
  type Pretty,
  type TokenBlockchain,
  createAllowList,
  validateFramesMessage,
} from "..";
import { hexToBytes } from "viem";
import { Message } from "../protobufs/generated/message_pb.js";
import { messageToFrameData } from "../utils/messageToFrameData";

export type AllowListMiddlewareParameters = {
  allowListCriteria: AllowListCriteria;
  isAllowedFunction?: ({
    isPoapsAttended,
    isFollowingUsersOnFarcaster,
    isFarcasterFollowerCountAbove,
    isTokensHold,
  }: {
    isPoapsAttended?: { eventId: number; isAttended: boolean }[];
    isFollowingUsersOnFarcaster?: { fid: number; isFollowing: boolean }[];
    isFarcasterFollowerCountAbove?: boolean;
    isTokensHold?: {
      chain: TokenBlockchain;
      tokenAddress: string;
      isHold: boolean;
    }[];
  }) => Promise<boolean> | boolean;
};

export type AllowListMiddlewareVariables = {
  isAllowed: Pretty<boolean> | undefined;
};

export function allowList(
  parameters: AllowListMiddlewareParameters
): MiddlewareHandler<{ Variables: AllowListMiddlewareVariables }> {
  return async (c: any, next: any) => {
    let fid: number;
    const body = (await c.req.json().catch(() => {})) || {};
    const { trustedData } = body ?? {};
    if (process.env.NODE_ENV === "development") {
      if (!trustedData) return await next();
      // In development, we verify the message internally
      const trustedBody = hexToBytes(`0x${trustedData?.messageBytes}`);
      const message = Message.fromBinary(trustedBody);
      const frameData = messageToFrameData(message);
      fid = frameData?.fid as number;
    } else {
      // In production, get fid from the validated message
      const { message } = await validateFramesMessage(body);
      const { data } = message ?? {};
      fid = data?.fid as number;
    }

    // Check if the user is allowed
    const { isAllowed } = await createAllowList({
      fid,
      ...parameters,
    });

    // Add `isAllowed` to the context
    c.set("isAllowed", isAllowed);

    await next();
  };
}
