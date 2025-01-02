/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import VideoStyleSelect from "../VideoStyleSelect";
import RangeInput from "../../lib/videoTrim/RangeInput";
import { Icons } from "../../constant/icon";
import { toTimeString } from "../../lib/videoTrim/videoTrimHelpers";
import Button from "../Ui/Button";
const ModalVideoToVideo = ({
  onClose,
  setting,
  onSubmit,
  onChange,
  videoProcessing,
}) => {
  const {
    handleLoadedData,
    trimmedVideoFile,
    videoUrl,
    inputVideoFile,
    handleUpdateRange,
    trimProps,
    playerRef,
    setRstart,
    setRend,
    startPreview,
    thumbnailIsProcessing,
    played,
  } = videoProcessing;
  const [modalType, setModalType] = useState(false);

  const setTypeModal = () => {
    setModalType(!modalType);
  };

  return (
    <>
      <div id="popup" className="popup active">
        <div className="popup__body --advance">
          <div className="popup__close js-close-popup" onClick={onClose}></div>
          <div className="advance-popup">
            <p className="advance-popup__ttl">Choose video</p>
            <div className="advance-popup__wrap">
              {/* <VideoProcessing file={setting?.video?.file}/> */}
              <p className="advance-popup__video" style={{ height: "auto" }}>
                <div
                  className="swap-list__file"
                  style={{ aspectRatio: 1.4, width: "100%" }}
                >
                  <video
                    src={inputVideoFile ? trimmedVideoFile || videoUrl : null}
                    autoPlay={false}
                    ref={playerRef}
                    // controls
                    muted={false}
                    onLoadedMetadata={
                      trimmedVideoFile ? undefined : handleLoadedData
                    }
                    width="100%"
                    height="100%"
                  ></video>
                </div>
              </p>

              <div style={{ display: !modalType ? "none" : "block" }}>
                <p className="advance-popup__time">Choose style</p>
                <VideoStyleSelect
                  onChange={onChange}
                  value={setting?.style}
                  className="--nowrap"
                />
                <div
                  className="advance-popup__btn"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <a className="item" onClick={setTypeModal}>
                    Cancel
                  </a>
                </div>
              </div>

              <div style={{ display: modalType ? "none" : "block" }}>
                <p className="advance-popup__time">
                  Duration:{" "}
                  <span>
                    {toTimeString(trimProps.videoMeta?.duration, false)}
                  </span>
                </p>
                <div
                  className="advance-popup__duration"
                  style={{ marginBottom: "3.5rem" }}
                >
                  <RangeInput
                    {...trimProps}
                    handleUpdaterEnd={handleUpdateRange(setRend)}
                    handleUpdaterStart={handleUpdateRange(setRstart)}
                  />
                </div>
                <div className="advance-popup__btn">
                  <a className="item" onClick={onClose}>
                    Cancel
                  </a>
                  <span onClick={startPreview} className="item --icon">
                    <img
                      src={
                        !played ? Icons.icon_play : "/assets/images/pause.png"
                      }
                      style={{ height: 30, width: 30 }}
                      alt="play"
                    />
                  </span>
                  <a className="item" onClick={setTypeModal}>
                    Choose
                  </a>
                </div>
              </div>

              <Button
                loading={thumbnailIsProcessing}
                onClick={onSubmit}
                variant="basic"
                className="--full"
              >
                Start making (3 tokens)
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
                Advance settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalVideoToVideo;
