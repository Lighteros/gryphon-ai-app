import React, { useState } from "react";
import { Icons } from "../../../constant/icon";
import { Link } from "react-router-dom";
import IconsLink from "../../../components/Icons/IconsLink";
import ImagePopup from "../../../components/ImagePopup/ImagePopup";
import { useModal } from "../../../context/modalContext";
import { useForm } from "react-hook-form";
import authService, { useRegister } from "../../../services/authService";
import { setToken } from "../../../api/token";
import { validateEmail } from "../../../constant/Validate";
import toast from "../../../components/Shared/toast";
import Button from "../../../components/Ui/Button";
import getRefCode from "../../../utils/getRefCode";
import Captcha from "../../../components/Shared/Captcha";
import { useToggle } from "../../../hooks/useToggle";
import { FiUsers } from "react-icons/fi";
const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      device_id: "d_Id",
      app_type: "web",
      country: "VN",
      ref_code: getRefCode(),
    },
  });
  const [openCaptcha, toggleCaptcha] = useToggle(false);
  const { openModal, closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onShowPass = () => {
    setShowPassword(!showPassword);
  };
  const onShowPassConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const { mutate, isPending } = useRegister();
  const onSubmit = async (captchaId) => {
    const data = watch();
    data.captcha = captchaId;
    data.ref_code = getRefCode();
    data.email = data.email.trim().toLowerCase();
    await mutate(data);
  };
  return (
    <div id="popup" className="popup active">
      <ImagePopup />
      <div className="popup__body large">
        <div
          className="popup__close js-close-popup"
          onClick={() => closeModal()}
        ></div>

        <div className="popup__content">
          <p className="popup__ttl">Hello, our new fellow!</p>
          <p className="popup__txt">
            Create account to creative cool stuffs with our AI Platform
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
                  tabIndex={1}
                  autoFocus={true}
                  style={{ border: errors.full_name ? "1px solid red" : "" }}
                  className="form-control"
                  type="text"
                  placeholder="Full name"
                  {...register("full_name", {
                    required: "Your name is required",
                  })}
                />
                {errors.full_name && (
                  <p className="validate-message">{errors.full_name.message}</p>
                )}
              </label>
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
              <label>
                <p className="password">
                  <img
                    src={Icons.icon_password}
                    alt="images"
                    style={{ position: "absolute", left: 5, top: 12 }}
                  />
                  <input
                    tabIndex={2}
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
              <label>
                <p className="password">
                  <img
                    src={Icons.icon_password}
                    alt="images"
                    style={{ position: "absolute", left: 5, top: 12 }}
                  />
                  <input
                    tabIndex={3}
                    style={{ border: errors.password ? "1px solid red" : "" }}
                    className="form-control"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    id="confirmPassword"
                    name="password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      minLength: {
                        value: 6,
                        message:
                          "Confirm Password must have at least 6 characters",
                      },
                      maxLength: {
                        value: 30,
                        message:
                          " Confirm Password cannot exceed 20 characters",
                      },
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  <span
                    toggle="#confirmPassword"
                    className="toggle-password js-password"
                  >
                    <img
                      className="show"
                      src={showConfirmPassword ? Icons.eye : Icons.eye_close}
                      alt="images"
                      onClick={onShowPassConfirm}
                    />
                  </span>
                </p>
                {errors.confirmPassword && (
                  <p className="validate-message">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </label>
              <label>
                <p className="password">
                  <span style={{ position: "absolute", left: 5, top: 12 }}>
                    <FiUsers size={20} stroke="white" strokeWidth={1} />
                  </span>
                  <input
                    className="form-control"
                    type={"text"}
                    disabled
                    style={{ background: "#1a1a1a", border: 0, color: "#fff" }}
                    placeholder="Ref code"
                    {...register("ref_code")}
                  />
                </p>
              </label>
              <Button type="submit" loading={isPending}>
                Register
              </Button>
              <p className="popup-form__with">
                <span>Or sign in with</span>
              </p>
              <IconsLink />
              <Captcha
                isShow={openCaptcha}
                onClose={toggleCaptcha}
                onSuccess={({ id }) => onSubmit(id)}
              />

              <p className="popup-form__note">
                Already had an account?{" "}
                <Link onClick={() => openModal("login")} tabIndex={5}>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
