/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import userService from "../../../services/userService";
import Pagination from "../../../components/Pagination";
import { copyText, generateRefLink } from "../../../utils";
import SidebarSettingMobile from "../../../components/SideBar/SidebarSettingMobile";
import { Link } from "react-router-dom";
import withAuth from "../../../context/withAuth";
import { useToggle } from "../../../hooks/useToggle";
import LoadingText from "../../../components/Loading/LoadingText";
const SettingInvite = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    data: null,
    referralList: null,
    pageIndex: 1,
    indirectly: false,
    tabIndirectly: false,
  });
  const [showSidebarSetting, setShowSidebarSetting] = useToggle(false);
  const pageSize = 10;
  const totalPage = Math.ceil(
    Number(state.referralList?.total_item) / pageSize
  );
  useEffect(() => {
    userService.getReferral().then((res) => {
      setState((e) => ({
        ...e,
        data: res.data,
      }));
    });
    // commonService.getReferral().then((res) => {
    //   setReward(res.data?.credit_register_for_f1)
    // })
  }, []);
  const changeTabIndirectly = () => {
    setState((e) => ({
      ...e,
      indirectly: !e.indirectly,
      tabIndirectly: !e.tabIndirectly,
    }));
  };
  useEffect(() => {
    setIsLoading(true);
    userService
      .getReferralList(pageSize, state.pageIndex, state.indirectly)
      .then((res) => {
        setState((e) => ({
          ...e,
          referralList: res?.data,
        }));
        setIsLoading(false);
      });
  }, [state.pageIndex, state.indirectly]);

  const refLink = generateRefLink(user?.ref_code);

  return (
    <div className="p-content m-l setting" style={{ padding: 0 }}>
      <div style={{ position: "fixed", zIndex: 50, top: 78, left: 0 }}>
        <SidebarSettingMobile
          showSidebarSetting={showSidebarSetting}
          setShowSidebarSetting={setShowSidebarSetting}
        />
      </div>
      <div className="p-content__wrap">
        {/* <ImagePopup /> */}
        <Link
          style={{ paddingTop: 20, paddingLeft: 20 }}
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
          <p style={{ fontSize: 16, fontWeight: 600 }}>Referral program</p>
        </Link>
        <div
          className="popup-policy"
          style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 }}
        >
          <div className="popup-policy__box" style={{ flex: 1 }}>
            <div
              className="setting-invite"
              style={{
                paddingBottom: "70px",
                borderRight: "1px solid rgba(255, 255, 255, 0.10)",
                height: "100%",
                alignItems: "start",
                padding: 10,
              }}
            >
              {/* <p className="setting-invite__image">
                  <img src={imageInvite} alt="images" />
                </p> */}

              <p className="setting-invite__ttl">
                Referral Program
                <br />
                Invite friends, Generate & Earn Loyalty Point
              </p>
              <span className="setting-invite__token">Point</span>
              <p className="setting-invite__txt">
                When your friend signs up for an account using your referral
                link, you will receive points based on the credits they use.
              </p>
              <div className="setting-invite__info">
                {/* <div className="item">
       <p className="ttl">06</p>
       <p className="txt">
         App
         <br />
         downloaded
       </p>
     </div> */}
                <div className="item bright">
                  <p className="ttl">{state.data?.account_created || 0}</p>
                  <p className="txt">
                    Account
                    <br />
                    created
                  </p>
                </div>
                <div className="item">
                  <p className="ttl">{state.data?.credit_received || 0}</p>
                  <p className="txt">
                    Point
                    <br />
                    received
                  </p>
                </div>
              </div>
              <p
                className="setting-invite__code"
                style={{
                  marginTop: 8,
                  minWidth: 0,
                  width: "100%",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                <p style={{ wordBreak: "break-word" }}>{refLink}</p>

                <span className="copy" onClick={() => copyText(refLink)}>
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
              
            </div>
          </div>

          <div
            className="invited-friends"
            style={{ flex: 1, padding: "50px 10px" }}
          >
            <h3>Referral Tracking</h3>
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
                  !state.tabIndirectly ? "is-active" : ""
                }`}
                onClick={changeTabIndirectly}
                // style={{ padding: '10px 50px' }}
              >
                Direct invitation
              </div>
              <div
                className={`btn-child-mission ${
                  state.tabIndirectly ? "is-active" : ""
                }`}
                onClick={changeTabIndirectly}
                // style={{ padding: '10px 50px' }}
              >
                Indirect invitation
              </div>
            </div>
            <div className="content-table-friend">
              <div
                className="title-table-child"
                style={{ backgroundColor: "#1A1A1A" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    gap: 30,
                  }}
                >
                  <div>No.</div>
                  <div>Friend </div>
                </div>
                <div>Point</div>
              </div>
              {isLoading ? (
                <div style={{ paddingTop: 20 }}>
                  {" "}
                  <LoadingText />
                </div>
              ) : state.referralList?.total_item == 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#000",
                    width: "100%",
                    marginTop: 15,
                  }}
                >
                  <b>Yay! You have seen it all</b>
                </p>
              ) : (
                state.referralList?.records?.map((item, index) => {
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
                        <div style={{ color: " #B3B3B3" }}>{index + 1}</div>
                        <div>{item.code} </div>
                      </div>
                      <div style={{ color: "#F33516" }}>
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
                  setState((e) => ({
                    ...e,
                    pageIndex: p,
                  }));
                }}
                pageCount={totalPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(SettingInvite);
