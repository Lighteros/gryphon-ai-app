/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import reload from "../../../assets/images/icon_reload.svg";
import dice from "../../../assets/images/icon_dice_six.svg";
import { useForm } from "react-hook-form";
import { AppServices, IMAGE_QUANTITY } from "../../../constant";
import {
  Styles,
  getRandomPrompt,
  getRandomStyle,
} from "../../../data/template/demo-data";
import Validate from "../../../constant/Validate";
import { initFileName, randomSeed } from "../../../helper";
import Button from "../../../components/Ui/Button";
import { APP_ROUTE } from "../../../routes/link";
import Modal from "../../../components/Modal/Modal";
import SearchStyleModal from "../../../components/Modal/SearchStyleModal";
import { useToggle } from "../../../hooks/useToggle";
import HistoryModal from "../../../components/Modal/HistoryModal";
import Captcha from "../../../components/Shared/Captcha";
import toast from "../../../components/Shared/toast";
import FadeIn from "../../../components/Animated/FadeIn";
import { IoMdArrowDropdown } from "react-icons/io";
import FileDropInput from "../../../components/Ui/FileDropInput";
import PromptInput from "../../../components/PromptInput";
import useServiceCredit from "../../../hooks/useServiceCredit";
import { useMediaCreate } from "../../../services/mediaService";
import Tutorials from "../../../components/Tutorials";
import useInitData from "../../../hooks/useInitData";
import ResultOnPage from "../../../components/ResultOnPage";
import { ModelSelect } from "../../../components/Select/ModelSelect";

