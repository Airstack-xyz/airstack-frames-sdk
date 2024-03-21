import { FrameRatio } from "../types";
import fetch from "node-fetch";
import { getBase64FrameImage } from "./getBase64FrameImage";
import { ValidatedCaptchaImg } from "../components/ValidateCaptchaImg";

export const validatedCaptchaImageSvg = async (
  isValidated: boolean,
  options?: { ratio?: FrameRatio }
): Promise<string> => {
  const { ratio = FrameRatio._1_91__1 } = options ?? {};
  const concertOneFontData = await fetch(
    "https://bafybeidnrxwduxvffapz6ujromf46xtyn5wkgzehabxe2kvdhdag4zrdeu.ipfs.dweb.link/Roboto-Black.ttf"
  ).then((res: any) => res.arrayBuffer());
  return await getBase64FrameImage(
    ValidatedCaptchaImg({ isValidated, options: { ratio } }),
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
      graphemeImages: {
        "😢": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHBhdGggZmlsbD0iI0ZGQ0M0RCIgZD0iTTM2IDE4YzAgOS45NDEtOC4wNTkgMTgtMTggMTgtOS45NCAwLTE4LTguMDU5LTE4LTE4QzAgOC4wNiA4LjA2IDAgMTggMGM5Ljk0MSAwIDE4IDguMDYgMTggMTgiLz48ZWxsaXBzZSBmaWxsPSIjNjY0NTAwIiBjeD0iMTEuNSIgY3k9IjE3IiByeD0iMi41IiByeT0iMy41Ii8+PGVsbGlwc2UgZmlsbD0iIzY2NDUwMCIgY3g9IjI0LjUiIGN5PSIxNyIgcng9IjIuNSIgcnk9IjMuNSIvPjxwYXRoIGZpbGw9IiM2NjQ1MDAiIGQ9Ik01Ljk5OSAxMy41Yy0uMjA4IDAtLjQxOS0uMDY1LS41OTktLjItLjQ0Mi0uMzMxLS41MzEtLjk1OC0uMi0xLjQgMy4yNjItNC4zNSA3LjYxNi00LjQgNy44LTQuNC41NTIgMCAxIC40NDggMSAxIDAgLjU1MS0uNDQ1Ljk5OC0uOTk2IDEtLjE1NS4wMDItMy41NjguMDg2LTYuMjA0IDMuNi0uMTk2LjI2Mi0uNDk3LjQtLjgwMS40em0yNC4wMDIgMGMtLjMwNSAwLS42MDQtLjEzOC0uODAxLS40LTIuNjQxLTMuNTIxLTYuMDYxLTMuNTk5LTYuMjA2LTMuNi0uNTUtLjAwNi0uOTk0LS40NTYtLjk5MS0xLjAwNS4wMDMtLjU1MS40NDctLjk5NS45OTctLjk5NS4xODQgMCA0LjUzNy4wNSA3LjggNC40LjMzMi40NDIuMjQyIDEuMDY5LS4yIDEuNC0uMTguMTM1LS4zOS4yLS41OTkuMnptLTYuNTE2IDE0Ljg3OUMyMy40NzQgMjguMzM1IDIyLjM0IDI0IDE4IDI0cy01LjQ3NCA0LjMzNS01LjQ4NSA0LjM3OWMtLjA1My4yMTMuMDQ0LjQzMS4yMzIuNTQ0LjE4OC4xMTIuNDMzLjA4Ni41OTYtLjA2QzEzLjM1MiAyOC44NTUgMTQuMzU2IDI4IDE4IDI4YzMuNTkgMCA0LjYxNy44MyA0LjY1Ni44NjMuMDk1LjA5LjIxOS4xMzcuMzQ0LjEzNy4wODQgMCAuMTY5LS4wMjEuMjQ2LS4wNjQuMTk2LS4xMTIuMjk0LS4zMzkuMjM5LS41NTd6Ii8+PHBhdGggZmlsbD0iIzVEQURFQyIgZD0iTTE2IDMxYzAgMi43NjItMi4yMzggNS01IDVzLTUtMi4yMzgtNS01IDQtMTAgNS0xMCA1IDcuMjM4IDUgMTB6Ii8+PC9zdmc+",
        "🎉": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHBhdGggZmlsbD0iI0REMkU0NCIgZD0iTTExLjYyNiA3LjQ4OGMtLjExMi4xMTItLjE5Ny4yNDctLjI2OC4zOTVsLS4wMDgtLjAwOEwuMTM0IDMzLjE0MWwuMDExLjAxMWMtLjIwOC40MDMuMTQgMS4yMjMuODUzIDEuOTM3LjcxMy43MTMgMS41MzMgMS4wNjEgMS45MzYuODUzbC4wMS4wMUwyOC4yMSAyNC43MzVsLS4wMDgtLjAwOWMuMTQ3LS4wNy4yODItLjE1NS4zOTUtLjI2OSAxLjU2Mi0xLjU2Mi0uOTcxLTYuNjI3LTUuNjU2LTExLjMxMy00LjY4Ny00LjY4Ni05Ljc1Mi03LjIxOC0xMS4zMTUtNS42NTZ6Ii8+PHBhdGggZmlsbD0iI0VBNTk2RSIgZD0iTTEzIDEyTC40MTYgMzIuNTA2bC0uMjgyLjYzNS4wMTEuMDExYy0uMjA4LjQwMy4xNCAxLjIyMy44NTMgMS45MzcuMjMyLjIzMi40NzMuNDA4LjcwOS41NTdMMTcgMTdsLTQtNXoiLz48cGF0aCBmaWxsPSIjQTAwNDFFIiBkPSJNMjMuMDEyIDEzLjA2NmM0LjY3IDQuNjcyIDcuMjYzIDkuNjUyIDUuNzg5IDExLjEyNC0xLjQ3MyAxLjQ3NC02LjQ1My0xLjExOC0xMS4xMjYtNS43ODgtNC42NzEtNC42NzItNy4yNjMtOS42NTQtNS43OS0xMS4xMjcgMS40NzQtMS40NzMgNi40NTQgMS4xMTkgMTEuMTI3IDUuNzkxeiIvPjxwYXRoIGZpbGw9IiNBQThERDgiIGQ9Ik0xOC41OSAxMy42MDljLS4xOTkuMTYxLS40NTkuMjQ1LS43MzQuMjE1LS44NjgtLjA5NC0xLjU5OC0uMzk2LTIuMTA5LS44NzMtLjU0MS0uNTA1LS44MDgtMS4xODMtLjczNS0xLjg2Mi4xMjgtMS4xOTIgMS4zMjQtMi4yODYgMy4zNjMtMi4wNjYuNzkzLjA4NSAxLjE0Ny0uMTcgMS4xNTktLjI5Mi4wMTQtLjEyMS0uMjc3LS40NDYtMS4wNy0uNTMyLS44NjgtLjA5NC0xLjU5OC0uMzk2LTIuMTEtLjg3My0uNTQxLS41MDUtLjgwOS0xLjE4My0uNzM1LTEuODYyLjEzLTEuMTkyIDEuMzI1LTIuMjg2IDMuMzYyLTIuMDY1LjU3OC4wNjIuODgzLS4wNTcgMS4wMTItLjEzNC4xMDMtLjA2My4xNDQtLjEyMy4xNDgtLjE1OC4wMTItLjEyMS0uMjc1LS40NDYtMS4wNy0uNTMyLS41NDktLjA2LS45NDctLjU1Mi0uODg2LTEuMTAyLjA1OS0uNTQ5LjU1LS45NDYgMS4xMDEtLjg4NiAyLjAzNy4yMTkgMi45NzMgMS41NDIgMi44NDQgMi43MzUtLjEzIDEuMTk0LTEuMzI1IDIuMjg2LTMuMzY0IDIuMDY3LS41NzgtLjA2My0uODguMDU3LTEuMDEuMTM0LS4xMDMuMDYyLS4xNDUuMTIzLS4xNDkuMTU3LS4wMTMuMTIyLjI3Ni40NDYgMS4wNzEuNTMyIDIuMDM3LjIyIDIuOTczIDEuNTQyIDIuODQ0IDIuNzM1LS4xMjkgMS4xOTItMS4zMjQgMi4yODYtMy4zNjIgMi4wNjUtLjU3OC0uMDYyLS44ODIuMDU4LTEuMDEyLjEzNC0uMTA0LjA2NC0uMTQ0LjEyNC0uMTQ4LjE1OC0uMDEzLjEyMS4yNzYuNDQ2IDEuMDcuNTMyLjU0OC4wNi45NDcuNTUzLjg4NiAxLjEwMi0uMDI4LjI3NC0uMTY3LjUxMS0uMzY2LjY3MXoiLz48cGF0aCBmaWxsPSIjNzdCMjU1IiBkPSJNMzAuNjYxIDIyLjg1N2MxLjk3My0uNTU3IDMuMzM0LjMyMyAzLjY1OCAxLjQ3OC4zMjQgMS4xNTQtLjM3OCAyLjYxNS0yLjM1IDMuMTctLjc3LjIxNi0xLjAwMS41ODQtLjk3LjcwMS4wMzQuMTE4LjQyNS4zMTIgMS4xOTMuMDk1IDEuOTcyLS41NTUgMy4zMzMuMzI1IDMuNjU3IDEuNDc5LjMyNiAxLjE1NS0uMzc4IDIuNjE0LTIuMzUxIDMuMTctLjc2OS4yMTYtMS4wMDEuNTg1LS45NjcuNzAyLjAzMy4xMTcuNDIzLjMxMSAxLjE5Mi4wOTUuNTMtLjE0OSAxLjA4NC4xNiAxLjIzMy42OTEuMTQ4LjUzMi0uMTYxIDEuMDg0LS42OTMgMS4yMzQtMS45NzEuNTU1LTMuMzMzLS4zMjMtMy42NTktMS40NzktLjMyNC0xLjE1NC4zNzktMi42MTMgMi4zNTMtMy4xNjkuNzctLjIxNyAxLjAwMS0uNTg0Ljk2Ny0uNzAyLS4wMzItLjExNy0uNDIyLS4zMTItMS4xOS0uMDk2LTEuOTc0LjU1Ni0zLjMzNC0uMzIyLTMuNjU5LTEuNDc5LS4zMjUtMS4xNTQuMzc4LTIuNjEzIDIuMzUxLTMuMTcuNzY4LS4yMTUuOTk5LS41ODUuOTY3LS43MDEtLjAzNC0uMTE4LS40MjMtLjMxMi0xLjE5Mi0uMDk2LS41MzIuMTUtMS4wODMtLjE2LTEuMjMzLS42OTEtLjE0OS0uNTMuMTYxLTEuMDgyLjY5My0xLjIzMnoiLz48cGF0aCBmaWxsPSIjQUE4REQ4IiBkPSJNMjMuMDAxIDIwLjE2Yy0uMjk0IDAtLjU4NC0uMTI5LS43ODItLjM3NS0uMzQ1LS40MzItLjI3NC0xLjA2MS4xNTYtMS40MDYuMjE4LS4xNzUgNS40MTgtNC4yNTkgMTIuNzY3LTMuMjA4LjU0Ny4wNzguOTI3LjU4NC44NDkgMS4xMzEtLjA3OC41NDYtLjU4LjkzLTEuMTMyLjg0OC02LjQ5My0uOTIyLTExLjE4NyAyLjc1NC0xMS4yMzMgMi43OTEtLjE4Ni4xNDgtLjQwNi4yMTktLjYyNS4yMTl6Ii8+PHBhdGggZmlsbD0iIzc3QjI1NSIgZD0iTTUuNzU0IDE2Yy0uMDk1IDAtLjE5Mi0uMDE0LS4yODgtLjA0Mi0uNTI5LS4xNTktLjgyOS0uNzE2LS42Ny0xLjI0NSAxLjEzMy0zLjc3MyAyLjE2LTkuNzk0Ljg5OC0xMS4zNjQtLjE0MS0uMTc4LS4zNTQtLjM1My0uODQyLS4zMTYtLjkzOC4wNzItLjg0OSAyLjA1MS0uODQ4IDIuMDcxLjA0Mi41NTEtLjM3MiAxLjAzMS0uOTIyIDEuMDcyLS41NTkuMDM0LTEuMDMxLS4zNzItMS4wNzItLjkyMy0uMTAzLTEuMzc5LjMyNi00LjAzNSAyLjY5Mi00LjIxNCAxLjA1Ni0uMDggMS45MzMuMjg3IDIuNTUyIDEuMDU3IDIuMzcxIDIuOTUxLS4wMzYgMTEuNTA2LS41NDIgMTMuMTkyLS4xMy40MzMtLjUyOC43MTItLjk1OC43MTJ6Ii8+PGNpcmNsZSBmaWxsPSIjNUM5MTNCIiBjeD0iMjUuNSIgY3k9IjkuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjOTI2NkNDIiBjeD0iMiIgY3k9IjE4IiByPSIyIi8+PGNpcmNsZSBmaWxsPSIjNUM5MTNCIiBjeD0iMzIuNSIgY3k9IjE5LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzVDOTEzQiIgY3g9IjIzLjUiIGN5PSIzMS41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiNGRkNDNEQiIGN4PSIyOCIgY3k9IjQiIHI9IjIiLz48Y2lyY2xlIGZpbGw9IiNGRkNDNEQiIGN4PSIzMi41IiBjeT0iOC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiNGRkNDNEQiIGN4PSIyOS41IiBjeT0iMTIuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjRkZDQzREIiBjeD0iNy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PC9zdmc+",
      },
    }
  );
};
