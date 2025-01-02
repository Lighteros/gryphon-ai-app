import React from "react";
import { Link, useLocation } from "react-router-dom";
import FadeIn, { FadeInHeader } from "../Animated/FadeIn";
import { config } from "../../config";

const SideBarSetting = ({ openSidebar }) => {
  const location = useLocation();

  return (
    <FadeIn
      index={1}
      direction="x"
      className="sidebar-setting"
      style={{ display: openSidebar ? "flex" : "none" }}
    >
      <div>
        <p className="sidebar__ttl">SETTINGS</p>
        <ul className="sidebar-list">
          <li className="sidebar-list__item">
            <Link
              to="/setting-full"
              className={
                location.pathname === "/setting-full" ? "is-active" : " "
              }
              style={{ display: "flex", gap: 5 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
                  stroke="white"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1.9375 13.5006C2.55184 12.4363 3.43552 11.5525 4.49972 10.938C5.56392 10.3235 6.77113 10 8 10C9.22887 10 10.4361 10.3235 11.5003 10.938C12.5645 11.5525 13.4482 12.4363 14.0625 13.5006"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Profile information
            </Link>
          </li>
          <li className="sidebar-list__item">
            <Link
              to="/setting-full/referral-program"
              className={
                location.pathname === "/setting-full/referral-program"
                  ? "is-active"
                  : " "
              }
              style={{ display: "flex", gap: 5 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
                  strokeMiterlimit="10"
                  stroke="white"
                />
                <path
                  d="M1.9375 13.5006C2.55184 12.4363 3.43552 11.5525 4.49972 10.938C5.56392 10.3235 6.77113 10 8 10C9.22887 10 10.4361 10.3235 11.5003 10.938C12.5645 11.5525 13.4482 12.4363 14.0625 13.5006"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="white"
                />
              </svg>
              Referral program
            </Link>
          </li>
          <li className="sidebar-list__item coming-soon">
            <Link
              to="/setting-full/connect-wallet"
              className={
                location.pathname === "/setting-full/connect-wallet"
                  ? "is-active"
                  : " "
              }
              style={{ display: "flex", gap: 5 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 4V12C2.5 12.2652 2.60536 12.5196 2.79289 12.7071C2.98043 12.8946 3.23478 13 3.5 13H13.5C13.6326 13 13.7598 12.9473 13.8536 12.8536C13.9473 12.7598 14 12.6326 14 12.5V5.5C14 5.36739 13.9473 5.24021 13.8536 5.14645C13.7598 5.05268 13.6326 5 13.5 5H3.5C3.23478 5 2.98043 4.89464 2.79289 4.70711C2.60536 4.51957 2.5 4.26522 2.5 4ZM2.5 4C2.5 3.73478 2.60536 3.48043 2.79289 3.29289C2.98043 3.10536 3.23478 3 3.5 3H12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="white"
                />
                <path
                  d="M11.5 9C11.5 9.13807 11.3881 9.25 11.25 9.25C11.1119 9.25 11 9.13807 11 9C11 8.86193 11.1119 8.75 11.25 8.75C11.3881 8.75 11.5 8.86193 11.5 9Z"
                  fill="black"
                  stroke="white"
                />
              </svg>
              Connect Wallet
            </Link>
          </li>
          {config.IS_MINIAPP ? null : (
            <li className="sidebar-list__item coming-soon">
              <Link
                to="/setting-full/link-social-network"
                className={
                  location.pathname === "/setting-full/link-social-network"
                    ? "is-active"
                    : " "
                }
                style={{ display: "flex", gap: 5 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.88086 10.1187L10.1184 5.875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="white"
                  />
                  <path
                    d="M9.06328 11.1812L7.29453 12.95C7.01589 13.2286 6.68508 13.4497 6.32101 13.6005C5.95694 13.7513 5.56673 13.8289 5.17266 13.8289C4.3768 13.8289 3.61354 13.5128 3.05078 12.95C2.48803 12.3872 2.17188 11.624 2.17188 10.8281C2.17188 10.0323 2.48803 9.26901 3.05078 8.70625L4.81953 6.9375"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="white"
                  />
                  <path
                    d="M11.1812 9.06328L12.95 7.29453C13.5128 6.73178 13.8289 5.96852 13.8289 5.17266C13.8289 4.3768 13.5128 3.61354 12.95 3.05078C12.3872 2.48803 11.624 2.17188 10.8281 2.17188C10.0323 2.17188 9.26901 2.48803 8.70625 3.05078L6.9375 4.81953"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="white"
                  />
                </svg>
                Link social network
              </Link>
            </li>
          )}
          <li className="sidebar-list__item coming-soon">
            <Link
              to="/setting-full/payment-history"
              className={
                location.pathname === "/setting-full/payment-history"
                  ? "is-active"
                  : " "
              }
              style={{ display: "flex", gap: 5 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="white"
                  d="M14.5 4H1.5C1.22386 4 1 4.22386 1 4.5V11.5C1 11.7761 1.22386 12 1.5 12H14.5C14.7761 12 15 11.7761 15 11.5V4.5C15 4.22386 14.7761 4 14.5 4Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  stroke="white"
                  d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 4L15 7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 12L15 8.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 4L1 7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12L1 8.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Payment history
            </Link>
          </li>{" "}
          
          <li className="sidebar-list__item coming-soon">
            <Link
              to="/setting-full/contact-us"
              className={
                location.pathname === "/setting-full/contact-us"
                  ? "is-active"
                  : " "
              }
              style={{ display: "flex", gap: 5 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0938 8.00021H12.0938C11.8285 8.00021 11.5742 8.10557 11.3866 8.2931C11.1991 8.48064 11.0938 8.73499 11.0938 9.00021V11.5002C11.0938 11.7654 11.1991 12.0198 11.3866 12.2073C11.5742 12.3949 11.8285 12.5002 12.0938 12.5002H13.0938C13.359 12.5002 13.6133 12.3949 13.8009 12.2073C13.9884 12.0198 14.0938 11.7654 14.0938 11.5002V8.00021ZM14.0938 8.00021C14.0938 7.20805 13.9369 6.42373 13.6323 5.6925C13.3276 4.96127 12.8812 4.2976 12.3188 3.73979C11.7563 3.18198 11.0889 2.74107 10.3552 2.4425C9.62147 2.14393 8.83588 1.99361 8.04375 2.00021C7.25214 1.99444 6.46722 2.14537 5.73421 2.44431C5.0012 2.74326 4.33459 3.1843 3.7728 3.74202C3.21101 4.29975 2.76513 4.96314 2.46087 5.69396C2.15661 6.42478 1.99998 7.20858 2 8.00021V11.5002C2 11.7654 2.10536 12.0198 2.29289 12.2073C2.48043 12.3949 2.73478 12.5002 3 12.5002H4C4.26522 12.5002 4.51957 12.3949 4.70711 12.2073C4.89464 12.0198 5 11.7654 5 11.5002V9.00021C5 8.73499 4.89464 8.48064 4.70711 8.2931C4.51957 8.10557 4.26522 8.00021 4 8.00021H2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="white"
                />
                <path
                  d="M14.0938 11.5V13C14.0938 13.5304 13.883 14.0391 13.508 14.4142C13.1329 14.7893 12.6242 15 12.0938 15H8.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="white"
                />
              </svg>
              Contact us
            </Link>
          </li>
        </ul>
      </div>
    </FadeIn>
  );
};

export default SideBarSetting;