const ImageEdition = () => {
  const [styleList, setStyleList] = useState(Styles.slice(0, 6));
  const [openNegativePrompt, setOpenNegativePrompt] = useState(false);
  const [openModalSearch, toggleModal] = useToggle(false);
  const [openHistory, toggleHistory] = useToggle(false);
  const [openCaptcha, toggleCaptcha] = useToggle();
  const {
    watch,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedFile1: null,
      cfg: 7,
      seed: -1,
      denoising: 0.5,
      negative_prompt: "",
      prompt: "",
      original_prompt: "",
      style: undefined,
      is_random_seed: true,
      model_name: undefined,
      quantity: IMAGE_QUANTITY.at(0).quantity,
    },
  });

  const { service } = useServiceCredit(AppServices.IMAGE_TO_IMAGE);
  const { mutate, isPending, data } = useMediaCreate(service?.id);
  useInitData(service?.id, reset, watch());
  const submitRequest = async (captchaId) => {
    let body = {
      prompt: watch().prompt,
      style_prompt: watch().style?.prompt,
      negative_prompt: watch().negative_prompt,
      style_negative_prompt: watch().style?.negative_prompt,

      service_id: service?.id,
      style: watch().style?.id,
      cfg: watch().cfg,
      denoising: watch().denoising,
      seed: watch().is_random_seed ? randomSeed() : watch().seed,
      captcha: captchaId,
      is_random_seed: watch().is_random_seed ? true : false,
      width: watch().width,
      height: watch().height,
      number_of_image: watch().quantity,
      model_name: watch().model_name,
      [initFileName.img]: watch().selectedFile1?.file,
    };
    mutate(body);
  };
  const onSubmit = async (captchaId) => {
    if (!captchaId) {
      return submitRequest(captchaId);
    }
    toggleCaptcha();
  };

  const onSelectImage = async (e, callback, clearStyle = false) => {
    const file = e[0];
    if (file) {
      callback({
        preview: URL.createObjectURL(file),
        file: file,
      });
    }
  };
  const onSelectNewStyle = (style) => {
    if (!style) {
      style = getRandomStyle()[0];
    }
    setValue("style", style);
    const rs = styleList.find((item) => item.id === style.id);
    if (!rs) setStyleList((p) => [style, ...p]);
  };
  let delay = useRef(1).current;
  return (
    <div className="content-page">
      <div className="p-content content-left m-l">
        <div className="p-content__wrap">
          {/* <FadeIn index={delay++}>
          <Mission />
        </FadeIn> */}
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

            {/* <FadeIn index={delay++} className="edition-size">
            <h2 className="sec-ttl">Artwork size</h2>
            <div className="edition-size__list js-select-size">
              {IMAGE_RATIO.map((item, index) => {
                return (
                  <label
                    className={`option ${selectedSize === index ? 'is-active' : ''}`}
                    onClick={() => setSelectedSize(index)}
                  >
                    <div className="option__box">
                      <span
                        className="option__type "
                        style={{ aspectRatio: item.ratio, width: '50%' }}
                      ></span>
                    </div>
                    <p className="option__txt">{item.name}</p>
                    <input type="radio" name="size-01" />
                  </label>
                );
              })}
            </div>
          </FadeIn> */}
            <FadeIn index={delay++} style={{ paddingBottom: 15 }}>
              <h2 className="sec-ttl">Number of Images</h2>
              <div
                className="edition-size__list js-select-size"
                style={{ gap: 15 }}
              >
                {IMAGE_QUANTITY.map((item, index) => {
                  return (
                    <label
                      key={index}
                      className={`option ${
                        watch().quantity === item.quantity ? "is-active" : ""
                      }`}
                      onClick={() => {
                        setValue("quantity", item.quantity);
                      }}
                    >
                      <div className="option__box1">{item.quantity}</div>
                    </label>
                  );
                })}
              </div>
            </FadeIn>
            <FadeIn index={delay++} className="edition-style">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 className="sec-ttl">Artwork Style</h2>
              </div>
              <div className="edition-style__list js-select-style">
                {styleList.map((item, index) => {
                  const checked = item.id === watch().style?.id;
                  return (
                    <FadeIn
                      as="label"
                      index={delay++}
                      initDeplay={styleList.length > 6 ? 0 : undefined}
                      direction="x"
                      className={`item ${checked ? "is-active" : ""}`}
                      key={item?.id}
                    >
                      <img src={item.thumbnail} alt="stabilityworld" />
                      <input
                        type="checkbox"
                        name={`select-0${index}`}
                        checked={checked}
                        onChange={() => {
                          if (checked) setValue("style", null);
                          else setValue("style", item);
                        }}
                      />
                    </FadeIn>
                  );
                })}
                <p className="edition-style__txt">
                  <FadeIn index={delay++}>
                    <a
                      onClick={() => {
                        toggleModal();
                      }}
                    >
                      Explore styles
                    </a>
                  </FadeIn>
                </p>
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
            </FadeIn>
            <FadeIn index={delay++}>
              <ModelSelect
                id={service?.id}
                setValue={(v) => setValue("model_name", v)}
                value={watch().model_name}
              />
            </FadeIn>
            <div className="d-flex ">
              <FadeIn
                index={delay++}
                style={{ flex: 1 }}
                className="edition-prompt"
              >
                <h2 className="sec-ttl">Your prompt...</h2>
                <PromptInput
                  length={watch().prompt.length}
                  {...register("prompt", {
                    required: Validate.required,
                  })}
                  setValue={(v) => setValue("prompt", v)}
                />
              </FadeIn>
              <FadeIn
                index={delay++}
                className="edition-update"
                style={{ flex: 1 }}
              >
                <h2 className="sec-ttl" style={{ paddingBottom: 10 }}>
                  Upload additional image
                </h2>
                {!watch().selectedFile1 ? (
                  <>
                    <FileDropInput
                      name="input-1"
                      type="normal"
                      onDrop={(e) =>
                        onSelectImage(e, (value) =>
                          setValue("selectedFile1", value)
                        )
                      }
                    />
                  </>
                ) : null}
                <div className="" style={{ marginTop: 20 }}>
                  {!!watch("selectedFile1") && (
                    <div
                      className="image-file"
                      style={{
                        position: "relative",
                        background: "rgba(255, 162, 95, 0.10)",
                      }}
                    >
                      <img
                        src={watch().selectedFile1.preview}
                        alt="img"
                        accept="image/*,.heic,.heif"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                      <div
                        className="swap-list__close"
                        onClick={() => setValue("selectedFile1", null)}
                      ></div>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
            <FadeIn index={delay++} className="group-btn-fn">
              <FadeIn className="edition-btn">
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
                    const style = getRandomPrompt();
                    setValue("prompt", style[0].prompts);
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
              <div className="edition-style__btn">
                <Button onClick={onSubmit} loading={isPending} variant="basic">
                  Generate
                </Button>
              </div>
            </FadeIn>
            <p
              className="edition-style__txt"
              style={{
                display: "flex",
                justifyContent: "start",
                textAlign: "start",
                cursor: "pointer",
                width: "fit-content",
              }}
              onClick={() => setOpenNegativePrompt(!openNegativePrompt)}
            >
              <a style={{ paddingTop: 2 }}>Advanced setting</a>
              <IoMdArrowDropdown
                size={25}
                color="#FF4C13"
                style={{
                  transform: openNegativePrompt ? "rotate(180deg)" : "",
                }}
              />
            </p>
            {openNegativePrompt ? (
              <div>
                <FadeIn index={1}>
                  <PromptInput
                    placeholder="Tell us what you don't want to see in the generated artwork "
                    title="Your negative prompt"
                    length={watch().negative_prompt.length}
                    {...register("negative_prompt", {
                      required: Validate.required,
                    })}
                    setValue={(v) => setValue("negative_prompt", v)}
                  />
                </FadeIn>
                <FadeIn index={2} className="advanced-setting-fun">
                  <div className="advanced-setting-fun_box">
                    <div
                      className="advanced-setting-box-child"
                      style={{ minWidth: "max-content" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 5,
                          }}
                        >
                          <label
                            className="swap-policy"
                            style={{ marginBottom: 0 }}
                            onClick={() => setValue("is_random_seed", true)}
                          >
                            <input
                              type="radio"
                              name="1"
                              onClick={() => {
                                setValue("seed", -1);
                              }}
                              checked={watch().is_random_seed}
                            />
                            <span className="check"></span>

                            <p>Random</p>
                          </label>
                          <label
                            className="swap-policy"
                            style={{ marginBottom: 0 }}
                            onClick={() => setValue("is_random_seed", false)}
                          >
                            <input
                              type="radio"
                              name="2"
                              checked={!watch().is_random_seed}
                            />
                            <span className="check"></span>
                            <p>Custom</p>
                          </label>
                        </div>
                        <div
                          className="advanced-setting-fun__list"
                          style={{ flex: 4 }}
                        >
                          <div style={{ position: "relative", width: "100%" }}>
                            <p
                              style={{
                                position: "absolute",
                                fontSize: 12,
                                left: 15,
                                top: 4,
                                color: "#808080",
                              }}
                            >
                              Seeds
                            </p>
                            <input
                              disabled={watch().is_random_seed}
                              {...register("seed", {
                                minLength: {
                                  value: -1,
                                  message: "",
                                },
                              })}
                              onBlur={(e) => {
                                if (watch().seed < -1) {
                                  toast.error("Seed must be greater than -1");
                                  setValue("seed", randomSeed());
                                }
                              }}
                              className="edition__message"
                              style={{
                                borderRadius: 4,
                                height: 50,
                                marginBottom: 0,
                                paddingTop: 30,
                              }}
                            ></input>
                            <p
                              style={{
                                position: "absolute",
                                fontSize: 12,
                                right: 5,
                                bottom: 2,
                                color: "#808080",
                              }}
                            >
                              (-1 to ∞)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="advanced-setting-box-child"
                      style={{
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        minWidth: "max-content",
                      }}
                    >
                      <div
                        className="advanced-setting-fun__list"
                        style={{ flex: 1, minWidth: 1 }}
                      >
                        <div style={{ position: "relative", width: "100%" }}>
                          <p
                            style={{
                              position: "absolute",
                              fontSize: 12,
                              left: 15,
                              top: 4,
                              color: "#808080",
                            }}
                          >
                            CFG
                          </p>
                          <input
                            className="edition__message"
                            {...register("cfg", {
                              minLength: {
                                value: 0,
                                message: "error",
                              },
                            })}
                            style={{
                              borderRadius: 4,
                              height: 50,
                              marginBottom: 0,
                              paddingTop: 30,
                            }}
                          ></input>
                          <p
                            style={{
                              position: "absolute",
                              fontSize: 12,
                              right: 5,
                              bottom: 2,
                              color: "#808080",
                            }}
                          >
                            (1 to 10)
                          </p>
                        </div>
                      </div>
                      <div className="slidecontainer" style={{ flex: 3 }}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={watch().cfg}
                          className="slider"
                          id="myRange"
                          onChange={(v) => setValue("cfg", v.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className="advanced-setting-box-child"
                      style={{
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        minWidth: "max-content",
                      }}
                    >
                      <div
                        className="advanced-setting-fun__list"
                        style={{ flex: 1, minWidth: 0 }}
                      >
                        <div style={{ position: "relative", width: "100%" }}>
                          <p
                            style={{
                              position: "absolute",
                              fontSize: 12,
                              left: 15,
                              top: 4,
                              color: "#808080",
                            }}
                          >
                            Denoising
                          </p>
                          <input
                            className="edition__message"
                            {...register("denoising")}
                            style={{
                              borderRadius: 4,
                              height: 50,
                              marginBottom: 0,
                              paddingTop: 30,
                            }}
                          ></input>
                          <p
                            style={{
                              position: "absolute",
                              fontSize: 12,
                              right: 5,
                              bottom: 2,
                              color: "#808080",
                            }}
                          >
                            (0.1 to 1)
                          </p>
                        </div>
                      </div>
                      <div className="slidecontainer" style={{ flex: 3 }}>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.1"
                          value={watch().denoising}
                          className="slider"
                          id="myRange"
                          onChange={(v) =>
                            setValue("denoising", v.target.value)
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="advanced-setting-fun__list">
                    <div style={{ position: 'relative', marginBottom: 10, width: '100%' }}>
                      <p
                        style={{
                          position: 'absolute',
                          fontSize: 12,
                          left: 15,
                          top: 4,
                          color: '#808080'
                        }}
                      >
                        Denoising
                      </p>
                      <input
                        {...register('denoising', {
                          minLength: {
                            value: 0,
                            message: ''
                          }
                        })}
                        className="edition__message"
                        style={{ borderRadius: 4, height: 50, marginBottom: 0, paddingTop: 30 }}
                      ></input>
                      <p
                        style={{
                          position: 'absolute',
                          fontSize: 12,
                          right: 15,
                          bottom: 10,
                          color: '#808080'
                        }}
                      >
                        (0 to 1)
                      </p>
                    </div>
                  </div> */}
                  </div>
                </FadeIn>
              </div>
            ) : null}
          </div>
        </div>
        <FadeIn from="50%" index={delay++} style={{ marginTop: 20 }}>
          <ResultOnPage
            onSelect={(item) => {
              setValue("prompt", item);
            }}
            fileKey={data?.data}
            service_id={service?.id}
          />
        </FadeIn>
      </div>
      {/* <div className="p-content content-right">
        <ContentRight onClick={(item) => reset({ ...watch(), ...item })} />
      </div> */}
      <Captcha
        isShow={openCaptcha}
        onClose={toggleCaptcha}
        onSuccess={({ id }) => submitRequest(id)}
        turnOnCaptcha={true}
      />
      <Modal isOpen={openModalSearch} closeModal={toggleModal}>
        <SearchStyleModal
          onClose={toggleModal}
          onSelect={(style) => {
            onSelectNewStyle(style);
            toggleModal();
          }}
        />
      </Modal>
      <Modal isOpen={openHistory} closeModal={toggleHistory}>
        <HistoryModal
          type={APP_ROUTE.IMAGE_TO_IMAGE.routeName}
          onClose={toggleHistory}
          onSelect={(item) => {
            setValue("prompt", item.prompt);
            toggleHistory();
          }}
        />
      </Modal>
      <Tutorials id={APP_ROUTE.IMAGE_TO_IMAGE.id} />
    </div>
  );
};

export default ImageEdition;
