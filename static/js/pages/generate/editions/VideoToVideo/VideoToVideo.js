/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../../../../components/Ui/Button";

import toast from "../../../../components/Shared/toast";
import withAuth from "../../../../context/withAuth";
import useHandleError from "../../../../hooks/useHandleError";
import { useModal } from "../../../../context/modalContext";
import { useLocation } from "react-router-dom";
import { toLocalFile } from "../../../../utils/file";
import FadeIn from "../../../../components/Animated/FadeIn";
import VideoStyleSelect from "../../../../components/VideoStyleSelect";
import { ImagePromptData } from "../../../../data/template/prompt-data";
import FileDropInput from "../../../../components/Ui/FileDropInput";

import useServiceCredit from "../../../../hooks/useServiceCredit";
const VideoToVideo = () => {
  const [accept, setAccept] = useState(true);
  const location = useLocation();
  const [selectedStyle, setSelectedStyle] = useState(ImagePromptData.at(0));
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { service } = useServiceCredit("VIDEO_TO_VIDEO");
  const [selectedLookLikeImage, setSelectedLookLikeImage] = useState({
    preview: ImagePromptData?.at(0).thumbnail,
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [openCaptcha, toggleCaptcha] = useToggle();
  const handleError = useHandleError();
  const { openModal } = useModal();
  useEffect(() => {
    if (location.state?.target) {
      toLocalFile(
        location.state.target,
        (src) => setSelectedLookLikeImage({ ...src, valid: true }),
        setSelectedVideo({ ...src, valid: true, type: "video" })
      );
    }
  }, [location.state?.target]);

  const onSubmit = () => {
    if (!selectedVideo) {
      toast.error(
        "You must select both destination image and look like image."
      );
      return;
    }
    if (!selectedLookLikeImage) {
      toast.error(
        "You must select both destination image and look like image."
      );
      return;
    }

    // toggleCaptcha();
    navigate("/video-to-video/advance-setting", {
      state: {
        video: selectedVideo,
        style: selectedStyle,
      },
    });
  };

  const onSelectImage = (e, callback, isVideo = false) => {
    const file = e[0];
    if (!file) return;
    if (isVideo) {
      // if (video.duration < 10) {
      callback({
        preview: URL.createObjectURL(file),
        file: file,
        key: getRandomInt(9999),
        type: "video",
        valid: true,
      });
      // } else {
      //   toast.error('Video must be under 10 seconds.');
      // }
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback({
          preview: reader.result,
          file: file,
          key: getRandomInt(9999),
          type: "image",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const openModalType = (modalName, e) => {
    e.preventDefault();
    openModal(modalName);
  };
  let delay = useRef(1).current;

  return (
    <div className="p-content m-l">
      <div className="p-content__wrap">
        {/* <FadeIn index={delay++}>
          <Mission />
        </FadeIn> */}
        <FadeIn index={delay++} className="swap">
          <div className="swap-list --upload" style={{ marginBottom: 8 }}>
            <FadeIn index={delay++} className="swap-list__item">
              {!selectedVideo ? (
                <>
                  <FileDropInput
                    description="Your video file must be under 10 seconds"
                    onDrop={(e) => onSelectImage(e, setSelectedVideo, true)}
                    isVideo
                  />
                  <div
                    style={{
                      minHeight: 30,
                    }}
                  ></div>
                </>
              ) : null}

              {!!selectedVideo && (
                <FaceDetectImage
                  close={true}
                  key={selectedVideo.key}
                  src={selectedVideo.preview}
                  type={selectedVideo.type}
                  onRemove={() => {
                    setSelectedVideo(null);
                    setSelectedStyle(null);
                  }}
                  onValid={() =>
                    setSelectedVideo((x) => ({ ...x, valid: true }))
                  }
                />
              )}
            </FadeIn>
            <FadeIn index={delay++} className="swap-list__item">
              {!selectedLookLikeImage ? (
                <>
                  <label className="swap-list__file" style={{ aspectRatio: 1 }}>
                    <p className="ttl">
                      Drop and drag or{" "}
                      <span className="anchor">choose file</span> here to upload
                    </p>
                    <p className="note">
                      Your video file must be under 10 seconds
                    </p>
                    <input
                      type="file"
                      name="swap-01"
                      accept="video/*"
                      onChange={(e) =>
                        onSelectImage(e, setSelectedLookLikeImage, true)
                      }
                    />
                  </label>
                  <div
                    style={{
                      minHeight: 30,
                    }}
                  ></div>
                </>
              ) : null}

              {!!selectedLookLikeImage && (
                <FaceDetectImage
                  close={false}
                  key={selectedLookLikeImage.key}
                  src={selectedLookLikeImage.preview}
                  onValid={() =>
                    setSelectedLookLikeImage((x) => ({ ...x, valid: true }))
                  }
                />
              )}
            </FadeIn>
          </div>
          <div className="edition-style" style={{ marginTop: "0px" }}>
            <h2 className="sec-ttl">Select style</h2>
            <VideoStyleSelect
              onChange={(item) => {
                if (!item) {
                  setSelectedStyle(null);
                  setSelectedLookLikeImage(null);
                } else {
                  setSelectedStyle(item);
                  toLocalFile(item.thumbnail, (src) =>
                    setSelectedLookLikeImage({ ...src, valid: true })
                  );
                }
              }}
              value={selectedStyle}
            />
          </div>
          
        </FadeIn>
      </div>

      {/* <Captcha
                isShow={openCaptcha}
                onClose={toggleCaptcha}
                onSuccess={({ id }) => uploadImage(id)}
            /> */}
    </div>
  );
};

export default withAuth(VideoToVideo);
const FaceDetectImage = ({ src, onRemove, onValid, type, close, key }) => {
  return (
    <>
      <div
        className="swap-list__box"
        style={{
          overflow: "hidden",
          aspectRatio: 1,
          width: "100%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
          border: type === "video" || src ? "1px solid green" : "1px solid red",
        }}
      >
        {type === "video" ? (
          <video
            autoPlay
            loop
            controls
            src={src}
            type="video/mp4"
            alt="video"
            crossOrigin="anonymous"
            preload="metadata"
            style={{
              left: "0",
              right: "0",
              textAlign: "center",
              borderRadius: 12,
              zIndex: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          ></video>
        ) : (
          <img
            src={src}
            alt="img"
            crossOrigin="anonymous"
            style={{
              // position: 'absolute',
              left: "0",
              right: "0",
              textAlign: "center",
              borderRadius: 12,
              zIndex: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              // objectPosition: "top"
            }}
          ></img>
        )}

        {close ? (
          <div className="swap-list__close" onClick={onRemove}></div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getContainedSize(img) {
  var ratio = img.naturalWidth / img.naturalHeight;
  var width = img.height * ratio;
  var height = img.height;
  if (width > img.width) {
    width = img.width;
    height = img.width / ratio;
  }
  return { width, height };
}
