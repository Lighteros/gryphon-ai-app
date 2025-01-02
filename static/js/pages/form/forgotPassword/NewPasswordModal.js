import React, { useEffect, useState } from "react";
import ImagePopup from "../../../components/ImagePopup/ImagePopup";
import { Icons } from "../../../constant/icon";
import { useForm } from "react-hook-form";
import resetPasswordService from "../../../services/resetPasswordService";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  reset_password_fail,
  reset_password_success,
} from "../../../constant/MessageToatify";
import { useModal } from "../../../context/modalContext";
import toast from "../../../components/Shared/toast";
import { useToggle } from "../../../hooks/useToggle";
import Button from "../../../components/Ui/Button";

const NewPassword = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    email: "",
    token: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onShowPass = () => {
    setShowPassword(!showPassword);
  };
  const onShowPassConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [loading, toggleLoading] = useToggle(false);
  const [searchParams] = useSearchParams();
  let email = searchParams.get("email");
  let token = searchParams.get("token");

  useEffect(() => {
    if (email && token) {
      reset({
        email,
        token,
      });
    }
  }, [email, token]);
  const onSubmit = async (data) => {
    try {
      toggleLoading();
      const res = await resetPasswordService.resetPassword(data);
      if (res.success) {
        reset_password_success();
        openModal("login");
        navigate("/");
      } else {
        const error = res.error_message;
        toast.error(error);
        console.log(error);
      }
    } catch (error) {
      toast.error();
      console.log("Error create new password", error);
    } finally {
      toggleLoading();
    }
  };
  return (
    <div id="popup">
      <div className="popup__body">
        {/* <ImagePopup /> */}
        <div className="popup__content">
          <p className="popup__ttl">Create new password</p>
          <p className="popup__txt">
            Create a new password to continue sign in to your account
          </p>
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
                    autoFocus={true}
                    className={`form-control ${
                      errors.password ? "check-input" : ""
                    } `}
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
                    className="form-control"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Your confirm password"
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
              <Button type="submit" loading={loading}>
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
