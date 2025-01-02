import React, { useState } from "react";
import { Icons } from "../../../constant/icon";
import { Link } from "react-router-dom";
import { useModal } from "../../../context/modalContext";
import { useForm } from "react-hook-form";
import toast from "../../../components/Shared/toast";
import Button from "../../../components/Ui/Button";
import { useToggle } from "../../../hooks/useToggle";
import resetPasswordService from "../../../services/resetPasswordService";

const ModalChangePass = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const [loading, setLoading] = useToggle(false);
  const { closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onShowPass = () => {
    setShowPassword(!showPassword);
  };
  const onShowPassConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onShowNewPass = () => {
    setShowNewPassword(!showNewPassword);
  };
  const onSubmit = async (captchaId) => {
    try {
      const data = watch();
      //   data.captcha = captchaId;
      setLoading();
      const res = await resetPasswordService.changePassword(data);
      if (res.success) {
        closeModal();
        toast.success("Change password successfully!");
      } else {
        toast.error(res.error_message);
      }
      setLoading(false);
    } catch (error) {
      console.log("Registration failed:", error);
      toast.error();
      setLoading(false);
    }
  };
  return (
    <div className="popup__body " style={{ width: "60rem" }}>
      {/* <ImagePopup /> */}
      <div className="popup__content">
        <p className="popup__ttl">Hello, our new fellow!</p>
        <p className="popup__txt">Change your password</p>
        <div className="popup-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <p className="password">
                <img
                  src={Icons.icon_password}
                  alt="images"
                  style={{ position: "absolute", left: 5, top: 12 }}
                />
                <input
                  tabIndex={1}
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
                  tabIndex={2}
                  style={{ border: errors.new_password ? "1px solid red" : "" }}
                  className="form-control"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Your new password"
                  id="new-password"
                  name="new-password"
                  {...register("new_password", {
                    required: " New password is required",

                    minLength: {
                      value: 6,
                      message: "New Password must have at least 6 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "New Password cannot exceed 20 characters",
                    },
                  })}
                />
                <span
                  toggle="#password"
                  className="toggle-password js-password"
                >
                  <img
                    className="show"
                    src={showNewPassword ? Icons.eye : Icons.eye_close}
                    alt="images"
                    onClick={onShowNewPass}
                  />
                </span>
              </p>
              {errors.new_password && (
                <p className="validate-message">
                  {errors.new_password.message}
                </p>
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
                  style={{
                    border: errors.confirm_new_password ? "1px solid red" : "",
                  }}
                  className="form-control"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Your new confirm password"
                  id="confirm_new_password"
                  name="confirm_new_password"
                  {...register("confirm_new_password", {
                    required: "Confirm new password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Confirm new password must have at least 6 characters",
                    },
                    maxLength: {
                      value: 30,
                      message:
                        "Confirm new passwordcannot exceed 20 characters",
                    },
                    validate: (value) =>
                      value === getValues("new_password") ||
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
              {errors.confirm_new_password && (
                <p className="validate-message">
                  {errors.confirm_new_password.message}
                </p>
              )}
            </label>

            {/* <Captcha
                isShow={openCaptcha}
                onClose={toggleCaptcha}
                onSuccess={({ id }) => onSubmit(id)}
              /> */}
            <Button type="submit" loading={loading} style={{ marginTop: 30 }}>
              Change password
            </Button>
            <p className="payment-info__btn" onClick={() => closeModal()}>
              <Link tabIndex={5}>Cancel</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalChangePass;
