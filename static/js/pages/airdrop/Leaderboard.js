import React, { useState } from "react";

import "./style.css";
import Pagination from "../../components/Pagination";
import { useLeaderBoardList } from "../../services/userService";
import { useUser } from "../../context/AuthContext";
import LoadingText from "../../components/Loading/LoadingText";
import { Link } from "react-router-dom";
import withAuth from "../../context/withAuth";

const pageSize = 20;
const Leaderboard = () => {
  const { user } = useUser();
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    type: "WEEKLY",
    last: false,
    show: false,
    advanced: "This week",
  });

  const { data, isLoading } = useLeaderBoardList({
    page_index: pagination.pageIndex,
    page_size: pageSize,
    type: pagination.type,
    last: pagination.last,
  });

  const totalPage = Math.ceil(Number(data?.data?.total_item) / pageSize) || 1;

  const changetab = (type) => {
    setPagination({
      ...pagination,
      pageIndex: 1,
      type: type,
      last: false,
      show: false,
      advanced: type === "WEEKLY" ? "This week" : "This month",
    });
  };

  const clickChangeWeek = () => {
    setPagination((prev) => ({
      ...prev,
      show: !prev.show,
    }));
  };

  const handleAdvancedClick = (type, isLast) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 1,
      show: !prev.show,
      last: isLast,
      advanced: isLast
        ? type === "MONTHLY"
          ? "Last month"
          : "Last week"
        : type === "WEEKLY"
        ? "This week"
        : "This month",
    }));
  };

  return (
    <div className="p-content m-l">
      <div className="p-content__wrap">
        <Link to="/loyalty-point" className="btn-goback">
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
          <p>Go back</p>
        </Link>
        <h3 className="sec-big">
          Loyalty Point /{" "}
          <span style={{ color: "#808080", fontSize: 16 }}>Leaderboard</span>
        </h3>
        <div className="top-leaderboard" style={{ display: "flex", gap: 10 }}>
          <div style={{ width: "326px" }}>
            <p style={{ color: "#FFF", paddingBottom: 5 }}>Top on</p>
            <div
              className="btn-top-mission"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                gap: 20,
                height: "fit-content",
              }}
            >
              <div
                className={`btn-child-mission ${
                  pagination.type === "WEEKLY" ? "is-active" : ""
                }`}
                onClick={() => changetab("WEEKLY")}
                style={{ padding: "10px 50px" }}
              >
                Weekly
              </div>
              <div
                className={`btn-child-mission ${
                  pagination.type === "MONTHLY" ? "is-active" : ""
                }`}
                onClick={() => changetab("MONTHLY")}
                style={{ padding: "10px 50px" }}
              >
                Monthly
              </div>
            </div>
          </div>
          <div style={{ width: "326px" }}>
            <p style={{ color: "#FFF", paddingBottom: 5 }}>Advanced</p>
            <div
              className={`weekly-info js-show-profile ${
                pagination.show ? "is-active" : ""
              }`}
              onClick={clickChangeWeek}
            >
              <div
                style={{
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  color: "#FFF",
                  paddingLeft: 5,
                }}
              >
                {pagination.advanced}
              </div>
            </div>
            {pagination.show && (
              <div className="weekly" style={{ display: "block", zIndex: 1 }}>
                <div
                  className={`weekly-child ${
                    !pagination.last ? "is-active" : ""
                  }`}
                  onClick={() => handleAdvancedClick(pagination.type, false)}
                >
                  {pagination.type === "WEEKLY" ? "This week" : "This month"}
                </div>
                <div
                  className={`weekly-child ${
                    pagination.last ? "is-active" : ""
                  }`}
                  onClick={() => handleAdvancedClick(pagination.type, true)}
                >
                  {pagination.type === "MONTHLY" ? "Last month" : "Last week"}
                </div>
              </div>
            )}
          </div>
        </div>
        <table
          className="content-table-leaderboard"
          style={{ marginTop: 30, position: "relative" }}
        >
          <thead className="title-table-child-leaderboard">
            <tr>
              <th>Top</th>
              <th>Friend</th>
              <th>Point achieved</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3}>
                  <LoadingText />
                </td>
              </tr>
            ) : data?.total_item === 0 ? (
              <tr>
                <th style={{ color: "#FFF", textAlign: "center" }} colSpan={3}>
                  Yay! You have seen it all
                </th>
              </tr>
            ) : (
              data?.data?.records?.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    background:
                      item?.User?.code === user?.code ? "#3A3E46" : "",
                  }}
                >
                  <td>{item?.rank}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <p>
                        {item?.User?.code === user?.code
                          ? "You"
                          : item?.User?.code}
                      </p>
                    </div>
                  </td>
                  <td>{item?.point_archieved}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div
          style={{
            margin: "20px 0px",
            paddingLeft: 12,
            visibility: isLoading ? "hidden" : "visible",
          }}
        >
          <Pagination
            onPageChange={(p) =>
              setPagination((prev) => ({ ...prev, pageIndex: p }))
            }
            pageIndex={pagination.pageIndex}
            pageCount={totalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Leaderboard);
