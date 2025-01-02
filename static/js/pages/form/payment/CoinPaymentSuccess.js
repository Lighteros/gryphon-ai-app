import React, { Fragment, useEffect, useState } from "react";

import userService from "../../../services/userService";
import withAuth from "../../../context/withAuth";

function DepositStatus() {
  const [status, setStatus] = useState({
    error: "",
    success: false,
  });
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetchFunc();
    const intervalId = setInterval(() => {
      fetchFunc(intervalId);
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const fetchFunc = (intervalId) => {
    const code = localStorage.getItem("deposit");
    if (!code) {
      setStatus((e) => ({
        ...e,
        error: "No deposit requests have been made yet.",
      }));
      return;
    }
    userService.depositDetail(code).then((data) => {
      if (data?.success) {
        if (data.data.status === "SUCCESS") {
          clearInterval(intervalId);
          setAmount(data.data.transaction_amount);
          localStorage.removeItem("deposit");
          setStatus({
            error: "",
            success: true,
          });
        }
        if (data.data.status === "FAILED") {
          clearInterval(intervalId);
          setStatus((e) => ({
            ...e,
            error: data?.error_message || "An error occurred.",
          }));
        }
      } else {
        clearInterval(intervalId);
        setStatus((e) => ({
          ...e,
          error: data?.error_message || "An error occurred.",
        }));
      }
    });
  };
  return (
    <Fragment>
      <div
        className="activate-account"
        style={{
          height: "90vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          className="popup__body "
          style={{ width: "100%", background: "none" }}
        >
          {/* <ImagePopup /> */}
          <div className="popup__content">
            <div
              style={{
                display: "flex",

                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div className="">
                {status.success ? (
                  <img
                    className="mb-4"
                    src="/assets/images/success.png"
                    alt="thành công"
                    style={{ objectFit: "contain" }}
                    height={140}
                    width={140}
                  />
                ) : status.error ? (
                  <img
                    className="mb-4"
                    src="/assets/images/error.png"
                    alt="lỗi"
                    style={{ objectFit: "contain" }}
                    height={140}
                    width={140}
                  />
                ) : (
                  <img
                    className="mb-4 animate-spin"
                    src="/assets/images/loading.png"
                    alt="lỗi"
                    style={{ objectFit: "contain" }}
                    height={140}
                    width={140}
                  />
                )}
              </div>
              <p className="popup__txt" style={{ marginTop: 12 }}>
                <>
                  {status.success ? (
                    <b className="fs-3 text-success">
                      Congratulations! Your deposit has been successfully
                      credited to your account.
                    </b>
                  ) : status.error ? (
                    <b className="fs-3 text-danger ">{status.error}</b>
                  ) : (
                    <b className="fs-3 ">
                      Your deposit request is being processed!
                    </b>
                  )}
                </>
                <br />
              </p>
              <a href="/" className="popup-form__btn" style={{ maxWidth: 500 }}>
                {" "}
                Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default withAuth(DepositStatus);
