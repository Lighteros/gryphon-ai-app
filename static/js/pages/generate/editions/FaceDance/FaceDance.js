/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../components/Ui/Button";
import { toLocalFile } from "../../../../utils/file";
import FadeIn from "../../../../components/Animated/FadeIn";
import FileDropInput from "../../../../components/Ui/FileDropInput";
import useServiceCredit from "../../../../hooks/useServiceCredit";
import { useForm } from "react-hook-form";
import useFaceDetect from "../../../../hooks/useFaceDetect";
import { AppServices, SUPPORT_VIDEO_TRIM } from "../../../../constant";
import { useMediaCreate } from "../../../../services/mediaService";
import Modal from "../../../../components/Modal/Modal";
import ModalVideoTrimmer from "../../../../components/Modal/ModalVideoTrimmer";
import { useToggle } from "../../../../hooks/useToggle";
import Tutorials from "../../../../components/Tutorials";
import toast from "../../../../lib/toast";
import useInitData from "../../../../hooks/useInitData";
import ResultOnPage from "../../../../components/ResultOnPage";
import { initFileName } from "../../../../helper";
import Captcha from "../../../../components/Shared/Captcha";
import {
  FaceDanceCategory,
  dataFaceDance,
  listCategoryFaceDance,
} from "../../../../data/template/data-face-dance";
import SearchStyleFaceDanceModal from "../../../../components/Modal/SearchStyleFaceDanceModal";
import { APP_ROUTE } from "../../../../routes/link";

