import React, { useEffect, useState } from "react";

import { useModal } from "../../context/modalContext";
import { useLocation, useSearchParams } from "react-router-dom";
import Button from "../Ui/Button";

import { ResultImageType } from "../../routes/link";

import toast from "../Shared/toast";
import Skeleton from "../Skeleton";
import mediaService from "../../services/mediaService";
const ModalResultShare = () => {
  const [param, setParam] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isVideo = data?.result_url?.endsWith(".mp4");
  const { openModal, closeModal } = useModal();
  const fileKey = param.get("id");

  const fetchData = (idClear) => {
    setLoading(true);
    let fetchFunc = mediaService.detail;
    fetchFunc(fileKey)
      .then((res) => {
        if (!res.success || !res.data) {
          return;
        }
        setData(res?.data);
      })
      .catch((e) => {
        toast.error(
          "The image failed to load. Please reload the page and try again."
        );
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (fileKey) {
      fetchData();
    }
  }, [fileKey]);

  return (
    <div className="popup active" id="popup">
      <div
        className="popup__close js-close-popup"
        onClick={() => closeModal()}
      ></div>
      <div>
        <h4
          style={{
            textAlign: "start",
            color: "#FFF",
            display: "flex",
            alignItems: "center",
            padding: 12,
          }}
        >
          Sharing from Heaven World AI’s user
        </h4>
        <div>
          <div
            className="generate-media"
            style={{ flex: 1, maxWidth: "60rem" }}
          >
            <p
              className="generate-media__image"
              style={{
                display: "flex",
                justifyContent: "center",
                aspectRatio: 1,

                borderRadius: "1.2rem",
                background: "black",
                width: "100%",
              }}
            >
              {!loading ? (
                isVideo ? (
                  <video
                    src={data?.result_url}
                    style={{
                      verticalAlign: "middle",
                      borderStyle: "none",
                      maxWidth: "100%",
                      borderRadius: "1.2rem",
                    }}
                    autoPlay
                    loop
                    // crossOrigin="anonymous"
                    preload="metadata"
                    controls
                  />
                ) : (
                  <img
                    style={{ width: "100%", objectFit: "contain" }}
                    src={data?.result_url}
                    alt="stabilityworld"
                  />
                )
              ) : (
                <Skeleton
                  containerClassName="w-100"
                  style={{
                    width: "100%",
                    aspectRatio: "1",

                    height: "100%",
                  }}
                />
              )}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: 20,
          }}
        >
          <p style={{ color: "#FFF" }}>Love this?</p>
          <Button
            style={{ width: 120, height: 40, fontSize: 14, marginBottom: 0 }}
            onClick={() => openModal("register")}
          >
            Create account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalResultShare;
