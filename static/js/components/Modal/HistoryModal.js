import React, { useEffect, useState } from "react";

import usePageable from "../../hooks/usePageable";
import InfinityScrollPage from "../Shared/InfinityScrollPage";
import { FaRegCopy } from "react-icons/fa6";
import { TiTick, TiTickOutline } from "react-icons/ti";
import { copyText } from "../../utils";

import { AppRoute } from "../../routes/link";
import mediaService from "../../services/mediaService";
const HistoryModal = ({ onSelect, type, onClose }) => {
  const [data, setData] = useState([]);
  const {
    page_index,
    page_size,
    hasNextPage,
    setPaging,
    toggleFetchingNextPage,
    setLoading,
    isLoading,
  } = usePageable(50);
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [type]);

  const fetchData = () => {
    const k = AppRoute.getByRoute(type);
    mediaService
      .promptHistory({
        page_index,
        page_size,
        service_id: k?.id,
      })
      .then((data) => {
        setData((x) => [...x, ...data.data.records.filter((x) => !!x.prompt)]);
        setPaging(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="popup active" id="popup" style={{ minWidth: "40vw" }}>
      <div className="popup__body" id="popup-body" style={{ width: "100%" }}>
        <div
          className="p-content"
          style={{
            position: "relative",
            display: "flex",
            minHeight: "auto",
            flexDirection: "column",
            color: "white",
            background: "#000",

            padding: 12,
          }}
        >
          <div
            className="popup__close js-close-popup"
            onClick={() => onClose()}
          ></div>
          <h3 style={{ paddingBottom: "20px" }}>Prompt History</h3>
          <InfinityScrollPage
            scrollableTarget="popup-body"
            length={data.length}
            hasMore={hasNextPage}
            fetchData={fetchData}
          >
            {data.map((item, index) => {
              return (
                <div key={index}>
                  <li
                    style={{
                      listStyleType: "none",

                      width: "100%",
                      textAlign: "start",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      color: "#fff",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      padding: 5,
                    }}
                  >
                    <div
                      onClick={() => onSelect(item)}
                      style={{
                        padding: 8,
                        flex: 1,
                        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {item.prompt}
                    </div>{" "}
                    <div
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <span style={style} onClick={() => copyText(item.prompt)}>
                        <FaRegCopy />
                      </span>
                      <span
                        style={{ ...style }}
                        onClick={() => {
                          onSelect(item);
                        }}
                      >
                        <TiTick />
                      </span>
                    </div>
                  </li>
                </div>
              );
            })}
          </InfinityScrollPage>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
export const style = {
  padding: 8,
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: 9999,
};
