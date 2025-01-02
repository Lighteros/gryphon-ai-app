import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { API_BASE_URL } from "../../constant";
const Captcha = ({ isShow, onSuccess, onClose, turnOnCaptcha = false }) => {
  useEffect(() => {
    if (!turnOnCaptcha && isShow) {
      onSuccess({ id: "1" });
      onClose();
    }
  }, [isShow, turnOnCaptcha]);
  if (!turnOnCaptcha) return <></>;
  return (
    <Modal isOpen={isShow} closeModal={onClose}>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {" "}
        <Content onSuccess={onSuccess} onClose={onClose} />
      </div>
    </Modal>
  );
};
const Content = ({ onSuccess, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const config = {
      requestCaptchaDataUrl: `${API_BASE_URL}auth/captcha/gen`,
      validCaptchaUrl: `${API_BASE_URL}auth/captcha/verify`,
      bindEl: "#captcha-box",
      validSuccess: (res, c, tac) => {
        onSuccess(res.data);
        tac.destroyWindow();
        onClose();
      },
      validFail: (res, c, tac) => {
        tac.reloadCaptcha();
      },
    };
    const style = {
      logoUrl: "/assets/images/captcha_logo.png",
    };
    new window.TAC(config, style).init();
  }, []);
  useEffect(() => {
    const fn = (e) => {
      onClose();
    };
    const ele = document.querySelector("#tianai-captcha-slider-close-btn");
    ele?.addEventListener("click", fn);
    return () => {
      ele?.removeEventListener("click", fn);
    };
  }, [ref.current]);
  return <div id="captcha-box" ref={ref}></div>;
};
// const Captcha = ({ isShow, onSuccess, onClose }) => {
//   useEffect(() => {
//     if (isShow) {
//       onSuccess(1);
//       onClose();
//     }
//   }, [isShow]);

//   return <></>;
// };
export default Captcha;
