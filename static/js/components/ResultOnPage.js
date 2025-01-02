/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useMemo, useState } from "react";
import { useMediaDetail, useMediaList } from "../services/mediaService";
import { useModal } from "../context/modalContext";
import usePageData from "../hooks/usePageData";
import Skeleton from "./Skeleton";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toImageUrl } from "../utils/file";
import LoadingIcon from "./Ui/LoadingIcon";
import { copyText } from "../utils";
import { Icons } from "../constant/icon";
import clsx from "clsx";
import { formatServerTime } from "../utils/timeUtils";
import { Link } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import { config } from "../config";
import { APP_ROUTE } from "../routes/link";

const skeleton = Array.from({ length: 12 }, (_, index) => index + 1);
const ResultOnPage = ({ service_id, onSelect }) => {
  const { openModal } = useModal();
  const { isAuthenticated } = useUser();
  const [line, setLine] = useState({});
  const handleExpand = (key) => {
    setLine((e) => ({
      ...e,
      [key]: !e[key],
    }));
  };
  const { isLoading, data } = useMediaList(
    {
      page_index: 1,
      page_size: 24,
      service_id: service_id,
    },
    isAuthenticated ? true : false
  );
  const { dataList } = usePageData(data);

  const dataRender = useMemo(() => {
    let newObj = {};
    let i = 0;
    dataList.forEach((item, index) => {
      const key = item.group_key ? item.group_key : item.file_key;
      const arr = newObj[key];
      if (!arr) {
        if (i > 5) {
          return;
        }
        newObj[key] = item.group_key
          ? dataList.filter((e) => e.group_key === item.group_key)
          : dataList.filter((e) => e.file_key === item.file_key);
        i++;
      }
    });

    return newObj;
  }, [dataList]);
  return (
    <div style={{ minHeight: config.IS_MINIAPP ? 40 : 0 }}>
      <div id="result-on-page"></div>
      {!isAuthenticated ? null : isLoading ? (
        <div className="expore-list-page">
          {skeleton.map((i) => {
            return (
              <Skeleton
                className="expore-list__item"
                key={i}
                style={{ aspectRatio: "1" }}
              />
            );
          })}
        </div>
      ) : dataList?.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            paddingBottom: 60,
          }}
        >
          <h3 style={{ textAlign: "center", color: "#FF4117", fontSize: 16 }}>
            Generation history
          </h3>
          <h5
            style={{
              color: "#49ff9b",
              textAlign: "center",
              marginBottom: 20,
              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            Images and videos will be stored by us for 7 days. After that, they
            will be deleted.
          </h5>
          {Object.entries(dataRender).map(([key, value]) => {
            const isLine = line[key];
            return (
              <div
                key={key}
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: 20,
                }}
              >
                {value.at(0)?.original_prompt ? (
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginBottom: 10,
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="edition-btn-history"
                      style={{ gap: 4, minWidth: 70 }}
                    >
                      <div>
                        <span
                          className="icon"
                          style={{ cursor: "pointer", userSelect: "none" }}
                          onClick={() => {
                            onSelect(value.at(0)?.original_prompt);
                            const element =
                              document.getElementById("edition__message");
                            element.focus();
                          }}
                        >
                          <img src={Icons.pen} />
                        </span>
                      </div>
                      <div
                        onClick={() => copyText(value.at(0)?.original_prompt)}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        <img src={Icons.icon_copy} />
                      </div>
                    </div>

                    <p
                      id="text-prompt"
                      className={isLine ? "full-line" : "one-line"}
                      style={{ flex: 1 }}
                    >
                      {value.at(0)?.original_prompt}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                      onClick={() => handleExpand(key)}
                    >
                      {!isLine ? (
                        <FaPlus color="#FF4117" />
                      ) : (
                        <FaMinus color="#FF4117" />
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginBottom: 10 }}>
                    {formatServerTime(
                      value.at(0).create_time,
                      "dddd DD MMMM YYYY, HH:mm:ss"
                    )}
                  </div>
                )}

                <div className="expore-list-page">
                  {value.map((record, index) => {
                    return (
                      <Item
                        record={record}
                        openModal={openModal}
                        key={index}
                        group={value}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
          <Link to={`/history/${APP_ROUTE[service_id]?.routeName}`}>
            <div className="load-more-container">
              <button className="load-more-btn">
                Load more previous generations
              </button>
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default ResultOnPage;
const Item = ({ openModal, record, group }) => {
  const isProcessing = record.status === "PROCESSING";
  const isLoading = isProcessing || record.status === "NEW";
  const failed = record.status === "FAILED";
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading]);
  return (
    <div
      onClick={() => {
        openModal("result", {
          file_key: record.file_key,
          result_url: record?.result_url,
          status: record?.status,
          init_img: record?.init_img,
          service_id: record?.service_id,
          options: record.options,
          group: group,
        });
      }}
      className={clsx("expore-list__item", isLoading ? "loading" : "")}
      key={record.file_key}
      style={{ aspectRatio: "1", position: "relative" }}
    >
      {isLoading ? (
        <>
          <span className="loading-content">
            <LoadingIcon />
            <span>{seconds.toFixed(1)}</span>
          </span>
          <div className="absolute top-0 right-0 inline-flex items-center rounded-md bg-[#49ff9b] px-2 py-2 text-sm font-medium text-white ring-1 ring-inset ring-gray-500/10">
            Processing
          </div>
        </>
      ) : null}

      {failed ? (
        <div className="absolute top-0 right-0  inline-flex items-center rounded-md bg-red-700  px-2 py-2 text-sm font-medium text-white ring-1 ring-inset ring-red-600/10">
          Failed
        </div>
      ) : null}
      <img
        src={toImageUrl(
          record.result_url && !record.result_url.includes(".mp4")
            ? record.result_url
            : record?.init_media_url ||
                record?.result_thumbnail_url ||
                record?.init_theme_url
        )}
        alt="stabilityworld"
      />
    </div>
  );
};
