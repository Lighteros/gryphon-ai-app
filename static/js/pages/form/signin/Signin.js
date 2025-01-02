import React, { useState } from "react";
import { Icons } from "../../../constant/icon";
import { Link } from "react-router-dom";
import IconsLink from "../../../components/Icons/IconsLink";
import ImagePopup from "../../../components/ImagePopup/ImagePopup";
import { useModal } from "../../../context/modalContext";
import { useForm } from "react-hook-form";
import { useLogin } from "../../../services/authService";
import { validateEmail } from "../../../constant/Validate";
import { useToggle } from "../../../hooks/useToggle";
import Button from "../../../components/Ui/Button";
import Captcha from "../../../components/Shared/Captcha";
const Signin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      device_id: "d_Id",
      app_type: "web",
      country: "VN",
    },
  });
  const { mutate, isPending } = useLogin();
  const [openCaptcha, toggleCaptcha] = useToggle(false);
  const { openModal, closeModal } = useModal();

  const [showPassword, setShowPassword] = useState(false);
  const onShowPass = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (captchaId) => {
    const data = watch();
    data.captcha = captchaId;
    data.email = data.email.trim().toLowerCase();
    await mutate(data);
  };
  return (
    <div className="popup active" id="popup">
      {" "}
      <ImagePopup />
      <div className="popup__body large">
        <div
          className="popup__close js-close-popup"
          onClick={() => closeModal()}
        ></div>
        <div className="popup__content">
          <p className="popup__ttl">Welcome back!</p>
          <p className="popup__txt">
            Watch your prompts turn into beautiful designs, artworks, images,
            and videos. Gen craft brings your ideas to life.
          </p>
          <div className="popup-form">
            <form onSubmit={handleSubmit(toggleCaptcha)}>
              <label style={{ position: "relative" }}>
                <img
                  src={Icons.icon_user}
                  alt="images"
                  style={{ position: "absolute", left: 5, top: 11 }}
                />
                <input
                  tabIndex="1"
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
              <label style={{ position: "relative" }}>
                <p className="password">
                  <img
                    src={Icons.icon_password}
                    alt="images"
                    style={{ position: "absolute", left: 5, top: 11 }}
                  />
                  <input
                    tabIndex="2"
                    style={{ border: errors.password ? "1px solid red" : "" }}
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    id="password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      },

                      maxLength: {
                        value: 30,
                        message: "Password cannot exceed 20 characters",
                      },
                    })}
                  />
                  <span
                    toggle="#password"
                    className="toggle-password js-password"
                  >
                    <img
                      className="show"
                      src={showPassword ? Icons.eye : Icons.eye_close}
                      alt="images"
                      onClick={onShowPass}
                    />
                  </span>
                </p>
                {errors.password && (
                  <p className="validate-message">{errors.password.message}</p>
                )}
              </label>
              <p className="popup-form__forgot">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => openModal("forgot-password")}
                >
                  Forgot password?
                </span>
              </p>
              <Button
                type="submit"
                loading={isPending}
                style={{ marginTop: 15 }}
              >
                Sign In
              </Button>
              <p className="popup-form__with">
                <span>Or </span>
              </p>

              <IconsLink />
              <Captcha
                isShow={openCaptcha}
                onClose={toggleCaptcha}
                onSuccess={({ id }) => onSubmit(id)}
              />

              <p className="popup-form__note">
                <span className="popup-form__forgot"> Don’t have account?</span>
                <Link onClick={() => openModal("register")} tabIndex={6}>
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
