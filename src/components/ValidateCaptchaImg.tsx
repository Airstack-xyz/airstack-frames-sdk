import React from "react";
import { RobotIcon } from "./RobotIcon";
import { FrameRatio } from "../types";

export function ValidatedCaptchaImg(props: {
  isValidated: boolean;
  options?: { ratio?: FrameRatio };
}) {
  const { isValidated, options } = props ?? {};
  const { ratio = FrameRatio._1_91__1 } = options ?? {};
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 40,
        paddingRight: 40,
        width: "100%",
        height: "100vh",
        backgroundImage: "linear-gradient(to bottom, #22282b, #0f2843)",
        color: "white",
      }}
    >
      <div
        style={{
          marginTop: ratio === FrameRatio._1_91__1 ? 25 : 80,
          marginBottom: ratio === FrameRatio._1_91__1 ? 25 : 90,
          fontSize: 80,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 25,
          paddingBottom: 40,
          paddingLeft: 40,
          paddingRight: 40,
          width: "100%",
          backgroundColor: "#F8FDFF",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 30,
            color: "#171D23",
          }}
        >
          <RobotIcon height={25} />
          <span>
            {isValidated
              ? "You have successfully verified!"
              : "Sorry, your verification failed."}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: ratio === FrameRatio._1_91__1 ? 200 : 400,
            padding: 20,
            marginTop: 25,
            backgroundColor: "#EEF5FC",
            borderRadius: 20,
            fontSize: 60,
            color: "#0F243C",
          }}
        >
          {isValidated ? "Verified! 🎉" : "Try again? 😢"}
        </div>
      </div>
      <h2 style={{ color: "white", marginTop: "50px", marginBottom: 0 }}>
        Powered By
      </h2>
      <img
        src="https://bafybeie55k6243ki3wdz54wrhljoa6oj62dfph772elpx7o47xbt77zok4.ipfs.dweb.link/Airstack-logo-RGB-dark-mode.png"
        alt="Airstack Logo"
        width={250}
        height={125}
      />
    </div>
  );
}
