import Pagination from "../../components/Pagination";

import { useState } from "react";
import { useRefferalList } from "../../services/userService";
import LoadingText from "../../components/Loading/LoadingText";
const InviteList = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [indirectly, setIndirectly] = useState(false);
  const [tabIndirectly, setTabIndirectly] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const pageSize = 10;

  const { data: listData, isLoading } = useRefferalList({
    page_index: pageIndex,
    page_size: pageSize,
    indirectly,
  });
  const totalPage = Math.ceil(Number(listData?.data?.total_item) / pageSize);

  const changeTabIndirectly = () => {
    setTabIndirectly(!tabIndirectly);
    setIndirectly(!indirectly);
  };

  return (
    <div
      className="popup-policy"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginTop: 40,
      }}
    >
      <div className="invited-friends">
        <div
          className="btn-top-mission"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            gap: 20,
            height: "fit-content",
          }}
        >
          <div
            className={`btn-child-mission ${!tabIndirectly ? "is-active" : ""}`}
            onClick={changeTabIndirectly}
            // style={{ padding: '10px 50px' }}
          >
            Direct invitation
          </div>
          <div
            className={`btn-child-mission ${tabIndirectly ? "is-active" : ""}`}
            onClick={changeTabIndirectly}
            // style={{ padding: '10px 50px' }}
          >
            Indirect invitation
          </div>
        </div>
        <div className="content-table-friend">
          <div
            className="title-table-child"
            style={{ background: " #1A1A1A  ", color: "#FFF" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 30,
              }}
            >
              <div style={{ paddingRight: 10 }}>No.</div>
              <div>Friend </div>
            </div>
            <div className="total_credit">Points</div>
          </div>
          {isLoading ? (
            <div style={{ paddingTop: 20 }}>
              {" "}
              <LoadingText />
            </div>
          ) : listData?.data?.total_item == 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#FFF",
                width: "100%",
                marginTop: 15,
              }}
            >
              <b>Yay! You have seen it all</b>
            </p>
          ) : (
            listData?.data?.records?.map((item, index) => {
              return (
                <div className="main-content" key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 30,
                    }}
                  >
                    <div style={{ color: " #B3B3B3", paddingRight: 20 }}>
                      {index + 1}
                    </div>
                    <div style={{ color: " #FFF" }}>{item.code} </div>
                  </div>
                  <div className="total_credit" style={{ color: "#FFF" }}>
                    {item.total_credit.slice(0, 6)}
                  </div>
                </div>
              );
            })
          )}
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
            pageCount={totalPage}
          />
        </div>
      </div>
    </div>
  );
};
export default InviteList;
