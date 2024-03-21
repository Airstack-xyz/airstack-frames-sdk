import { getFrameImageBuffer } from "./generateFrameImageBuffer";
import type { SatoriOptions } from "satori";
import { ReactElement } from "react";

export async function getBase64FrameImage(
  element: ReactElement,
  satoriOptions: SatoriOptions,
  outputOptions?: {
    width?: number;
    quality?: number;
  }
) {
  const jpegBuffer = await getFrameImageBuffer(
    element,
    satoriOptions,
    outputOptions
  );

  const jpegBase64 = jpegBuffer.toString("base64");

  return `data:image/jpeg;base64,${jpegBase64}`;
}