const FaceDance = () => {
  const {
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedFile1: null,
      selectedFile2: null,
    },
  });
  const [accept, setAccept] = useState(true);
  const [category, setCategory] = useState(FaceDanceCategory.viralSound);
  const { service } = useServiceCredit(AppServices.FACE_DANCE);
  const { mutate, isPending, data } = useMediaCreate(service?.id);
  const [modalVideoCrop, setModalVideoCrop] = useState(false);
  const [styleVideo, setStyleVideo] = useState(dataFaceDance.slice(0, 7));
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [styleListAll, setStyleListAll] = useState(dataFaceDance);
  const [openModalSearch, toggleModal] = useToggle(false);
  const [openCaptcha, toggleCaptcha] = useToggle();
  useInitData(service?.id, reset, watch());
  const handleModalVideo = () => {
    setModalVideoCrop(!modalVideoCrop);
    if (modalVideoCrop) {
      setValue("selectedFile2", null);
    }
  };
  const onSelectImage = (e, callback, isVideo = false) => {
    const file = e[0];
    if (!file) return;
    if (isVideo) {
      if (SUPPORT_VIDEO_TRIM) handleModalVideo();
      callback({
        preview: URL.createObjectURL(file),
        file: file,
        key: getRandomInt(9999),
        valid: true,
      });
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback({
          preview: reader.result,
          file: file,
          key: getRandomInt(9999),
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = (captchaId) => {
    if (!watch().selectedFile1?.valid) {
      toast.error("Face not detected.");
      return;
    }
    if (!watch().selectedFile2?.valid) {
      toast.error("Please select from the pre-made video templates sample");
      return;
    }
    if (!captchaId) {
      return submitRequest(captchaId);
    }
    toggleCaptcha();
  };
  const submitRequest = async (captchaId) => {
    const body = {
      service_id: service?.id,
      duration: watch().selectedFile2?.duration || 10,
      [initFileName.img]: watch().selectedFile1?.file,
      [initFileName.face]: watch().selectedFile2?.file,
      captcha: captchaId,
    };
    mutate(body);
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
  const getDuration = async (src) => {
    return await new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      video.src = src;
    });
  };
  const onSelectCategory = (id) => {
    setCategory(id);
    const filter = dataFaceDance.filter((item) => item.category === id);
    setStyleListAll(filter);
    setStyleVideo(filter.slice(0, 7));
    return;
  };
  return (
    <div className="content-page">
      <div className="p-content content-left m-l">
        <div className="p-content__wrap">
          <div className="edition">
            <FadeIn index={delay++}>
              <div className="top-page">
                <h2 className="top-text-page">Let’s Start</h2>
                <img
                  src="/assets/images/icon_email/icon-result-btn.png"
                  alt="images"
                />
              </div>
            </FadeIn>

            <div className="p-content__wrap">
              <div className="edition-style" style={{ marginBottom: 50 }}>
                <FadeIn index={delay++}>
                  <h2 className="sec-ttl">Category</h2>
                  <div
                    className="edition-style__list  js-select-style"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: 0,
                    }}
                  >
                    <div
                      className="list-category-face-dance"
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      {listCategoryFaceDance?.map((item, index) => {
                        const checked = item.id === category;
                        return (
                          <label
                            className={`item item-tab  ${
                              checked ? "is-active" : ""
                            }`}
                            key={item.id}
                            onClick={() => onSelectCategory(item?.id)}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 10,
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              {/* <img src={item.src} alt="stabilityworld" style={{ aspectRatio: 1 }} /> */}
                              <h4
                                style={{
                                  color: "white",
                                  textAlign: "center",
                                  textIndent: 0,
                                }}
                              >
                                {item.name.charAt(0).toUpperCase() +
                                  item.name.slice(1)}
                              </h4>
                            </div>
                            <input
                              type="checkbox"
                              name={`select-0${index}`}
                              checked={checked}
                              onChange={() => {
                                if (checked) {
                                  // setSelectedStyle(null);
                                  // setSelectedLookLikeImage(null);
                                  // setSelectedStyle('');
                                } else {
                                  // onChangeStyle(item);
                                }
                              }}
                            />
                          </label>
                        );
                      })}
                    </div>
                    <div className="tab-content">
                      <div className="edition-style__list js-select-style">
                        {styleVideo?.map((item, index) => {
                          const checked = item.id === selectedStyle?.id;
                          return (
                            <label
                              style={{ borderRadius: 8 }}
                              className={`item style-item ${
                                checked ? "is-active" : ""
                              }`}
                              key={item.id}
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
                                    setValue("selectedFile2", null);
                                  } else {
                                    setSelectedStyle(item);
                                    setValue("selectedFile2", {
                                      preview: undefined,
                                      valid: false,
                                      type: "video",
                                    });
                                    toLocalFile(item.videoUrl, async (src) => {
                                      const rs = await getDuration(src.preview);
                                      setValue("selectedFile2", {
                                        ...src,
                                        valid: true,
                                        type: "video",
                                        duration: Number(rs.toFixed()),
                                      });
                                    });
                                  }
                                }}
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <div className="edition-style__txt text-center">
                  <FadeIn
                    index={delay++}
                    style={{ textDecoration: "underline" }}
                  >
                    <a
                      onClick={() => {
                        toggleModal();
                      }}
                    >
                      Explore sample
                    </a>
                  </FadeIn>
                </div>
              </div>
              <FadeIn index={delay++} className="swap">
                <div className="swap-list --upload" style={{ marginBottom: 8 }}>
                  <FadeIn index={delay++} className="swap-list__item">
                    <h2 className="sec-ttl">Add your face</h2>
                    <p className="swap-list__txt">
                      The image should contain at least one face{" "}
                    </p>
                    {!watch().selectedFile1 ? (
                      <>
                        <FileDropInput
                          description="The maximum file size allowed is 50MB."
                          name="swap1"
                          onDrop={(e) =>
                            onSelectImage(e, (value) => {
                              setValue("selectedFile1", value);
                            })
                          }
                        />
                        <div
                          style={{
                            minHeight: 28,
                          }}
                        ></div>
                      </>
                    ) : (
                      <FaceDetectImage
                        key={watch().selectedFile1.key}
                        src={watch().selectedFile1.preview}
                        onRemove={() => {
                          setValue("selectedFile1", null);
                        }}
                        onValid={() =>
                          setValue("selectedFile1", {
                            ...watch().selectedFile1,
                            valid: true,
                          })
                        }
                      />
                    )}
                  </FadeIn>
                  <FadeIn index={delay++} className="swap-list__item">
                    <h2 className="sec-ttl">Add video</h2>
                    <p className="swap-list__txt">
                      Please select from the pre-made video templates sample.
                    </p>
                    {!watch().selectedFile2 ? (
                      <>
                        <FileDropInput
                          disabled={true}
                          description="Please select from the pre-made video templates sample."
                          onDrop={(e) =>
                            onSelectImage(
                              e,
                              (value) => {
                                setValue("selectedFile2", value);
                              },
                              true
                            )
                          }
                          isVideo
                          durantion={SUPPORT_VIDEO_TRIM ? undefined : 30}
                        />
                        <div
                          style={{
                            minHeight: 30,
                          }}
                        ></div>
                      </>
                    ) : null}
                    {!!watch().selectedFile2 && (
                      <FaceDetectImage
                        close={true}
                        key={watch().selectedFile2.key}
                        src={watch().selectedFile2.preview}
                        type="video"
                        onRemove={() => {
                          setValue("selectedFile2", null);
                          setSelectedStyle(null);
                        }}
                        onValid={() =>
                          setValue("selectedFile2", {
                            ...watch().selectedFile2,
                            valid: true,
                          })
                        }
                      />
                    )}
                  </FadeIn>
                </div>
                
              </FadeIn>
            </div>
            <FadeIn from="50%" index={delay++} style={{ marginTop: 20 }}>
              <ResultOnPage
                onSelect={(item) => {
                  setValue("prompt", item);
                }}
                service_id={service?.id}
              />
            </FadeIn>
            {modalVideoCrop ? (
              <Modal isOpen={modalVideoCrop} closeModal={handleModalVideo}>
                <ModalVideoTrimmer
                  srcFile={watch().selectedFile2?.file}
                  onClose={handleModalVideo}
                  onSubmit={(data) => {
                    watch().selectedFile2.file = data?.file;
                    watch().selectedFile2.preview = data?.preview;
                    watch().selectedFile2.duration = data?.duration;
                    setValue("selectedFile2", { ...watch().selectedFile2 });
                    setModalVideoCrop(false);
                  }}
                />
              </Modal>
            ) : null}
            <Modal isOpen={openModalSearch} closeModal={toggleModal}>
              <SearchStyleFaceDanceModal
                data={styleListAll}
                onClose={toggleModal}
                onSelect={(style) => {
                  onSelectNewStyle(style);
                  toLocalFile(style.videoUrl, async (src) => {
                    const rs = await getDuration(src.preview);
                    setValue("selectedFile2", {
                      ...src,
                      valid: true,
                      type: "video",
                      duration: Number(rs.toFixed()),
                    });
                  });
                  toggleModal();
                }}
              />
            </Modal>
            <Captcha
              isShow={openCaptcha}
              onClose={toggleCaptcha}
              onSuccess={({ id }) => submitRequest(id)}
              turnOnCaptcha={true}
            />
          </div>
        </div>
      </div>
      <Tutorials id={APP_ROUTE.FACE_DANCE.id} />
    </div>
  );
};

export default FaceDance;
const FaceDetectImage = ({ src, onRemove, onValid, type }) => {
  const { imgRef, isLoading, facesDetected, boundingBox } = useFaceDetect();
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (!isLoading) {
      if (facesDetected === 0) {
      } else {
        onValid();
        const getSize = getContainedSize(imgRef.current);
        setSize({
          width: getSize.width,
          height: getSize.height,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const valid = facesDetected !== 0;
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
            type === "video"
              ? "1px solid green"
              : facesDetected === 0
              ? "1px solid red"
              : "1px solid green",
        }}
      >
        {" "}
        <div style={{ position: "absolute", ...size }}>
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
            muted
            controls
            preload="metadata"
            src={src}
            type="video/mp4"
            alt="video"
            crossOrigin="anonymous"
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
            ref={imgRef}
            src={src}
            alt="img"
            crossOrigin="*"
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
              ? "No face was detected in the photo."
              : "You’re good to go, your face is legit."}
          </>
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
