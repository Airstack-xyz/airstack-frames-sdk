import sha256 from "sha256";
import { v4 as uuidv4 } from "uuid";
import { generateRandomNumberInRange } from "../utils/generateRandomNumberInRange";
import {
  FrameRatio,
  GenerateCaptchaChallengeInput,
  GenerateCaptchaChallengeOutput,
} from "../types";
import fetch from "node-fetch";
import { FRAMES_SDK_API } from "../constants";

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
    const { options } = input ?? {};
    const numA = generateRandomNumberInRange(1, 30);
    const numB = generateRandomNumberInRange(1, 30);
    const { includeImage = true } = options ?? {};
    if (includeImage) {
      const res = await fetch(
        `${FRAMES_SDK_API}/api/images/generate-captcha?numA=${numA}&numB=${numB}&ratio=${
          options?.ratio ?? FrameRatio._1_91__1
        }`
      );
      image = (await res.json())?.image;
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
