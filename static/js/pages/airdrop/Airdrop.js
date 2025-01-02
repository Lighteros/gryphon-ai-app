import React from "react";
import withAuth from "../../context/withAuth";
import AirdropSectionItem from "../../components/AirDrop/AirdropSectionItem";

import { useNavigate } from "react-router-dom";
import { useLeaderBoardInfo } from "../../services/userService";
import InviteList from "./InviteList";

import { Icons } from "../../constant/icon";
import { useUser } from "../../context/AuthContext";
import useWalletConnect from "../../hooks/useWalletConnect";
import { useClaim } from "../../hooks/useContract";
import Button from "../../components/Ui/Button";
import { config } from "../../config";
const Airdrop = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    connectWallet,
    address,
    isLoading,
    isUserConnected,
    isConnected,
    chainId,
    disconnectWallet,
  } = useWalletConnect();

  const { handler, isPending: isPendingClaim } = useClaim();
  const { data } = useLeaderBoardInfo({
    rank_weekly: 0,
    rank_monthly: 0,
    point: 0,
  });
  const handleClaim = () => {
    // mutate();
    handler();
  };

  return (
    <div className="p-content m-l h-vh">
      <div className="p-content__wrap">
        <h3 className="sec-big">Loyalty Point</h3>
        <div className="airdrop-sec">
          <div className="airdrop-sec__left">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="ttl">Your Point</div>
                <h3 className="number">{data?.data?.point}</h3>
              </div>
              <img
                src={Icons.arrow}
                alt="Arrow"
                style={{ paddingTop: 30, marginLeft: 20 }}
              />
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="ttl " style={{ color: "#0051dd" }}>
                  HVN
                </div>
                <h3 className="number" style={{ color: "#0051dd" }}>
                  ???
                </h3>
              </div>
            </div>
            {config.UNLOCK_COMMINGSOON ? (
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="ttl " style={{ color: "#0051dd" }}>
                  Your HVN token
                </div>
                <h3 className="number" style={{ color: "#0051dd" }}>
                  {user?.aiw_token}
                </h3>
              </div>
            ) : null}
            {config.UNLOCK_COMMINGSOON ? (
              isConnected && isUserConnected ? (
                <>
                  <Button
                    loading={isPendingClaim}
                    onClick={handleClaim}
                    style={{ marginBottom: 0 }}
                  >
                    Claim
                  </Button>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <span
                      className="setting-list__ttl"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={user?.wallet_address}
                    >
                      {address?.substring(0, 6) + "..." + address?.slice(-6)}
                    </span>
                    <Button
                      onClick={disconnectWallet}
                      style={{ marginBottom: 0, padding: "5px 10px" }}
                    >
                      Disconnect
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    loading={isLoading}
                    onClick={connectWallet}
                    style={{ marginBottom: 0 }}
                  >
                    Connect Wallet
                  </Button>
                  <span>Please connect your wallet</span>
                </>
              )
            ) : null}

            <hr className="border" />
            <div style={{ width: "100%" }}>
              <div className="ttl" style={{ textAlign: "center" }}>
                Rank on leaderboard
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  textAlign: "center",
                }}
              >
                <div>
                  <h3 className="number">{data?.data?.rank_weekly}</h3>
                  <p>Weekly</p>
                </div>
                <div>
                  <h3 className="number">{data?.data?.rank_monthly}</h3>
                  <p>Monthly</p>
                </div>
              </div>
            </div>
          </div>
          <div className="airdrop-sec__right">
            {/* <AirdropSectionItem
              title="Daily missions"
              note="Mission reset daily"
              onClick={() => navigate('/airdrop/daily-mission')}
              Icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.25 3.125H3.75C3.40482 3.125 3.125 3.40482 3.125 3.75V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V3.75C16.875 3.40482 16.5952 3.125 16.25 3.125Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.75 1.875V4.375"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.25 1.875V4.375"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.125 6.875H16.875"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.8125 10L9.16406 13.4375L7.1875 11.5625"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            /> */}
            <AirdropSectionItem
              onClick={() => navigate("/loyalty-point/invite-friend")}
              title="Invite friends"
              note="Users are entitled to point  according to the number of credits used to create point used by friends"
              Icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6.875 12.5C9.11866 12.5 10.9375 10.6812 10.9375 8.4375C10.9375 6.19384 9.11866 4.375 6.875 4.375C4.63134 4.375 2.8125 6.19384 2.8125 8.4375C2.8125 10.6812 4.63134 12.5 6.875 12.5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M12.1406 4.52344C12.4997 4.42604 12.8701 4.37613 13.2422 4.375C14.3196 4.375 15.3529 4.80301 16.1148 5.56488C16.8767 6.32675 17.3047 7.36006 17.3047 8.4375C17.3047 9.51494 16.8767 10.5483 16.1148 11.3101C15.3529 12.072 14.3196 12.5 13.2422 12.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.25 15.4219C1.88433 14.5192 2.72659 13.7825 3.70563 13.2738C4.68467 12.7652 5.77173 12.4997 6.875 12.4997C7.97827 12.4997 9.06533 12.7652 10.0444 13.2738C11.0234 13.7825 11.8657 14.5192 12.5 15.4219"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.2422 12.5C14.3455 12.4993 15.4328 12.7645 16.412 13.2731C17.3911 13.7817 18.2333 14.5188 18.8672 15.4219"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            {/* <AirdropSectionItem
              onClick={() => openModal('airdrop-missions')}
              title="Social missions"
              note="Sharing tasks on social networks"
              Icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.02359 13.9766C5.51033 13.4639 5.1017 12.8562 4.82046 12.1875C4.5265 11.4957 4.375 10.7517 4.375 10C4.375 9.24831 4.5265 8.50433 4.82046 7.8125C5.1017 7.14377 5.51033 6.53613 6.02359 6.02344"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.9766 6.02344C14.4898 6.53613 14.8985 7.14377 15.1797 7.8125C15.4736 8.50433 15.6251 9.24831 15.6251 10C15.6251 10.7517 15.4736 11.4957 15.1797 12.1875C14.8985 12.8562 14.4898 13.4639 13.9766 13.9766"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.81256 16.1875C3.01541 15.3889 2.37891 14.4447 1.93756 13.4063C1.48376 12.328 1.25 11.1699 1.25 10C1.25 8.83012 1.48376 7.67203 1.93756 6.59375C2.37891 5.55527 3.01541 4.61112 3.81256 3.8125"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.1875 3.8125C16.9846 4.61112 17.6212 5.55527 18.0625 6.59375C18.5163 7.67203 18.7501 8.83012 18.7501 10C18.7501 11.1699 18.5163 12.328 18.0625 13.4063C17.6212 14.4447 16.9846 15.3889 16.1875 16.1875"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            /> */}
            <AirdropSectionItem
              title="View Leaderboard"
              onClick={() => navigate("/loyalty-point/leaderboard")}
              Icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.02773 3.40273C4.28559 3.14487 4.63533 3 5 3H15C15.3647 3 15.7144 3.14487 15.9723 3.40273C16.2301 3.66059 16.375 4.01033 16.375 4.375V4.875H18.125C18.4897 4.875 18.8394 5.01987 19.0973 5.27773C19.3551 5.53559 19.5 5.88533 19.5 6.25V7.5C19.5 8.36195 19.1576 9.1886 18.5481 9.7981C17.9386 10.4076 17.112 10.75 16.25 10.75H16.0532C16.0031 10.9018 15.9471 11.0518 15.8855 11.1999C15.5624 11.9762 15.0889 12.681 14.4922 13.2735C13.8955 13.8661 13.1875 14.3347 12.4089 14.6525C11.8766 14.8697 11.3185 15.0135 10.75 15.0809V16.75H12.5C12.9142 16.75 13.25 17.0858 13.25 17.5C13.25 17.9142 12.9142 18.25 12.5 18.25H10H7.5C7.08579 18.25 6.75 17.9142 6.75 17.5C6.75 17.0858 7.08579 16.75 7.5 16.75H9.25V15.0806C6.76771 14.7848 4.7395 13.047 3.96415 10.75H3.74219C2.88023 10.75 2.05358 10.4076 1.44409 9.7981C0.834597 9.1886 0.492188 8.36195 0.492188 7.5V6.25C0.492188 5.88533 0.637053 5.53559 0.894916 5.27773C1.15278 5.01987 1.50251 4.875 1.86719 4.875H3.625V4.375C3.625 4.01033 3.76987 3.66059 4.02773 3.40273ZM3.625 6.375H1.99219V7.5C1.99219 7.96413 2.17656 8.40925 2.50475 8.73744C2.81108 9.04377 3.21929 9.2248 3.64974 9.24756C3.63336 9.06026 3.625 8.87085 3.625 8.67969V6.375ZM5.27275 9.88674C5.26659 9.84601 5.25714 9.80636 5.2447 9.76805C5.16635 9.41743 5.125 9.05312 5.125 8.67969V4.5H14.875V5.625V8.75V8.75002C14.875 9.11022 14.8351 9.46844 14.7566 9.81821C14.7542 9.82785 14.7519 9.83756 14.7499 9.84734C14.6888 10.1119 14.6055 10.3716 14.5007 10.6235C14.2536 11.2171 13.8915 11.7561 13.4352 12.2092C12.9789 12.6623 12.4375 13.0207 11.8421 13.2637C11.2613 13.5007 10.6404 13.6234 10.0134 13.6251L10 13.625L9.98662 13.6251L9.9666 13.625C7.70072 13.6079 5.8032 12.0132 5.27275 9.88674ZM16.375 8.75C16.375 8.91605 16.3685 9.08178 16.3556 9.24681C16.7812 9.22109 17.1842 9.04064 17.4874 8.73744C17.8156 8.40925 18 7.96413 18 7.5V6.375H16.375V8.74998V8.75Z"
                    fill="white"
                  />
                </svg>
              }
            />
          </div>
        </div>
        <InviteList />
      </div>
    </div>
  );
};
export default withAuth(Airdrop);
