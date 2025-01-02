/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";

import {
  appendUploadImage,
  bodyToFormData,
  initFileName,
} from "../../../helper";

import { SUPPORT_VIDEO_TRIM } from "../../../constant";
import { APP_ROUTE } from "../../../routes/link";
import Button from "../../../components/Ui/Button";

import toast from "../../../components/Shared/toast";
import { useToggle } from "../../../hooks/useToggle";
import Captcha from "../../../components/Shared/Captcha";

import useHandleError from "../../../hooks/useHandleError";
import { useModal } from "../../../context/modalContext";
import { useLocation } from "react-router-dom";
import { toLocalFile } from "../../../utils/file";
import useFaceDetect from "../../../hooks/useFaceDetect";
import FadeIn from "../../../components/Animated/FadeIn";

import { VideoSwapfaceDemo } from "../../../data/template/video-data";
import FileDropInput from "../../../components/Ui/FileDropInput";
import { useUser } from "../../../context/AuthContext";
import Modal from "../../../components/Modal/Modal";
import ModalVideoTrimmer from "../../../components/Modal/ModalVideoTrimmer";
import SearchStyleVideoModal from "../../../components/Modal/SearchStyleVideoModal";
import { getContainedSize } from "../../../utils";
import useServiceCredit from "../../../hooks/useServiceCredit";
import mediaService from "../../../services/mediaService";
import ResultOnPage from "../../../components/ResultOnPage";

