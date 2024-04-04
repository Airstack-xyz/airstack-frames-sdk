import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validatedCaptchaImageSvg } from "../../../src/utils/validatedCaptchaImageSvg";
import { FrameRatio } from "../../../src/types";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { isValidated = false, ratio = FrameRatio._1_91__1 } = req.query;
  return res.json({
    image: await validatedCaptchaImageSvg(isValidated as boolean, {
      ratio: ratio as FrameRatio,
    }),
  });
}
