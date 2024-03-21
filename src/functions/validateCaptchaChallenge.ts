import {
  ValidateCaptchaChallengeInput,
  ValidateCaptchaChallengeOutput,
} from "../types";
import sha256 from "sha256";
import { FrameRatio } from "../types";
import { validatedCaptchaImageSvg } from "../utils/validatedCaptchaImageSvg";

/**
 * @description validate frames signature packet with Farcaster Hub
 * @example
 * const res = await validateFramesMessage(body);
 *
 * @param input.body The Frames Signature Packet
 * @returns Whether the signed message is valid or not and the return the message
 */
export async function validateCaptchaChallenge(
  input: ValidateCaptchaChallengeInput
): Promise<ValidateCaptchaChallengeOutput> {
  let image;
  const {
    inputText,
    state,
    options = { ratio: FrameRatio._1_91__1, includeImage: true },
  } = input ?? {};
  const { captchaId, valueHash } = state ?? {};
  const { includeImage } = options ?? {};
  const isValidated = sha256.x2(`${captchaId},${inputText}`) === valueHash;
  if (includeImage) {
    image = await validatedCaptchaImageSvg(isValidated, options);
  }
  return {
    ...(includeImage ? { image } : {}),
    isValidated,
  };
}