const VideoEdition = () => {
  const { service } = useServiceCredit(APP_ROUTE.REFACE_VIDEO.id);
  const [accept, setAccept] = useState(true);
  const location = useLocation();
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLookLikeImage, setSelectedLookLikeImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openCaptcha, toggleCaptcha] = useToggle();
  const [modalTrimVideo, setModalTrimVideo] = useState(false);
  const [openModalSearch, toggleModal] = useToggle(false);

  const { fetchUserData, isAuthenticated } = useUser();
  const [styleVideo, setStyleVideo] = useState(VideoSwapfaceDemo.slice(0, 6));
  const handleModalVideo = () => {
    setModalTrimVideo(!modalTrimVideo);
    if (modalTrimVideo) {
      setSelectedLookLikeImage(null);
    }
  };
  const handleError = useHandleError();
  const { openModal } = useModal();
  useEffect(() => {
    if (location.state?.init_video) {
      toLocalFile(location.state.init_video, (src) => {
        setSelectedLookLikeImage({ ...src, valid: true, type: "video" });
      });
    }
    if (location.state?.init_img) {
      toLocalFile(location.state.init_img, (src) =>
        setSelectedImage({ ...src, valid: true })
      );
    }
  }, [location.state]);

  const onSubmit = (captchaId = 1) => {
    if (!isAuthenticated) {
      openModal("login");
      return;
    }
    if (!selectedImage) {
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
    if (!selectedLookLikeImage.valid || !selectedImage.valid) {
      toast.error("Not found any face in the photo.");
      return;
    }
    if (captchaId) {
      setIsLoading(true);
      return submitRequest(captchaId);
    }
    toggleCaptcha();
  };

  const submitRequest = async (captchaId) => {
    const body = {
      init_image_video_id: img_id,
      negative_prompt: "",
      prompt: "",
      restore_face: 1,
      captcha: captchaId,
      service_id: service.id,
    };
    let formData = new FormData();
    formData = bodyToFormData(body, formData);
    formData = appendUploadImage(
      selectedImage.file,
      initFileName.img,
      formData
    );
    formData = appendUploadImage(
      selectedLookLikeImage.file,
      initFileName.face,
      formData
    );
    try {
      const res = await mediaService.create(formData);
      if (res.success) {
        fetchUserData(null, true);
        openModal("result", {
          file_key: res?.data,
        });
      } else {
        toast.error(res.error_message);
        handleError(res.error_message);
      }
    } catch (error) {
      toast.error();
      console.log("", error);
    } finally {
      setIsLoading(false);
    }
  };
  const onSelectImage = async (e, callback, isVideo = false) => {
    const file = e[0];
    if (!file) return;
    if (isVideo) {
      if (SUPPORT_VIDEO_TRIM) handleModalVideo();
      setSelectedStyle(null);
      callback({
        preview: URL.createObjectURL(file),
        file: file,
        key: getRandomInt(9999),
        type: "video",
        orginalFile: file,
        valid: true,
      });
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

  let delay = useRef(1).current;
  const onSelectNewStyle = (style) => {
    if (!style) {
      style = getRandomStyle()[0];
    }
    setSelectedStyle(style);
    const rs = styleVideo.find((item) => item.id === style.id);
    if (!rs) setStyleVideo((p) => [style, ...p]);
  };

  return (
    <div className="p-content m-l">
      <div className="p-content__wrap">
        {/* <FadeIn index={delay++}>
          <Mission />
        </FadeIn> */}
        <FadeIn index={delay++} className="swap">
          <div className="swap-list" style={{ marginBottom: 8 }}>
            <FadeIn index={delay++} className="swap-list__item">
              <h2 className="sec-ttl">Add your face</h2>
              <p className="swap-list__txt">
                Image must contain maximum 01 face
              </p>
              {!selectedImage ? (
                <>
                  <FileDropInput
                    onDrop={(e) => onSelectImage(e, setSelectedImage)}
                    className="input-image"
                  />
                  <div
                    style={{
                      minHeight: 28,
                    }}
                  ></div>
                </>
              ) : null}

              {!!selectedImage && (
                <FaceDetectImage
                  key={selectedImage.key}
                  type={selectedImage.type}
                  src={selectedImage.preview}
                  onRemove={() => setSelectedImage(null)}
                  onValid={() =>
                    setSelectedImage((x) => ({ ...x, valid: true }))
                  }
                />
              )}
            </FadeIn>
            <FadeIn index={delay++} className="swap-list__item">
              <h2 className="sec-ttl">Add your video</h2>

              <p className="swap-list__txt">
                Video must be less than 10 seconds long
              </p>

              {!selectedLookLikeImage ? (
                <>
                  <FileDropInput
                    isVideo
                    description="Your video file must be under 10 seconds"
                    durantion={SUPPORT_VIDEO_TRIM ? undefined : 10}
                    onDrop={(e) =>
                      onSelectImage(e, setSelectedLookLikeImage, true)
                    }
                  />
                  <div
                    style={{
                      minHeight: 28,
                    }}
                  ></div>
                </>
              ) : null}

              {!!selectedLookLikeImage && (
                <FaceDetectImage
                  key={selectedLookLikeImage.key}
                  src={selectedLookLikeImage.preview}
                  type={selectedLookLikeImage.type}
                  onRemove={() => {
                    setSelectedLookLikeImage(null);
                    setSelectedStyle(null);
                  }}
                  onValid={() =>
                    setSelectedLookLikeImage((x) => ({ ...x, valid: true }))
                  }
                />
              )}
            </FadeIn>
          </div>
          <FadeIn
            index={delay++}
            className="edition-style"
            style={{ marginTop: "0px" }}
          >
            <h2 className="sec-ttl">Sample</h2>
            <div className="edition-style__list js-select-style">
              {styleVideo.map((item, index) => {
                const checked = item.id === selectedStyle?.id;
                return (
                  <FadeIn
                    as="label"
                    direction="x"
                    index={delay++}
                    initDeplay={styleVideo.length > 6 ? 0 : undefined}
                    style={{ borderRadius: 8 }}
                    className={`item ${checked ? "is-active" : ""}`}
                    key={index}
                  >
                    <img
                      src={item.thumbnail}
                      style={{ aspectRatio: 1, width: "100%" }}
                      alt="stabilityworld"
                    />
                    <input
                      type="checkbox"
                      name={`select-0${index}`}
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          setSelectedStyle(null);
                          setSelectedLookLikeImage(null);
                        } else {
                          setSelectedStyle(item);
                          setSelectedLookLikeImage({
                            preview: undefined,
                            valid: false,
                            type: "video",
                          });
                          toLocalFile(item.src, (src) => {
                            setSelectedLookLikeImage({
                              ...src,
                              valid: true,
                              type: "video",
                            });
                          });
                        }
                      }}
                    />
                  </FadeIn>
                );
              })}
            </div>
          </FadeIn>
          <div>
            <p className="edition-style__txt text-center">
              Don’t find what you need?{" "}
              <a
                onClick={() => {
                  toggleModal();
                }}
              >
                Explore sample
              </a>
            </p>
            
            <div className="edition-style__btn">
              <Button
                onClick={onSubmit}
                disabled={!accept}
                loading={isLoading}
                variant="basic"
              >
                Generate
              </Button>
            </div>
          </div>
        </FadeIn>
        {/* <FadeIn index={delay++} style={{ marginTop: 50 }}>
          <ResultOnPage fileKey={data?.data} service_id={service?.id} />
        </FadeIn> */}
      </div>
      <Captcha
        isShow={openCaptcha}
        onClose={toggleCaptcha}
        onSuccess={({ id }) => onSubmit(id)}
      />
      {modalTrimVideo ? (
        <Modal isOpen={modalTrimVideo} closeModal={handleModalVideo}>
          <ModalVideoTrimmer
            srcFile={selectedLookLikeImage?.orginalFile}
            onClose={handleModalVideo}
            onSubmit={(data) => {
              selectedLookLikeImage.file = data?.file;
              selectedLookLikeImage.preview = data?.preview;
              setSelectedLookLikeImage({ ...selectedLookLikeImage });
              setModalTrimVideo(false);
            }}
          />
        </Modal>
      ) : null}
      <Modal isOpen={openModalSearch} closeModal={toggleModal}>
        <SearchStyleVideoModal
          data={VideoSwapfaceDemo}
          onClose={toggleModal}
          onSelect={(style) => {
            onSelectNewStyle(style);
            toLocalFile(style.src, (src) =>
              setSelectedLookLikeImage({ ...src, valid: true, type: "video" })
            );
            toggleModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default VideoEdition;
const FaceDetectImage = ({ src, onRemove, onValid, type }) => {
  const { imgRef, boundingBox, isLoading, facesDetected, webcamRef } =
    useFaceDetect();
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (!isLoading) {
      if (facesDetected === 0) toast.error("Not found any face in the photo");
      else {
        onValid();
        const getSize = getContainedSize(imgRef.current);
        setSize({
          width: getSize.width,
          height: getSize.height,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facesDetected, isLoading]);
  const valid = facesDetected > 0;

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
          border:
            facesDetected > 0 || type === "video"
              ? "1px solid green"
              : "1px solid red",
        }}
      >
        <div style={{ ...size, position: "absolute" }}>
          <div
            style={{
              display: valid ? "block" : "none",
              border: "4px solid red",
              borderRadius: 8,
              position: "absolute",
              top: boundingBox.yCenter,
              left: boundingBox.xCenter,
              width: boundingBox.width,
              height: boundingBox.height,
              zIndex: 2,
            }}
          />
        </div>
        {type === "video" ? (
          <video
            autoPlay
            loop
            controls
            muted
            src={src}
            type="video/mp4"
            alt="video"
            crossOrigin="anonymous"
            preload="metadata"
            // ref={webcamRef}
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
            ref={imgRef}
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

        <div className="swap-list__close" onClick={onRemove}></div>
      </div>

      <div
        style={{
          width: "100%",
          color: valid ? "green" : "red",
          minHeight: 28,
        }}
      >
        {!isLoading && (
          <>
            {!valid
              ? " Not found any face in the photo"
              : "You’re good to go, your face is legit"}
          </>
        )}
      </div>
    </>
  );
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
