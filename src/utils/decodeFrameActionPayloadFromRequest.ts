import { ValidateFramesMessageInput as FrameActionPayload } from "../types";
import {
  InvalidFrameActionPayloadError,
  RequestBodyNotJSONError,
} from "../errors";

function isValidFrameActionPayload(
  value: unknown
): value is FrameActionPayload {
  return (
    typeof value === "object" &&
    !!value &&
    "trustedData" in value &&
    "untrustedData" in value
  );
}

export async function decodeFrameActionPayloadFromRequest(
  request: Request
): Promise<FrameActionPayload | undefined> {
  try {
    // use clone just in case someone wants to read body somewhere along the way
    const body = await request
      .clone()
      .json()
      .catch(() => {
        throw new RequestBodyNotJSONError();
      });

    if (!isValidFrameActionPayload(body)) {
      throw new InvalidFrameActionPayloadError();
    }

    return body;
  } catch (e) {
    if (
      e instanceof RequestBodyNotJSONError ||
      e instanceof InvalidFrameActionPayloadError
    ) {
      return undefined;
    }

    console.error(e);

    return undefined;
  }
}
