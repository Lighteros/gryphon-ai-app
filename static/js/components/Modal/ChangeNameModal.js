import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToggle } from "../../hooks/useToggle";
import imagePopup from "../../assets/images/img_popup.jpg";
import { useModal } from "../../context/modalContext";
import toast from "../Shared/toast";
import Button from "../Ui/Button";
import { Link } from "react-router-dom";
import resetPasswordService from "../../services/resetPasswordService";
import userService from "../../services/userService";
import { useUser } from "../../context/AuthContext";
import ImagePopup from "../ImagePopup/ImagePopup";
import { Icons } from "../../constant/icon";
import { validateEmail } from "../../constant/Validate";
const ChangeNameModal = ({ onClose }) => {
  const { fetchUserData, user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email ? user?.email : "",
      full_name: user?.full_name ? user?.full_name : "",
    },
  });
  const [loading, setLoading] = useToggle(false);

  const onSubmit = async (captchaId) => {
    try {
      const data = watch();
      //   data.captcha = captchaId;
      setLoading();
      const res = await userService.updateProfile(data);
      if (res.success) {
        fetchUserData(() => {
          setLoading(false);
          onClose();
          toast.success("Change profile successfully!");
        }, true);
      } else {
        toast.error(res.error_message);
        setLoading(false);
        // setValue('full_name', '');
      }
    } catch (error) {
      console.log("Registration failed:", error);
      toast.error();
      setLoading(false);
    }
  };
  return (
    <div id="popup">
      <div className="popup__body" style={{ width: "60rem" }}>
        {/* <ImagePopup /> */}
        <div className="popup__content">
          <p className="popup__txt" style={{ marginBottom: 10 }}>
            Change your profile
          </p>
          <div className="popup-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label style={{ position: "relative" }}>
                <img
                  src={Icons.icon_email}
                  alt="images"
                  style={{ position: "absolute", left: 5, top: 12 }}
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
                    // required: 'Email is required',
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
                    src={Icons.icon_user}
                    alt="images"
                    style={{ position: "absolute", left: 5, top: 11 }}
                  />
                  <input
                    tabIndex={1}
                    style={{ border: errors.full_name ? "1px solid red" : "" }}
                    className="form-control"
                    placeholder="Your new name "
                    {...register("full_name", {
                      required: "New name is required",
                      minLength: {
                        value: 2,
                        message: "Full name must have at least 2 characters",
                      },
                      maxLength: {
                        value: 30,
                        message: "Full name cannot exceed 30 characters",
                      },
                    })}
                  />
                </p>
                {errors.full_name && (
                  <p className="validate-message">{errors.full_name.message}</p>
                )}
              </label>

              <Button type="submit" loading={loading} style={{ marginTop: 20 }}>
                Change profile
              </Button>
              <p className="payment-info__btn" onClick={() => onClose()}>
                <Link tabIndex={5}>Cancel</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeNameModal;
