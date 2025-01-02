/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImagePopup from "../../components/ImagePopup/ImagePopup";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../constant/Validate";
import authService from "../../services/authService";
import { useModal } from "../../context/modalContext";
import toast from "../../components/Shared/toast";
import Button from "../../components/Ui/Button";
import { useToggle } from "../../hooks/useToggle";
import Captcha from "../../components/Shared/Captcha";
import { useCountdown } from "../../hooks/useCountDown";
const countInit = 30;
const VerifyEmail = () => {
  const { data } = useModal();
  const [openCaptcha, toggleCaptcha] = useToggle(false);
  const [hadSend, setHadSend] = useState(false);
  const [counter, { startCountdown, resetCountdown }] = useCountdown({
    countStart: countInit,
  });
  const startCounter = () => {
    resetCountdown();
    startCountdown();
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (data) {
      reset({
        email: data,
      });
      startCountdown();
    }
  }, [data]);
  const onSubmit = async (captchaId) => {
    try {
      setLoading(true);
      const email = watch().email.trim().toLowerCase();
      const res = await authService.sendmailActiveAcount({
        ...watch(),
        captcha: captchaId,
        email: email,
      });
      if (res.success) {
        setHadSend(true);
        startCounter();
        toast.success("We have sent an email to you.");
      } else {
        toast.error(res.error_message);
      }
    } catch (error) {
      console.log("Error reset password", error);
      toast.error();
    } finally {
      setLoading(false);
    }
  };

  const disabled = counter > 0 && counter < countInit;

  return (
    <div id="popup">
      <div className="popup__body large">
        <ImagePopup />
        <div className="popup__content">
          <p className="popup__ttl">Verify email</p>
          <p className="popup__txt">
            We just sent a verification link to your email, please check!
          </p>
          <div className="popup-form">
            <form onSubmit={handleSubmit(toggleCaptcha)}>
              <label>
                <p className="popup-form__ttl">Email</p>
                <input
                  style={{
                    border: errors.email ? "1px solid red" : "",
                    outline: "none",
                  }}
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
              <p className="popup-form__note">Didn’t received code yet?</p>
              <Button type="submit" disabled={disabled} loading={loading}>
                {hadSend ? "Re-send" : "Continue"}{" "}
                {disabled ? `(${counter})` : ""}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Captcha
        isShow={openCaptcha}
        onClose={toggleCaptcha}
        onSuccess={({ id }) => onSubmit(id)}
      />
    </div>
  );
};

export default VerifyEmail;
