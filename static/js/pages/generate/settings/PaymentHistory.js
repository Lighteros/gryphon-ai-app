/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useBalanceHistoryList } from "../../../services/userService";
import "./style.css";
import { toLocalTime } from "../../../utils/timeUtils";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";
import SidebarSettingMobile from "../../../components/SideBar/SidebarSettingMobile";
import withAuth from "../../../context/withAuth";
import { useToggle } from "../../../hooks/useToggle";
import LoadingText from "../../../components/Loading/LoadingText";
const actionText = {
  FACE_SWAP: "AI Image Faceswap",
  IMAGE_TO_IMAGE: "AI Image Style Transfer",
  TEXT_TO_IMAGE: "AI Text To Image",
  IMAGE_TO_VIDEO: "AI Photo To Video",
  SORA_VIDEO: "AI Text To Video",
  ARCHITECT_IMAGE: "AI Architect",
  REFACE_VIDEO: "AI Video Faceswap",
  TEXT_TO_VIDEO: "AI Video Transfer",
  INIT: "Init",
  RESET_DAILY: "Reset daily",
  BONUS_CREDIT: "Bonus credit",
  MISSION: "Mission",
  FACE_DANCE: "Face dance",
  FLUX_GEN: "Flux generation",
  DEPOSIT: "Deposit",
  GIFT: "Gift",
  AIRDROP_MISSION_COMPLETE: "Airdrop mission complete",
};
const pageSize = 10;
const renderColor = (number) => {
  const num = Number(number);
  return num < 0 ? "red" : "#00D42F";
};
const PaymentHistory = () => {
  const [showSidebarSetting, setShowSidebarSetting] = useToggle(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [openTab, setOpenTab] = useState("credit");
  const { data, isLoading } = useBalanceHistoryList({
    page_index: pageIndex,
    page_size: pageSize,
    type: openTab,
  });
  const getText = (item) => {
    if (openTab === "deposit") {
      return item?.status;
    }
    return actionText[item?.action] || item?.action;
  };

  const totalPage = Math.ceil(Number(data?.data?.total_item) / pageSize);
  const changetab = (page) => {
    setPageIndex(1);
    setOpenTab(page);
  };
  return (
    <div className="p-content m-l setting">
      <div style={{ position: "fixed", zIndex: 50, top: 78, left: 0 }}>
        <SidebarSettingMobile
          showSidebarSetting={showSidebarSetting}
          setShowSidebarSetting={setShowSidebarSetting}
        />
      </div>
      <div className="p-content__wrap">
        <Link
          style={{ paddingBottom: 20 }}
          className="back-mobile"
          // to="/setting-full"
          onClick={() => setShowSidebarSetting(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M13 16.25L6.75 10L13 3.75"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p style={{ fontSize: 16, fontWeight: 600 }}>Payment history</p>
        </Link>

        <div
          className="popup-policy"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div
            className="btn-top-mission"
            style={{
              margin: "10px auto",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              className={`btn-child-mission  ${
                openTab === "credit" ? "is-active" : ""
              }`}
              onClick={() => changetab("credit")}
            >
              Main credit history
            </div>
            <div
              className={`btn-child-mission ${
                openTab === "bonus_credit" ? "is-active" : ""
              }`}
              onClick={() => changetab("bonus_credit")}
            >
              Bonus credit history
            </div>
            <div
              className={`btn-child-mission ${
                openTab === "deposit" ? "is-active" : ""
              }`}
              onClick={() => changetab("deposit")}
            >
              Deposit history
            </div>
          </div>
          <div className="popup-policy__box" style={{ padding: 15 }}>
            <table style={{ marginTop: 10, border: "none" }}>
              <thead
                className="title-table-history-payment"
                style={{ backgroundColor: "#1A1A1A", color: "#fff" }}
              >
                <th>Time</th>
                <th>{openTab === "deposit" ? "Status" : "Action"}</th>
                <th>Amount</th>
              </thead>
              {isLoading ? (
                <td colSpan={3}>
                  {" "}
                  <LoadingText />
                </td>
              ) : data?.data?.records?.length === 0 ? (
                <tr>
                  <th
                    style={{ color: "#FFF", textAlign: "center" }}
                    colSpan={3}
                  >
                    Yay! You have not used the credit
                  </th>
                </tr>
              ) : (
                <tbody>
                  {data?.data?.records?.map((item, index) => {
                    const amount =
                      openTab === "deposit"
                        ? item?.amount
                        : item?.balance_change;
                    const text = getText(item);
                    const currency = openTab === "deposit" ? "USD" : "credit";
                    return (
                      <tr className="content-table-history-payment" key={index}>
                        <td style={{ color: "#B3B3B3" }}>
                          {toLocalTime(item?.date_time || item?.create_time)}
                        </td>
                        <td
                          style={{
                            color: "#00D42F",
                          }}
                        >
                          <p
                            style={{
                              background: "rgba(14, 175, 11, 0.10)",
                              width: "fit-content",
                              padding: 8,
                              borderRadius: 4,
                            }}
                          >
                            {text}
                          </p>
                        </td>
                        <td style={{ color: renderColor(amount) }}>
                          {amount} {currency}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>

          <div
            style={{
              marginBottom: 20,
              paddingLeft: 12,
              visibility: isLoading ? "hidden" : "visible",
            }}
          >
            <Pagination
              onPageChange={(p) => {
                setPageIndex(p);
              }}
              pageIndex={pageIndex}
              pageCount={totalPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(PaymentHistory);
