import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import withAuth from "../../../context/withAuth";
import { toImageUrl } from "../../../utils/file";
import { APP_ROUTE, AppRoute } from "../../../routes/link";
import InfinityScrollPage from "../../../components/Shared/InfinityScrollPage";

import "./style.css";
import Skeleton from "../../../components/Skeleton";
import { useModal } from "../../../context/modalContext";
import { Icons } from "../../../constant/icon";
import {
  useMediaDeleteMulti,
  useMediaList,
} from "../../../services/mediaService";
import usePageData from "../../../hooks/usePageData";

import { FaTrash } from "react-icons/fa";
import confirmAlert from "../../../lib/confirmAlert";
import LoadingIcon from "../../../components/Ui/LoadingIcon";
import clsx from "clsx";

const HistotyList = () => {
  let { tab } = useParams();
  const [showProfile, setShowProfile] = useState(false);
  const [ids, setIds] = useState([]);
  const [nameTab, setNameTab] = useState({
    name: "All",
    icon: Icons.icon_text2img,
  });
  useEffect(() => {
    if (!tab) return;
    const tabSelected = Object.keys(APP_ROUTE).filter((k) => {
      return APP_ROUTE[k].routeName === tab;
    });
    if (tabSelected.length && APP_ROUTE[tabSelected.at(0)])
      setNameTab({
        name: APP_ROUTE[tabSelected.at(0)].name,
        icon: APP_ROUTE[tabSelected.at(0)].icon,
      });
  }, [tab]);
  const { mutate, isPending } = useMediaDeleteMulti();
  tab = tab ? tab : "all";
  return (
    <div className="p-content m-l">
      <div className="p-content__wrap">
        <div className="history-menu" style={{ marginBottom: 12 }}>
          <div
          >
          </div>

          {ids.length ? (
            <div
              className="btn-delete"
              onClick={(e) => {
                e.stopPropagation();
                confirmAlert({
                  isLoading: isPending,
                  onClick: (close) => {
                    mutate(
                      { ids },
                      {
                        onSuccess: close,
                      }
                    );
                    setIds([]);
                  },
                });
              }}
            >
              <p>Delete</p>
              <FaTrash />
            </div>
          ) : null}
          <h5
            style={{
              color: "#49ff9b",
              textAlign: "left",
              fontSize: 12,
              fontStyle: "italic",
              whiteSpace: "pre-wrap",
            }}
          >
            Images and videos will be stored by us for 7 days. After that, they
            will be deleted.
          </h5>
        </div>

        <Content tab={tab} key={tab} setIds={setIds} ids={ids} />
      </div>
    </div>
  );
};

export default withAuth(HistotyList);

const skeleton = Array.from({ length: 12 }, (_, index) => index + 1);
export const Content = ({ tab, setIds, ids }) => {
  const { openModal } = useModal();
  const { fetchNextPage, isLoading, data, isFetching, hasNextPage } =
    useMediaList({
      page_index: 1,
      page_size: 26,
      service_id: AppRoute.getByRoute(tab)?.id,
    });

  const { dataList } = usePageData(data);
  const handleCheckboxChange = (fileKey) => {
    if (ids.includes(fileKey)) {
      setIds(ids.filter((id) => id !== fileKey));
    } else {
      setIds([...ids, fileKey]);
    }
  };

  return (
    <div className="history" style={{ minHeight: "90vh" }}>
      {isLoading ? (
        <div className="expore-list">
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
        <InfinityScrollPage
          length={dataList.length}
          hasMore={hasNextPage}
          className="expore-list"
          Loader={() =>
            skeleton.map((i) => {
              return (
                <Skeleton
                  className="expore-list__item"
                  key={i}
                  style={{ aspectRatio: 1 }}
                />
              );
            })
          }
          fetchData={fetchNextPage}
          useEndMessage={false}
        >
          {dataList?.map((record) => {
            const {
              status,
              file_key,
              result_url,
              init_img,
              service_id,
              options,
              init_media_url,
              result_thumbnail_url,
              init_theme_url,
            } = record;
            const isProcessing = status === "PROCESSING";
            const failed = status === "FAILED";
            const loading = isProcessing || status === "NEW";
            return (
              <div
                onClick={() => {
                  openModal("result", {
                    file_key: file_key,
                    result_url: result_url,
                    status: status,
                    init_img: init_img,
                    service_id: service_id,
                    options: options,
                  });
                }}
                className={clsx("expore-list__item", loading ? "loading" : "")}
                key={file_key}
                style={{ aspectRatio: "1", position: "relative" }}
              >
                {loading ? (
                  <>
                    <span className="loading-content">
                      <LoadingIcon />
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
                    result_url && !result_url.includes(".mp4")
                      ? result_url
                      : init_media_url || result_thumbnail_url || init_theme_url
                  )}
                  alt="stabilityworld"
                />
                {loading || failed ? null : (
                  <label
                    className="swap-policy"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      cursor: "pointer",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={ids.includes(file_key)}
                      onChange={() => {
                        handleCheckboxChange(file_key);
                      }}
                    />
                    <span
                      className="check"
                      style={{
                        borderColor: "#01c7cc",
                        width: "2.4rem",
                        height: "2.4rem",
                      }}
                    ></span>
                  </label>
                )}
              </div>
            );
          })}
        </InfinityScrollPage>
      ) : (
        <div className="container" style={{ zIndex: 10 }}>
          <div className="p-404__box">
            <img
              src="/assets/images/img_history_empty.png"
              alt="404"
              style={{ paddingBottom: 10 }}
            />
            <h2
              className="text-[#0051dd] text-3xl"
              style={{ paddingBottom: 10 }}
            >
              {" "}
              It’s seems like your gallery is empty
            </h2>
            <p className="p-404__txt">Create something new with our AI?</p>
            <Link
              to={`/${tab === "all" ? (tab = "instant-art-creator") : tab}`}
              className="popup-form__btn"
            >
              Create new artwork
            </Link>
          </div>
        </div>
      )}
      {!hasNextPage && (
        <>
          <p
            style={{
              textAlign: "center",
              color: "white",
              width: "100%",
              marginTop: 10,
            }}
          >
            <b>Yay! You have seen it all</b>
          </p>
        </>
      )}

      <div className="expore-list"></div>
    </div>
  );
};
