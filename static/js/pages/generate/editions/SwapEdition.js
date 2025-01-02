/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { initFileName } from "../../../helper";
import { APP_ROUTE } from "../../../routes/link";
import Button from "../../../components/Ui/Button";
import { useToggle } from "../../../hooks/useToggle";
import Captcha from "../../../components/Shared/Captcha";
import { SwapFaceTemplate } from "../../../data/template/demo-data";
import { toLocalFile } from "../../../utils/file";
import useFaceDetect from "../../../hooks/useFaceDetect";
import FadeIn from "../../../components/Animated/FadeIn";
import FileDropInput from "../../../components/Ui/FileDropInput";

import useServiceCredit from "../../../hooks/useServiceCredit";
import { useMediaCreate } from "../../../services/mediaService";
import Tutorials from "../../../components/Tutorials";
import { useForm } from "react-hook-form";
import { AppServices } from "../../../constant";
import useInitData from "../../../hooks/useInitData";
import ResultOnPage from "../../../components/ResultOnPage";
import toast from "../../../lib/toast";
import { getContainedSize } from "../../../utils";

const SwapEdition = () => {
  const [accept, setAccept] = useState(true);
  const [openCaptcha, toggleCaptcha] = useToggle();
  const { service } = useServiceCredit(AppServices.FACE_SWAP);
  const { mutate, isPending } = useMediaCreate(service?.id);
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
  useInitData(service?.id, reset, watch());
  const onSubmit = async (captchaId) => {
    if (!watch().selectedFile1.valid || !watch().selectedFile2.valid) {
      toast.error("Face not detected.");
      return;
    }
    if (!captchaId) {
      return submitRequest(captchaId);
    }
    toggleCaptcha();
  };

  const submitRequest = async (captchaId) => {
    let body = {
      captcha: captchaId,
      service_id: service.id,
      [initFileName.img]: watch().selectedFile1?.file,
      [initFileName.face]: watch().selectedFile2?.file,
    };

    mutate(body);
  };
  const onSelectImage = async (e, callback, clearStyle = false) => {
    const file = e[0];
    if (file) {
      callback({
        preview: URL.createObjectURL(file),
        file: file,
        key: getRandomInt(9999),
      });
    }
  };

  let delay = 0;

  return (
    <div className="content-page">
      <div className="p-content content-left m-l">
        <div className="p-content__wrap">
          <FadeIn index={delay++} className="swap">
            <FadeIn index={delay++}>
              <div className="top-page">
                <h2 className="top-text-page">Let’s Start</h2>
                <img
                  src="/assets/images/icon_email/icon-result-btn.png"
                  alt="images"
                />
              </div>
            </FadeIn>
            <div className="edition-style" style={{ marginBottom: 50 }}>
              <h2 className="sec-ttl">Samples</h2>
              <div className="edition-style__list js-select-style">
                {SwapFaceTemplate.map((item, index) => {
                  const checked = item.id === watch().selectedFile2?.template;
                  return (
                    <FadeIn
                      as="label"
                      direction="x"
                      index={delay++}
                      className={`item  style-item ${
                        checked ? "is-active" : ""
                      }`}
                      key={index}
                    >
                      <img src={item.thumbnail} alt="stabilityworld" />
                      <input
                        type="checkbox"
                        name={`select-0${index}`}
                        checked={checked}
                        onChange={() => {
                          if (checked) {
                            setValue("selectedFile2", null);
                          } else {
                            setValue("selectedFile2", null);
                            toLocalFile(item.thumbnail, (src) =>
                              setValue("selectedFile2", {
                                ...src,
                                valid: true,
                                template: item.id,
                              })
                            );
                          }
                        }}
                      />
                    </FadeIn>
                  );
                })}
              </div>
            </div>
            <div className="swap-list" style={{ marginBottom: 8 }}>
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
                        onSelectImage(e, (value) =>
                          setValue("selectedFile1", value)
                        )
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
                    onRemove={() => setValue("selectedFile1", null)}
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
                <h2 className="sec-ttl">Target image</h2>
                <p className="swap-list__txt">
                  The image should contain at least one face{" "}
                </p>
                {!watch().selectedFile2 ? (
                  <>
                    <FileDropInput
                      description="The maximum file size allowed is 50MB."
                      name="swap2"
                      onDrop={(e) =>
                        onSelectImage(e, (value) =>
                          setValue("selectedFile2", value)
                        )
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
                    key={watch().selectedFile2.key}
                    src={watch().selectedFile2.preview}
                    onRemove={() => setValue("selectedFile2", null)}
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

            <FadeIn index={delay++}>
              
              <div className="edition-style__btn">
                <Button
                  onClick={onSubmit}
                  disabled={!accept}
                  loading={isPending}
                  variant="basic"
                >
                  Generate
                </Button>
              </div>
            </FadeIn>
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
      </div>
      <Captcha
        isShow={openCaptcha}
        onClose={toggleCaptcha}
        onSuccess={({ id }) => submitRequest(id)}
        turnOnCaptcha={true}
      />
      <Tutorials id={APP_ROUTE.FACE_SWAP.id} />
    </div>
  );
};

export default SwapEdition;
const FaceDetectImage = ({ src, onRemove, onValid }) => {
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
          border: facesDetected === 0 ? "1px solid red" : "1px solid green",
        }}
      >
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
