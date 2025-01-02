import React from "react";
import withAuth from "../../context/withAuth";
import AirdropSectionItem from "../../components/AirDrop/AirdropSectionItem";
import { useUser } from "../../context/AuthContext";
import { copyText, generateRefLink } from "../../utils";
import { useRefferalInfo } from "../../services/userService";
import { Link } from "react-router-dom";
import InviteList from "./InviteList";
import { config } from "../../config";

const InviteFriends = () => {
  const { user } = useUser();
  const refLink = generateRefLink(user?.ref_code);
  const { data } = useRefferalInfo({
    credit_received: 0,
    account_created: 0,
    app_download: 0,
    directly_referred_friends: 0,
    indirectly_referred_friends: 0,
    directly_rate: 0,
    indirectly_rate: 0,
  });
  const dataRef = data?.data;
  const isCheckTeleApp = config.IS_MINIAPP;
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
          <span style={{ color: "#808080", fontSize: 16 }}>Invite friends</span>
        </h3>
        <div className="airdrop-sec">
          {isCheckTeleApp ? (
            <div className="airdrop-sec__right-referral">
              <div className="referral">
                <div>
                  {" "}
                  <h6 className="note">Invite friends</h6>
                  <h6 className="link">{refLink}</h6>
                </div>
                <div
                  className="btn"
                  style={{ cursor: "pointer", minWidth: "5rem" }}
                  onClick={() => copyText(refLink)}
                >
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
                </div>
              </div>
            </div>
          ) : (
            <div className="airdrop-sec__left">
              <div style={{ width: "100%" }}>
                <div className="ttl">Invite friend’s rules</div>
                <ul>
                  <li className="note">
                    When someone signs up using your link and starts using
                    Credits on Heaven World AI (e.g., generating AI artwork,
                    using Text to Video feature, ...), they become your referred
                    user. Get 10% Bonus You’ll earn 10% of the Loyalty Points
                    they accumulate for every Credit they spend. 2nd Level
                    Earnings If your referrals invite others, you’ll also earn
                    5% of the Loyalty Points from those users.
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="airdrop-sec__right ">
            <div className="airdrop-sec__right-referral">
              <AirdropSectionItem
                title="Directly referred friends"
                note={`Receive ${dataRef?.directly_rate * 100}% point`}
                isBool={dataRef?.directly_referred_friends > 0}
                Icon={
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.625 10.625H19.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 8.75V12.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.4375 12.5C11.0263 12.5 13.125 10.4013 13.125 7.8125C13.125 5.22367 11.0263 3.125 8.4375 3.125C5.84867 3.125 3.75 5.22367 3.75 7.8125C3.75 10.4013 5.84867 12.5 8.4375 12.5Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M1.73438 15.625C2.55567 14.6461 3.58138 13.859 4.73942 13.319C5.89746 12.779 7.15973 12.4991 8.4375 12.4991C9.71527 12.4991 10.9775 12.779 12.1356 13.319C13.2936 13.859 14.3193 14.6461 15.1406 15.625"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <AirdropSectionItem
                title="Indirectly referred friends"
                isBool={dataRef?.indirectly_referred_friends > 0}
                note={`Receive ${dataRef?.indirectly_rate * 100}% point`}
                Icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 12.5C11.7259 12.5 13.125 11.1009 13.125 9.375C13.125 7.64911 11.7259 6.25 10 6.25C8.27411 6.25 6.875 7.64911 6.875 9.375C6.875 11.1009 8.27411 12.5 10 12.5Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M4.98438 15.5781C5.45462 14.6519 6.17216 13.874 7.05745 13.3306C7.94275 12.7872 8.96123 12.4995 10 12.4995C11.0388 12.4995 12.0572 12.7872 12.9425 13.3306C13.8278 13.874 14.5454 14.6519 15.0156 15.5781"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.75 4.375H17.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.625 2.5V6.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.4063 8.82033C17.4694 9.21037 17.5008 9.60489 17.5 10C17.5 11.4834 17.0601 12.9334 16.236 14.1668C15.4119 15.4002 14.2406 16.3615 12.8701 16.9291C11.4997 17.4968 9.99168 17.6453 8.53683 17.3559C7.08197 17.0665 5.7456 16.3522 4.6967 15.3033C3.64781 14.2544 2.9335 12.918 2.64411 11.4632C2.35472 10.0083 2.50325 8.50033 3.07091 7.12989C3.63856 5.75944 4.59986 4.5881 5.83323 3.76399C7.0666 2.93988 8.51664 2.50001 10 2.50001C10.3951 2.49924 10.7897 2.53059 11.1797 2.59376"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
            </div>

            <div className="airdrop-sec__right-referral">
              <div className="referred">
                <div className="">
                  <h5 className="number text-center">
                    {dataRef?.directly_referred_friends}
                  </h5>
                  <h6 className="note text-center">
                    Directly referred friends
                  </h6>
                </div>
                <svg
                  style={{ strokeWidth: "1px", stroke: "#FFF" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="2"
                  height="34"
                  viewBox="0 0 2 34"
                  fill="none"
                >
                  <path
                    d="M1 1L0.999998 33"
                    stroke="white"
                    strokeLinecap="round"
                  />
                </svg>
                <div>
                  <h5 className="number text-center">
                    {dataRef?.indirectly_referred_friends}
                  </h5>
                  <h6 className="note text-center">
                    Indirectly referred friends
                  </h6>
                </div>
              </div>
              {isCheckTeleApp ? null : (
                <div className="referral">
                  <div>
                    {" "}
                    <h6 className="note">Referral link</h6>
                    <h6 className="link">{refLink}</h6>
                  </div>
                  <div
                    className=""
                    style={{ cursor: "pointer" }}
                    onClick={() => copyText(refLink)}
                  >
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
                  </div>
                </div>
              )}
            </div>
          </div>
          {isCheckTeleApp ? <InviteList /> : null}
        </div>
      </div>
    </div>
  );
};
export default withAuth(InviteFriends);
