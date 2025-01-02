/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import dice from "../../../assets/images/icon_dice_six.svg";
import reload from "../../../assets/images/icon_reload.svg";
import { appendUploadImage, initFileName } from "../../../helper";
import { AppServices } from "../../../constant";
import Button from "../../../components/Ui/Button";
import toast from "../../../components/Shared/toast";
import withAuth from "../../../context/withAuth";
import { useToggle } from "../../../hooks/useToggle";
import Captcha from "../../../components/Shared/Captcha";

import { toLocalFile } from "../../../utils/file";
import FadeIn from "../../../components/Animated/FadeIn";
import { useForm } from "react-hook-form";
import {
  ArchitectCategory,
  ArchitectStyle,
  getRandomStyleArchitect,
  listCategory,
} from "../../../data/template/architect-data";
import Modal from "../../../components/Modal/Modal";
import SearchStyleArchitect from "../../../components/Modal/SearchStyleArchitect";
import FileDropInput from "../../../components/Ui/FileDropInput";
import HistoryModal from "../../../components/Modal/HistoryModal";
import PromptInput from "../../../components/PromptInput";
import { toApiPrompt } from "../../../helper/handlePrompt";
import useServiceCredit from "../../../hooks/useServiceCredit";
import { useMediaCreate } from "../../../services/mediaService";
import useInitData from "../../../hooks/useInitData";
import { checkCaptcha } from "../../../utils";
import { toFormData } from "axios";
const Architect = () => {
  const [category, setCategory] = useState(ArchitectCategory.livingRoom);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [styleList, setStyleList] = useState(ArchitectStyle.slice(0, 6));
  const [styleListAll, setStyleListAll] = useState(ArchitectStyle);
  const [openCaptcha, toggleCaptcha] = useToggle();
  const [openModalSearch, toggleModal] = useToggle(false);
  const [openHistory, toggleHistory] = useToggle(false);
  const { service } = useServiceCredit(AppServices.ARCHITECT_IMAGE);
  const { mutate, isPending } = useMediaCreate(service?.id);
  const { watch, register, reset, setValue } = useForm({
    defaultValues: {
      prompt: "",
      selectedFile1: null,
      selectedFile2: null,
    },
  });
  useInitData(service?.id, reset, watch());
  const onSubmit = (captchaId = 1) => {
    if (!watch().selectedFile1) {
      toast.error("You must select your image.");
      return;
    }
    if (!selectedStyle) {
      toast.error("You must select style.");
      return;
    }
    if (!watch().selectedFile2) {
      toast.error("You must select style image.");
      return;
    }
    if (checkCaptcha(captchaId)) {
      return submitRequest(captchaId);
    }
    toggleCaptcha();
  };

  const submitRequest = async (captchaId) => {
    let body = toFormData({
      prompt: await toApiPrompt(watch().prompt),
      original_prompt: watch().prompt,
      captcha: captchaId,
      service_id: service?.id,
    });

    body = appendUploadImage(
      watch().selectedFile1.file,
      initFileName.img,
      body
    );
    body = appendUploadImage(
      watch().selectedFile2.file,
      initFileName.face,
      body
    );
    mutate(body);
  };
  const onSelectImage = async (e, callback, clearStyle = false) => {
    const file = e[0];
    if (file) {
      if (clearStyle) setSelectedStyle(null);
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

  const onSelectNewStyle = (style) => {
    if (!style) {
      style = getRandomStyleArchitect(styleListAll)[0];
    }
    setSelectedStyle(style);
    const rs = styleList.find((item) => item.id === style.id);
    onChangeStyle(style);
    if (!rs) {
      setStyleList((p) => [style, ...p]);
      // toLocalFile(style.thumbnail, (src) => {
      //   setSelectedLookLikeImage({ ...src, valid: true });
      // });
    }
  };
  let delay = useRef(1).current;

  const onChangeStyle = (item) => {
    if (!watch().selectedFile2 || watch().selectedFile2?.style) {
      toLocalFile(item.thumbnail, (src) =>
        setValue("selectedFile2", { ...src, valid: true, style: item.style })
      );
    }
    setSelectedStyle(item);
    setValue("prompt", item?.style);
  };
  useEffect(() => {
    onSelectCategory(category);
  }, []);

  const onSelectCategory = (id) => {
    setCategory(id);
    const filter = ArchitectStyle.filter((item) => item.category === id);
    setStyleListAll(filter);
    setStyleList(filter.slice(0, 6));
    return;
  };

  return (
    <div className="content-page">
      <div className="p-content content-left m-l">
        <div className="p-content__wrap">
          <FadeIn index={delay++}>
            <div className="top-page">
              <h2 className="top-text-page">Let’s Start</h2>
              <img
                src="/assets/images/icon_email/icon-result-btn.png"
                alt="images"
              />
            </div>
          </FadeIn>
          <div
            className="edition"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 15,
            }}
          >
            <FadeIn
              index={delay++}
              style={{ flex: 11 }}
              className="input-architect"
            >
              <h2 className="sec-ttl">Your prompt</h2>
              <PromptInput
                length={watch().prompt.length}
                {...register("prompt")}
                setValue={(v) => setValue("prompt", v)}
              />
            </FadeIn>
            <FadeIn
              index={delay++}
              className="edition-btn-col"
              style={{ flex: 1 }}
            >
              <div
                className="edition-btn__item"
                style={{ cursor: "pointer", userSelect: "none" }}
                onClick={() => {
                  toggleHistory();
                }}
              >
                <span className="icon">
                  <img src={reload} alt="Prompt history" />
                </span>
                Prompt history
              </div>
              <div
                onClick={() => {
                  const style = getRandomStyleArchitect();
                  setValue("prompts", style[0].style);
                }}
                style={{ cursor: "pointer", userSelect: "none" }}
                className="edition-btn__item"
              >
                <span className="icon">
                  <img src={dice} alt="Prompt history" />
                </span>
                Suprise me!
              </div>
            </FadeIn>
          </div>
          <FadeIn index={delay++} className="swap">
            <div className="swap-list --upload" style={{ marginBottom: 8 }}>
              <FadeIn index={delay++} className="swap-list__item">
                <h2 className="sec-ttl">Add your image</h2>
                {/* <p className="swap-list__txt">Image must contain maximum 01 face</p> */}
                <FileInput
                  watch={watch}
                  onSelectImage={onSelectImage}
                  setValue={setValue}
                  inputName="selectedFile1"
                />
              </FadeIn>
              <FadeIn index={delay++} className="swap-list__item">
                <h2 className="sec-ttl">Style image</h2>
                <FileInput
                  watch={watch}
                  onSelectImage={onSelectImage}
                  setValue={setValue}
                  inputName="selectedFile2"
                />
              </FadeIn>
            </div>
            <div
              index={delay++}
              className="edition-style"
              style={{ marginTop: "0px" }}
            >
              <h2 className="sec-ttl">Category</h2>
              <div className="edition-style__list js-select-style">
                {listCategory?.map((item, index) => {
                  const checked = item.id === category;
                  return (
                    <FadeIn
                      direction="x"
                      as="label"
                      initDeplay={listCategory.length > 6 ? 0 : undefined}
                      index={delay++}
                      className={`item style-item ${
                        checked ? "is-active" : ""
                      }`}
                      key={index}
                      onClick={() => onSelectCategory(item?.id)}
                    >
                      <div>
                        <img
                          src={item.src}
                          alt="stabilityworld"
                          style={{ aspectRatio: 1 }}
                        />
                        <h5
                          style={{
                            color: "white",
                            textAlign: "center",
                            paddingTop: 4,
                          }}
                        >
                          {item.name}
                        </h5>
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
                    </FadeIn>
                  );
                })}
              </div>
              <FadeIn
                index={delay++}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 className="sec-ttl">Styles</h2>
                <p className="edition-style__txt text-center">
                  Don’t find what you need?{" "}
                  <a
                    onClick={() => {
                      toggleModal();
                    }}
                  >
                    Explore styles
                  </a>
                </p>
              </FadeIn>
              <div className="edition-style__list js-select-style">
                {styleList?.map((item, index) => {
                  const checked = item.id === selectedStyle?.id;
                  return (
                    <FadeIn
                      direction="x"
                      as="label"
                      initDeplay={styleList.length > 6 ? 0 : undefined}
                      index={delay++}
                      className={`item style-item ${
                        checked ? "is-active" : ""
                      }`}
                      key={index}
                    >
                      <img
                        src={item.thumbnail}
                        alt="stabilityworld"
                        style={{ aspectRatio: 1 }}
                      />
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
                            onChangeStyle(item);
                          }
                        }}
                      />
                    </FadeIn>
                  );
                })}
              </div>
              <div className="edition-btn --large">
                <div
                  onClick={() => {
                    onSelectNewStyle();
                  }}
                  className="edition-btn__item"
                >
                  <span className="icon">
                    <img src={dice} alt="Surprise me!" />
                  </span>
                  Surprise me!
                </div>
              </div>

              <div className="edition-style__btn">
                <Button onClick={onSubmit} loading={isPending} variant="basic">
                  Generate
                </Button>
                {/* <div className="btn-basic"></div> */}
              </div>
              {/* <FadeIn index={delay++} style={{ marginTop: 20 }}>
                <Mission />
              </FadeIn> */}
            </div>
          </FadeIn>
        </div>
      </div>
      <Captcha
        isShow={openCaptcha}
        onClose={toggleCaptcha}
        onSuccess={({ id }) => submitRequest(id)}
      />
      <Modal isOpen={openModalSearch} closeModal={toggleModal}>
        <SearchStyleArchitect
          onClose={toggleModal}
          list={styleListAll}
          onSelect={(style) => {
            onSelectNewStyle(style);
            toggleModal();
          }}
        />
      </Modal>
      <Modal isOpen={openHistory} closeModal={toggleHistory}>
        <HistoryModal
          onClose={toggleHistory}
          type="/architect"
          onSelect={(item) => {
            setValue("prompts", item.prompt);
            toggleHistory();
          }}
        />
      </Modal>
    </div>
  );
};

export default withAuth(Architect);
const FaceDetectImage = ({ src, onRemove, onValid, key }) => {
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
          border: key ? "1px solid red" : "1px solid green",
        }}
      >
        <img
          src={src}
          alt="img"
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
        />
        <div className="swap-list__close" onClick={onRemove}></div>
      </div>

      <div
        style={{
          width: "100%",
          minHeight: 28,
        }}
      ></div>
    </>
  );
};
const FileInput = ({ watch, onSelectImage, setValue, inputName }) => {
  return (
    <>
      {!watch(inputName) ? (
        <>
          <FileDropInput
            onDrop={(e) =>
              onSelectImage(e, (value) => setValue(inputName, value))
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
          key={watch(inputName)?.key}
          src={watch(inputName)?.preview}
          onRemove={() => {
            setValue(inputName, null);
          }}
          onValid={() =>
            setValue(inputName, { ...watch(inputName), valid: true })
          }
        />
      )}
    </>
  );
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
