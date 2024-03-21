import sha256 from "sha256";
import { v4 as uuidv4 } from "uuid";
import { generateRandomNumberInRange } from "../utils/generateRandomNumberInRange";
import { generateCaptchaImageSvg } from "../utils/generateCaptchaImageSvg";
import {
  FrameRatio,
  GenerateCaptchaChallengeInput,
  GenerateCaptchaChallengeOutput,
} from "../types";

/**
 * @description Generate Captcha challenge for Farcaster Frames
 * @example
 * const { data, image, state } = await generateCaptchaChallenge();
 *
 * @param {FrameRatio} [input.options.ratio=FrameRatio._1_91__1] The frames image ratio for the captcha
 * @param {Boolean} [input.options.includeImage=true] Whether to include the image in the response
 * @returns Captcha challenge generation, including the image and the state (this can be stored in Frame's state)
 */
export async function generateCaptchaChallenge(
  input?: GenerateCaptchaChallengeInput
): Promise<GenerateCaptchaChallengeOutput> {
  try {
    let image;
    const { options = { ratio: FrameRatio._1_91__1, includeImage: true } } =
      input ?? {};
    const numA = generateRandomNumberInRange(1, 30);
    const numB = generateRandomNumberInRange(1, 30);
    const { includeImage } = options ?? {};
    if (includeImage) {
      image = await generateCaptchaImageSvg(numA, numB, options);
    }
    const captchaId = uuidv4();
    return {
      ...(includeImage ? { image } : {}),
      data: { numA, numB },
      state: {
        captchaId,
        valueHash: sha256.x2(`${captchaId},${numA + numB}`),
      },
    };
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}
