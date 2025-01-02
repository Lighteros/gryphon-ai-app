/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import ModalVideoToVideo from "../../../../components/Modal/ModalVideoToVideo";
import ModalOutput from "../../../../components/Modal/ModalOutput";

import { useLocation, useNavigate } from "react-router-dom";
import { appendUploadImage } from "../../../../helper";
// import videoToVideoService from '../../../../services/videoToVideoService';
import toast from "../../../../components/Shared/toast";
import useHandleError from "../../../../hooks/useHandleError";
import { ResultImageType } from "../../../../routes/link";
import { useVideoProcessing } from "../../../../lib/videoTrim/VideoProcessing";
import { useUser } from "../../../../context/AuthContext";
import { useModal } from "../../../../context/modalContext";
import useServiceCredit from "../../../../hooks/useServiceCredit";
import mediaService from "../../../../services/mediaService";

const toArray = (obj) => {
  if (obj) {
    const promptsArray = Object.entries(obj).map(([key, value]) => ({
      frame: Number(key),
      prompt: value.trim(),
    }));
    return promptsArray;
  }

  return [];
};

const AdvancedSetting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState(
    toArray(location.state?.style?.style.prompts)
  );
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useModal();
  const { service } = useServiceCredit("VIDEO_TO_VIDEO");
  const [openModalType, setOpenModalType] = useState("video");
  const toggleModal = () => {
    setOpenModalType("");
  };
  const handleError = useHandleError();
  const [setting, setSetting] = useState({
    video: location.state?.video,
    finalVideo: location.state?.video,
    style: location.state?.style,
    prompts: {},
  });

  // const {inputVideoFile, handleLoadedData,videoUrl,TrimBar}=useVideoProcessing({
  //   file: setting?.video?.file
  // });
  const data = (length) => {
    const items = [];
    for (let i = 0; i < length; i++) {
      items.push(
        <div className="advance-list__item" key={i}>
          <div className="advance-list__number">
            <p className="advance-list__ttl">At frame</p>
            <input
              value={prompts.at(i)?.frame}
              onChange={(e) => {
                prompts[i] = {
                  ...(prompts[i] || {}),
                  frame: "",
                };
                prompts[i].frame = e.target.value;
                setPrompts([...prompts]);
              }}
              type="text"
              placeholder="0"
              style={{ caretColor: "#fff" }}
            />
          </div>
          <div className="advance-list__body">
            <p className="advance-list__ttl">Prompt</p>
            <input
              value={prompts.at(i)?.prompt}
              type="text"
              placeholder="English input only"
              onChange={(e) => {
                prompts[i] = {
                  ...(prompts[i] || {}),
                  prompt: "",
                };
                prompts[i].prompt = e.target.value;
                setPrompts([...prompts]);
              }}
              style={{ caretColor: "#fff" }}
            />
          </div>
        </div>
      );
    }

    return items;
  };
  const videoProcessing = useVideoProcessing({
    file: setting?.video?.file,
  });
  const uploadImage = async (captchaId, isAds = false) => {
    setIsLoading(true);
    let imgId = null;
    if (setting.video) {
      const rs = await submitUploadImage();
      if (!rs) {
        setIsLoading(false);
        return;
      }
      imgId = rs;
    }
    return submitRequest(captchaId, isAds, imgId);
  };
  const submitUploadImage = async () => {
    if (!videoProcessing.checkDurantion(10)) {
      return;
    }
    var formData = new FormData();
    const data = await videoProcessing.handleTrim();
    if (!data) return toast.error("Cannot trim video");
    if (data.duration > 10)
      return toast.error("Video must be under 10 seconds.");
    formData = appendUploadImage(data.file, "init_video", formData);
    formData = appendUploadImage(data.thumbnail, "init_thumb", formData);
    try {
      const rs = await mediaService.uploadImage(formData);
      if (rs.success) {
        return Number(rs.data.id);
      }
      toast.error(rs.error_message);
      return null;
    } catch (error) {
      toast.error();
      return null;
    }
  };
  const { fetchUserData } = useUser();
  const submitRequest = async (captchaId, isAds, img_id) => {
    const convertedObject = prompts.reduce(
      (acc, { frame, prompt }) => {
        acc.prompts[frame.toString()] = prompt;
        return acc;
      },
      { prompts: {} }
    );
    const body = {
      init_video_id: img_id,
      prompts: convertedObject,
      service_id: service.id,
    };

    try {
      const res = await mediaService.create(body);
      if (res.success) {
        fetchUserData();
        openModal("result", {
          from: ResultImageType.video2Video,
          file_key: res.data,
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
  return (
    <div className="p-content">
      <div className="advance" style={{ width: "100%" }}>
        <h2 className="sec-ttl">Advanced setting</h2>
        <div className="advance-list">{data(6)}</div>
        <div className="center-box">
          <div
            className="btn-basic"
            onClick={() => {
              setOpenModalType("video");
            }}
          >
            Add video
          </div>
        </div>
      </div>
      {/* <img
        src={thumbnails?.length ? thumbnails[0] : null}
        alt="thumbnails"
        style={{ width: 100, aspectRatio: 1 }}
      /> */}
      <Modal isOpen={openModalType === "video"} closeModal={toggleModal}>
        <ModalVideoToVideo
          onChange={(style) =>
            setSetting((pre) => {
              return { ...pre, style };
            })
          }
          videoProcessing={videoProcessing}
          setting={setting}
          onClose={toggleModal}
          onSubmit={() => {
            setOpenModalType("output");
          }}
        />
      </Modal>
      <Modal isOpen={openModalType === "output"} closeModal={toggleModal}>
        <ModalOutput
          onBack={() => setOpenModalType("video")}
          onSubmit={uploadImage}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default AdvancedSetting;
