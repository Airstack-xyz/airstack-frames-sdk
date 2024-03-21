import satori from "satori";
import type { SatoriOptions } from "satori";
import sharp from "sharp";
import { Resvg } from "@resvg/resvg-js";
import { ReactElement } from "react";
import { OUTPUT_FRAME_QUALITY, OUTPUT_FRAME_WIDTH } from "../constants";

export async function getFrameImageBuffer(
  element: ReactElement,
  satoriOptions: SatoriOptions,
  outputOptions?: {
    width?: number;
    quality?: number;
  }
) {
  const svg = await satori(element, satoriOptions);

  const renderer = new Resvg(svg, {
    fitTo: { mode: "width", value: outputOptions?.width || OUTPUT_FRAME_WIDTH },
  });
  const pngBuffer = renderer.render().asPng();

  return sharp(pngBuffer)
    .jpeg({ quality: outputOptions?.quality || OUTPUT_FRAME_QUALITY })
    .toBuffer();
}
