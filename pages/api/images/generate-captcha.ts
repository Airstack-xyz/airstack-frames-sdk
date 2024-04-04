import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FrameRatio } from "../../../src/types";
import { generateCaptchaImageSvg } from "../../../src/utils/generateCaptchaImageSvg";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { numA = 0, numB = 0, ratio = FrameRatio._1_91__1 } = req.query;
  try {
    return res.json({
      image: await generateCaptchaImageSvg(numA as number, numB as number, {
        ratio: ratio as FrameRatio,
      }),
    });
  } catch (error) {
    throw new Error(error);
  }
}
