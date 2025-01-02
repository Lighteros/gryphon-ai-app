/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import ImagePopup from "../../../components/ImagePopup/ImagePopup";
import { useModal } from "../../../context/modalContext";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../../constant/Validate";
import resetPasswordService from "../../../services/resetPasswordService";
import { check_mail } from "../../../constant/MessageToatify";
import toastCustom from "../../../components/Shared/toast";
import { useToggle } from "../../../hooks/useToggle";
import Button from "../../../components/Ui/Button";
import Captcha from "../../../components/Shared/Captcha";
import { useCountdown } from "../../../hooks/useCountDown";
import { Icons } from "../../../constant/icon";
const countInit = 30;

const ForgotPass = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    email: "",
  });
  const { closeModal } = useModal();
  const [hasSend, setHasSend] = useState(false);
  const [loading, toggleLoading] = useToggle(false);
  const [openCaptcha, toggleCaptcha] = useToggle(false);
  const [counter, { startCountdown, resetCountdown }] = useCountdown({
    countStart: countInit,
  });
  const startCounter = () => {
    resetCountdown();
    startCountdown();
  };
  const onSubmit = async (captchaId) => {
    toggleLoading();
    try {
      const data = watch();
      data.captcha = captchaId;
      data.email = data.email.trim().toLowerCase();
      const res = await resetPasswordService.sendEmail(data);
      if (res.success) {
        setHasSend(true);
        startCounter();
        toastCustom.success("We have sent an email to you.");
      } else {
        toastCustom.error(res.error_message);
      }
    } catch (error) {
      console.log("Error reset password", error);
      toastCustom.error();
    } finally {
      toggleLoading();
    }
  };
  const disabled = counter > 0 && counter < countInit;

  return (
    <div id="popup" className="popup active">
      <ImagePopup />
      <div className="popup__body large">
        <div
          className="popup__close js-close-popup"
          onClick={() => closeModal()}
        ></div>

        <div className="popup__content">
          <p className="popup__ttl">Recover your password</p>
          <p className="popup__txt">
            Send us your email to receive verfication link
          </p>
          <div className="popup-form">
            <form onSubmit={handleSubmit(toggleCaptcha)}>
              <label style={{ position: "relative" }}>
                <img
                  src={Icons.icon_email}
                  alt="images"
                  style={{ position: "absolute", left: 5, top: 12 }}
                />
                <input
                  tabIndex={1}
                  autoFocus={true}
                  style={{ border: errors.email ? "1px solid red" : "" }}
                  className="form-control"
                  type="text"
                  placeholder="Your email"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: validateEmail,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="validate-message">{errors.email.message}</p>
                )}
              </label>
              <p className="popup-form__note">Didn’t received code yet? </p>
              <Captcha
                isShow={openCaptcha}
                onClose={toggleCaptcha}
                onSuccess={({ id }) => onSubmit(id)}
              />
              <Button type="submit" disabled={disabled} loading={loading}>
                {hasSend ? "Re-send" : "Continue"}{" "}
                {disabled ? `(${counter})` : ""}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
