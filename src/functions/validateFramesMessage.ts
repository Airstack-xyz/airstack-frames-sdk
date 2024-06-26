import fetch from "node-fetch";
import { config } from "../config";
import {
  ValidateFramesMessageInput,
  ValidateFramesMessageJSONResponse,
  ValidateFramesMessageOutput,
} from "../types";
import { hexStringToUint8Array } from "../utils/hexStringToUint8Array";
import { FrameActionMessage, Message } from "@farcaster/core";
import { bytesFromBase64 } from "../utils/bytesFromBase64";

/**
 * @description validate frames signature packet with Farcaster Hub
 * @example
 * const res = await validateFramesMessage(body);
 *
 * @param input.body The Frames Signature Packet
 * @returns Whether the signed message is valid or not and the return the message
 */
export async function validateFramesMessage(
  body: ValidateFramesMessageInput
): Promise<ValidateFramesMessageOutput> {
  if (!body) {
    throw new Error(
      "Tried to call validateFrameMessage with no frame action payload. You may be calling it incorrectly on the homeframe"
    );
  }

  if (!config.authKey) {
    throw new Error("API Key is not provided.");
  }

  try {
    const validateMessageResponse = await fetch(
      "https://hubs.airstack.xyz/v1/validateMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "x-airstack-hubs": config.authKey,
        },
        body: hexStringToUint8Array(body.trustedData.messageBytes),
      }
    );

    const { valid, message }: ValidateFramesMessageJSONResponse =
      await validateMessageResponse.json();

    const formattedMessage = Message.fromJSON(message);
    if (formattedMessage.data?.frameActionBody?.castId?.hash)
      formattedMessage.data.frameActionBody.castId.hash = bytesFromBase64(
        body.untrustedData.castId.hash
      );

    if (valid) {
      return {
        isValid: true,
        message: formattedMessage as FrameActionMessage,
      };
    } else {
      return {
        isValid: false,
        message: undefined,
      };
    }
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}
