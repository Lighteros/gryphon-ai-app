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
import { useApiKeyCreate } from "../../services/apiKeyService";
import { onApiResponse } from "../../lib/query";
import { copyText } from "../../utils";
const dateObj = new Date();
const month = dateObj.getMonth() + 1;
const day = dateObj.getDate();
const year = dateObj.getFullYear();
const newDate = day + "/" + month + "/" + year;
const CreateKeyApiModal = ({ onClose }) => {
  const { mutate, isPending, data } = useApiKeyCreate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      token_name: "",
      expiration_date: null,
    },
  });
  const onSubmit = async () => {
    const data = watch();
    mutate(
      {
        expire_time: data.expiration_date,
        name: data.token_name,
      },
      {
        onSuccess: (data) => {
          if (onApiResponse(data, true)) {
            // onClose();
          }
        },
      }
    );
  };

  return (
    <div id="popup">
      <div className="popup__body" style={{ width: "70rem" }}>
        <div className="popup__content">
          <p
            className="popup__txt"
            style={{ marginBottom: 10, fontSize: 22, textAlign: "center" }}
          >
            {" "}
            {data ? " Your API Key" : "Create API Key"}
          </p>
          <div className="popup-form">
            {data ? (
              <form>
                {/* <p className="popup__txt" style={{ marginBottom: 5 }}>
                  Public Key:
                </p>
                <label style={{ position: 'relative' }}>
                  <p className="password">
                    <input

                      type="text"
                      tabIndex={2}
                      style={{
                        paddingLeft: 10
                      }}
                      className="form-control"
                      value={data?.data?.public_key}
                      
                    />
                       <span
                      className="copy"
                      onClick={() => copyText(data?.data?.public_key)}
                      style={{ cursor: 'pointer' , position:'absolute', right:10, top:10}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15.75 15.75H20.25V3.75H8.25V8.25"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.75 8.25H3.75V20.25H15.75V8.25Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </p>
            
                </label> */}

                <label style={{ position: "relative" }}>
                  <input
                    tabIndex="1"
                    autoFocus={true}
                    style={{ paddingLeft: 10 }}
                    className="form-control"
                    type="text"
                    value={data?.data?.private_key}
                  />
                  <span
                    className="copy"
                    onClick={() => copyText(data?.data?.private_key)}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: 10,
                      top: 10,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.75 15.75H20.25V3.75H8.25V8.25"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.75 8.25H3.75V20.25H15.75V8.25Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </label>

                <p className="popup-form__note">
                  <Link onClick={() => onClose()} tabIndex={5}>
                    Ok!
                  </Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="popup__txt" style={{ marginBottom: 5 }}>
                  {" "}
                  Token name:
                </p>
                <label style={{ position: "relative" }}>
                  <input
                    tabIndex="1"
                    autoFocus={true}
                    style={{
                      border: errors.token_name ? "1px solid red" : "",
                      paddingLeft: 10,
                    }}
                    className="form-control"
                    type="text"
                    placeholder="Token name"
                    name="token_name"
                    {...register("token_name", {
                      required: "Token name is required",
                      pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Token name is required",
                      },
                    })}
                  />
                  {errors.token_name && (
                    <p className="validate-message">
                      {errors.token_name.message}
                    </p>
                  )}
                </label>
                <p className="popup__txt" style={{ marginBottom: 5 }}>
                  {" "}
                  Expiration date:
                </p>
                <label style={{ position: "relative" }}>
                  <p className="password">
                    <input
                      value={watch().expiration_date}
                      type="date"
                      tabIndex={2}
                      style={{
                        border: errors.expiration_date ? "1px solid red" : "",
                        paddingLeft: 10,
                      }}
                      className="form-control"
                      placeholder="Date "
                      {...register("expiration_date", {
                        required: "    Expiration date is required",
                        pattern: {
                          value: /^\d{4}-\d{2}-\d{2}$/,
                          message: "Expiration date is required",
                        },
                      })}
                    />
                  </p>
                  {errors.expiration_date && (
                    <p className="validate-message">
                      {errors.expiration_date.message}
                    </p>
                  )}
                </label>

                <Button
                  type="submit"
                  loading={isPending}
                  style={{ marginTop: 20 }}
                  tabIndex="3"
                >
                  Create
                </Button>
                <p className="payment-info__btn" onClick={() => onClose()}>
                  <Link tabIndex={5}>Cancel</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateKeyApiModal;
