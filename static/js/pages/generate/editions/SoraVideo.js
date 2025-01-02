/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import reload from "../../../assets/images/icon_reload.svg";
import dice from "../../../assets/images/icon_dice_six.svg";
import { useForm } from "react-hook-form";
import {
  Styles,
  getRandomPrompt,
  getRandomStyle,
} from "../../../data/template/demo-data";
import Validate from "../../../constant/Validate";
import Button from "../../../components/Ui/Button";
import { APP_ROUTE } from "../../../routes/link";
import Modal from "../../../components/Modal/Modal";
import SearchStyleModal from "../../../components/Modal/SearchStyleModal";
import { useToggle } from "../../../hooks/useToggle";
import HistoryModal from "../../../components/Modal/HistoryModal";
import Captcha from "../../../components/Shared/Captcha";
import FadeIn from "../../../components/Animated/FadeIn";
import PromptInput from "../../../components/PromptInput";
import { useModal } from "../../../context/modalContext";
import useServiceCredit from "../../../hooks/useServiceCredit";
import { useMediaCreate } from "../../../services/mediaService";
import Tutorials from "../../../components/Tutorials";
import useInitData from "../../../hooks/useInitData";
import { AppServices } from "../../../constant";
import ResultOnPage from "../../../components/ResultOnPage";

const SoraVideo = () => {
  const [styleList, setStyleList] = useState(Styles.slice(0, 6));
  const [openModalSearch, toggleModal] = useToggle(false);
  const [openHistory, toggleHistory] = useToggle(false);
  const [openCaptcha, toggleCaptcha] = useToggle();

  const [tab] = useState(true);
  const { service } = useServiceCredit(AppServices.TEXT_TO_VIDEO);
  const { mutate, isPending, data } = useMediaCreate(service?.id);
  const {
    watch,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      prompt: "",
      selectedFile1: null,
      style: null,
    },
  });
  useInitData(service?.id, reset, watch());
  const onSubmit = async (captchaId) => {
    if (!captchaId) {
      return submitRequest();
    }
    toggleCaptcha();
  };

  const submitRequest = async (captchaId) => {
    let body = {
      // init_image_id: img_id,
      prompt: watch().prompt,
      // style: selectedStyle?.prompt,
      captcha: captchaId,
      service_id: service?.id,
    };
    mutate(body);
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
          <h3 style={{ textAlign: 'center', color: '#FFF', padding: '20px 0' }}>
            Do you want to enter a prompt or select an image?
          </h3>
        </FadeIn> */}

          {/* <FadeIn index={delay++} className="edition-btn">
          <div
            className="edition-btn__item"
            style={{ background: tab ? 'rgba(255, 255, 255, 0.1)' : '' }}
            onClick={() => {
              setSelectedImage(null);
              setTab(true);
            }}
          >
            Prompt
          </div>
          <button
            disabled
            onClick={() => {
              setValue('prompts', '');
              setTab(false);
            }}
            style={{ background: !tab ? 'rgba(255, 255, 255, 0.1)' : '' }}
            className="edition-btn__item"
          >
            Image
          </button>
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
            {tab ? (
              <>
                <FadeIn index={delay++}>
                  <h2 className="sec-ttl">Your prompt</h2>
                  <PromptInput
                    length={watch().prompt.length}
                    {...register("prompt", {
                      required: Validate.required,
                    })}
                    setValue={(v) => setValue("prompt", v)}
                  />
                </FadeIn>
                <FadeIn index={delay++} className="edition-btn">
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
              </>
            ) : (
              <>
                <FadeIn index={delay++} className="edition-update">
                  <h2 className="sec-ttl">Upload addictional image</h2>
                  {/* {!watch().selectedFile1 ? (
                    <>
                      <FileDropInput
                        type="normal"
                        onDrop={(e) =>
                          onSelectImage(e, (value) => setValue('selectedFile1', value))
                        }
                      />
                    </>
                  ) : null}
                  <div className="" style={{ marginTop: 20 }}>
                    {!!watch().selectedFile1 && (
                      <div
                        className="image-file"
                        style={{ position: 'relative', background: 'rgba(255, 162, 95, 0.10)' }}
                      >
                        <img
                          src={watch().selectedFile1.preview}
                          alt="img"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                        <div
                          className="swap-list__close"
                          onClick={() => setValue('selectedFile1', null)}
                        ></div>
                      </div>
                    )}
                  </div> */}
                </FadeIn>
              </>
            )}

            <FadeIn
              index={delay++}
              className="edition-style__btn"
              style={{ marginTop: 50 }}
            >
              <Button onClick={onSubmit} loading={isPending} variant="basic">
                Generate
              </Button>
              {/* <div className="btn-basic"></div> */}
            </FadeIn>
          </div>
          {/* <FadeIn index={delay++} style={{ marginTop: 24 }}>
              <Mission />
            </FadeIn> */}
        </div>
        <FadeIn from="50%" index={delay++} style={{ marginTop: 20 }}>
          <ResultOnPage fileKey={data?.data} service_id={service?.id} />
        </FadeIn>
      </div>
      {/* <div className="p-content content-right">
        <ContentRight onClick={(item) => setValue('prompts', item.prompts)} />
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
          type={APP_ROUTE.TEXT_TO_VIDEO.routeName}
          onClose={toggleHistory}
          onSelect={(item) => {
            setValue("prompts", item.prompt);
            toggleHistory();
          }}
        />
      </Modal>
      <Tutorials id={APP_ROUTE.TEXT_TO_VIDEO.id} />
    </div>
  );
};

export default SoraVideo;
