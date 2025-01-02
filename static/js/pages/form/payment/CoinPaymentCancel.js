import React, { Component, Fragment, useEffect, useState } from "react";

import withAuth from "../../../context/withAuth";

function DepositCancel() {
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
                <img
                  className=""
                  src="/assets/images/error.png"
                  alt="lỗi"
                  style={{ objectFit: "contain" }}
                  height={140}
                  width={140}
                />
              </div>
              <p className="popup__txt" style={{ marginTop: 12 }}>
                <b className="fs-3 ">You have canceled the transaction!</b>
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

export default withAuth(DepositCancel);
