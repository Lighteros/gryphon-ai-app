/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";

import RangeInput from "../../lib/videoTrim/RangeInput";

import { toTimeString } from "../../lib/videoTrim/videoTrimHelpers";
import Button from "../Ui/Button";
import { useVideoProcessing } from "../../lib/videoTrim/VideoProcessing";
import clsx from "clsx";
import Cropper from "react-easy-crop";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
const ModalVideoTrimmer = ({ onClose, onSubmit, srcFile }) => {
  const videoProcessing = useVideoProcessing({
    file: srcFile,
  });
  const {
    videoUrl,
    trimProps,
    playerRef,
    startPreview,
    checkDurantion,
    thumbnailIsProcessing,
    trimIsProcessing,
    played,
    zoom,
    setCroppedArea,
    setZoom,
    croppedArea,
    setCrop,
    crop,
    loaded,
    handleTrim,
  } = videoProcessing;
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <>
      <div id="popup" className="popup active" style={{ width: "100%" }}>
        <div className="popup__body --advance">
          <div className="popup__close js-close-popup" onClick={onClose}></div>
          <div className="advance-popup" style={{ padding: "16px" }}>
            <p className="advance-popup__ttl" style={{ color: "#fff" }}>
              Choose video
            </p>
            <div className="advance-popup__wrap">
              <p className="advance-popup__video" style={{ height: "auto" }}>
                <div
                  className="swap-list__file"
                  style={{
                    aspectRatio: 1,
                    width: "100%",
                    position: "relative",
                  }}
                  key={thumbnailIsProcessing}
                >
                  {/* <video
                    style={{ display: 'none' }}
                    src={videoUrl}
                    autoPlay
                    ref={playerRef}
                    controls
                    id="video-trim"
                    muted={false}
                    width="100%"
                    height="100%"
                  ></video> */}

                  {videoUrl ? (
                    <Cropper
                      video={videoUrl}
                      setVideoRef={(ref) => {
                        playerRef.current = ref.current;
                      }}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  ) : null}
                </div>
              </p>
              <div
                style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                {/* <VideoRangeBar config={config} /> */}
                <p className="advance-popup__time" style={{ color: "#fff" }}>
                  Duration:{" "}
                  <span>
                    {toTimeString(trimProps.videoMeta?.duration, false)}
                  </span>
                </p>
                <div className="advance-popup__duration">
                  <RangeInput {...trimProps} key={!!trimProps.videoMeta} />
                </div>
                <div
                  className="advance-popup__btn"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <p
                    onClick={startPreview}
                    className={clsx(
                      "video-button",
                      played ? "is-active is-play" : ""
                    )}
                  ></p>
                </div>
              </div>
              <Button
                loading={thumbnailIsProcessing || trimIsProcessing || !loaded}
                onClick={() => {
                  if (checkDurantion(30)) {
                    handleTrim().then((data) => {
                      onSubmit(data);
                    });
                  }
                }}
                variant="basic"
                className="--full"
              >
                Save
              </Button>
              <a
                className="btn-border --full"
                style={{
                  width: "100%",
                  borderColor: "#d9d8da",
                  margin: "2rem 0",
                }}
                onClick={onClose}
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalVideoTrimmer;
