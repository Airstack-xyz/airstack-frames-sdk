import {
  ValidateCaptchaChallengeInput,
  ValidateCaptchaChallengeOutput,
} from "../types";
import sha256 from "sha256";
import { FrameRatio } from "../types";
import { validatedCaptchaImageSvg } from "../utils/validatedCaptchaImageSvg";

/**
 * @description Validate Captcha challenges that was generated for Farcaster Frames
 * @example
 * const { isValidated, image } = await validateCaptchaChallenge({ inputText, state });
 *
 * @param {String} input.inputText The input text to verify the captcha
 * @param {Object} input.state The state of the captcha challenge from `generateCaptchaChallenge`
 * @param {FrameRatio} [input.options.ratio=FrameRatio._1_91__1] The frames image ratio for the captcha
 * @param {Boolean} [input.options.includeImage=true] Whether to include the image in the response
 * @returns Show whether the captcha challenge is validated or not and the image
 */
export async function validateCaptchaChallenge(
  input: ValidateCaptchaChallengeInput
): Promise<ValidateCaptchaChallengeOutput> {
  try {
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
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}
