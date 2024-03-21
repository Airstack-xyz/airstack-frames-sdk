import { FrameRatio } from "../types";
import fetch from "node-fetch";
import { getBase64FrameImage } from "./getBase64FrameImage";
import { GenerateCaptchaImg } from "../components/GenerateCaptchaImg";

export const generateCaptchaImageSvg = async (
  numA: number,
  numB: number,
  options?: { ratio?: FrameRatio }
): Promise<string> => {
  const { ratio = FrameRatio._1_91__1 } = options ?? {};
  const concertOneFontData = await fetch(
    "https://bafybeidnrxwduxvffapz6ujromf46xtyn5wkgzehabxe2kvdhdag4zrdeu.ipfs.dweb.link/Roboto-Black.ttf"
  ).then((res: any) => res.arrayBuffer());
  return await getBase64FrameImage(
    GenerateCaptchaImg({ numA, numB, options: { ratio } }),
    {
      width: ratio === FrameRatio._1_91__1 ? 1200 : 955,
      height: ratio === FrameRatio._1_91__1 ? 630 : 955,
      fonts: [
        {
          data: concertOneFontData,
          name: "ConcertOne-Regular.ttf",
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
};
