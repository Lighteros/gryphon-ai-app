/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import reload from "../../../assets/images/icon_reload.svg";
import dice from "../../../assets/images/icon_dice_six.svg";
import { useToggle } from "../../../hooks/useToggle";
import { Styles, getRandomStyle } from "../../../data/template/demo-data";
import { AppServices, IMAGE_RATIO, IMAGE_QUANTITY } from "../../../constant";
import { useForm } from "react-hook-form";
import Validate from "../../../constant/Validate";
import Modal from "../../../components/Modal/Modal";
import SearchStyleModal from "../../../components/Modal/SearchStyleModal";
import { APP_ROUTE } from "../../../routes/link";
import Button from "../../../components/Ui/Button";
import HistoryModal from "../../../components/Modal/HistoryModal";
import Captcha from "../../../components/Shared/Captcha";
import toast from "../../../components/Shared/toast";
import FadeIn from "../../../components/Animated/FadeIn";
import { IoMdArrowDropdown } from "react-icons/io";
import PromptInput from "../../../components/PromptInput";
import useServiceCredit from "../../../hooks/useServiceCredit";
import { useMediaCreate } from "../../../services/mediaService";
import { randomSeed } from "../../../helper";
import Tutorials from "../../../components/Tutorials";
import useInitData from "../../../hooks/useInitData";
import ResultOnPage from "../../../components/ResultOnPage";
import { ModelSelect } from "../../../components/Select/ModelSelect";
import { useSearchParams } from "react-router-dom";

const Flux = () => {
  const [searchParams] = useSearchParams();
  const { watch, register, setValue, reset } = useForm({
    defaultValues: {
      cfg: 7,
      seed: -1,
      width: IMAGE_RATIO.at(0).width,
      height: IMAGE_RATIO.at(0).height,
      negative_prompt: "",
      prompt: "",
      original_prompt: "",
      style: undefined,
      is_random_seed: true,
      quantity: IMAGE_QUANTITY.at(0).quantity,
      model_name: searchParams.get("model"),
      improve_prompt: false,
    },
  });

  const [openNegativePrompt, setOpenNegativePrompt] = useState(false);
  const [styleList, setStyleList] = useState(Styles.slice(0, 6));
  const [openModalSearch, toggleModal] = useToggle(false);
  const [openHistory, toggleHistory] = useToggle(false);
  const [openCaptcha, toggleCaptcha] = useToggle();
  const { service } = useServiceCredit(AppServices.FLUX_GEN);
  const { mutate, isPending } = useMediaCreate(service?.id);
  useInitData(service?.id, reset, watch());
  const submitRequest = async (captchaId) => {
    const body = {
      prompt: watch().prompt,
      style_prompt: watch().style?.prompt,
      negative_prompt: watch().negative_prompt,
      style_negative_prompt: watch().style?.negative_prompt,
      service_id: service?.id,
      style: watch().style?.id,
      cfg: watch().cfg,
      seed: watch().is_random_seed ? randomSeed() : watch().seed,
      captcha: captchaId,
      is_random_seed: watch().is_random_seed ? true : false,
      width: watch().width,
      height: watch().height,
      number_of_image: watch().quantity,
      model_name: watch().model_name,
      improve_prompt: watch().improve_prompt,
    };
    mutate(body);
  };
  const onSubmit = async (captchaId) => {
    if (!captchaId) {
      return submitRequest(captchaId);
    }
    toggleCaptcha();
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
            {/* <motion.div {...animationProps}> */}
            <FadeIn index={delay++} className="edition-size">
              <h2 className="sec-ttl">Artwork size</h2>
              <div className="edition-size__list js-select-size">
                {IMAGE_RATIO.map((item, index) => {
                  return (
                    <label
                      key={index}
                      className={`option ${
                        watch().width === item.width &&
                        watch().height === item.height
                          ? "is-active"
                          : ""
                      }`}
                      onClick={() => {
                        setValue("width", item.width);
                        setValue("height", item.height);
                      }}
                    >
                      <div className="option__box">
                        <span
                          className="option__type "
                          style={{ aspectRatio: item.ratio, width: "50%" }}
                        ></span>
                      </div>
                      <p className="option__txt">{item.name}</p>
                      <input type="radio" name="size-01" />
                    </label>
                  );
                })}
              </div>
              <h2 className="sec-ttl" style={{ paddingTop: 25 }}>
                Number of Images
              </h2>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 className="sec-ttl">Artwork Style</h2>
              </div>
              <div className="edition-style__list js-select-style">
                {styleList.map((item, index) => {
                  const checked = item.id === watch().style?.id;
                  return (
                    <FadeIn
                      as="label"
                      initDeplay={styleList.length > 6 ? 0 : undefined}
                      index={delay++}
                      direction="x"
                      className={`item style-item ${
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
                          if (checked) setValue("style", null);
                          else setValue("style", item);
                        }}
                      />
                    </FadeIn>
                  );
                })}

                <p
                  className="edition-style__txt"
                  style={{ textAlign: "center" }}
                >
                  <a
                    onClick={() => {
                      toggleModal();
                    }}
                  >
                    Explore styles
                  </a>
                </p>
              </div>
              <div className="edition-btn --large" style={{ marginTop: 10 }}>
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
            <FadeIn index={delay++} style={{ marginTop: 20 }}>
              <ModelSelect
                id={service?.id}
                setValue={(v) => setValue("model_name", v)}
                value={watch().model_name}
                key={service?.id}
              />
            </FadeIn>
            <FadeIn
              className="promp__input"
              index={delay++}
              style={{ marginTop: "3.3rem" }}
            >
              <h2 className="sec-ttl">Your prompt...</h2>
              <PromptInput
                length={watch().prompt?.length}
                {...register("prompt", {
                  required: Validate.required,
                })}
                setValue={(v) => setValue("prompt", v)}
              />
            </FadeIn>
            {/* </motion.div> */}
            <FadeIn index={delay++} className="group-btn-fn">
              <div className="edition-btn">
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
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <label className="swap-policy" style={{ marginBottom: 0 }}>
                    <input
                      type="checkbox"
                      checked={watch().improve_prompt}
                      onChange={(e) =>
                        setValue("improve_prompt", !watch().improve_prompt)
                      }
                    />
                    <span className="check"></span>
                    <span className="text-check">Use prompt magic</span>
                  </label>
                </div>
              </div>
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
              <a style={{ paddingTop: 2 }}>Advanced setting </a>
              <IoMdArrowDropdown
                size={26}
                color="#FF4C13"
                style={{
                  transform: openNegativePrompt ? "rotate(180deg)" : "",
                  paddingTop: 3,
                }}
              />
            </p>
            {openNegativePrompt ? (
              <div>
                <FadeIn index={1}>
                  {/* <h2 className="sec-ttl">Your negative prompt</h2> */}
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
                  </div>
                </FadeIn>
              </div>
            ) : null}
          </div>
          {/* <FadeIn index={delay++} style={{ marginTop: 24 }}>
            <Mission />
          </FadeIn> */}
        </div>

        <FadeIn from="50%" index={delay++} style={{ marginTop: 20 }}>
          <ResultOnPage
            service_id={service?.id}
            onSelect={(item) => {
              setValue("prompt", item);
            }}
          />
        </FadeIn>
      </div>

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
          onClose={toggleHistory}
          type={APP_ROUTE.TEXT_TO_IMAGE.routeName}
          onSelect={(item) => {
            setValue("prompt", item.prompt);
            toggleHistory();
          }}
        />
      </Modal>
      <Tutorials id={APP_ROUTE.TEXT_TO_IMAGE.id} />
    </div>
  );
};

export default Flux;
