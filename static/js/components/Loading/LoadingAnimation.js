import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./loading.json";
import { config } from "../../config";

const LoadingContainer = ({
  children,
  animationSize,
  imageSize,
  backgroundColor,
  position,
  left,
  top,
}) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      position: position,
      left: left,
      top: top,
      zIndex: 1001,
      backgroundColor: "rgb(12,15,21)",
    }}
  >
    <Lottie autoplay animationData={loadingAnimation} style={{ width: 1200 }} />
    {/* {children && (
      <div
        style={{
          height: imageSize,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          background: '#12121A',
          borderRadius: '50%',
          border: '1px solid white',
          gap: 10,
          padding: 10
        }}
      >
        {children}
      </div>
    )} */}
  </div>
);

const LoadingAnimation = () =>
  config.IS_MINIAPP ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
      }}
    >
      <img
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
        src={"/assets/images/loading_banner.jpg"}
        alt="stabilityworld"
      />
    </div>
  ) : (
    <LoadingContainer
      animationSize={400}
      imageSize={80}
      // backgroundColor={'black'}
      position="fixed"
      top={0}
      left={0}
    >
      <>
        <img
          style={{ height: 19, borderRadius: "50%" }}
          src={"/assets/images/stabilityworld_icon.svg"}
          alt="stabilityworld"
        />{" "}
        <img
          style={{ height: 21 }}
          src={"/assets/images/stabilityworld.svg"}
          alt="stabilityworld"
        />
      </>
    </LoadingContainer>
  );

export default LoadingAnimation;

export const LoadingAnimationHistory = () => (
  <LoadingContainer
    animationSize={280}
    imageSize={65}
    position="relative"
    top={-50}
    left={10}
  />
);
