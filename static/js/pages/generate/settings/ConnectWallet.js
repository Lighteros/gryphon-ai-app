import React, { useState } from "react";
import { Icons } from "../../../constant/icon";
import { Link } from "react-router-dom";
import withAuth from "../../../context/withAuth";
import SidebarSettingMobile from "../../../components/SideBar/SidebarSettingMobile";
import useWalletConnect from "../../../hooks/useWalletConnect";
import clsx from "clsx";
import { useToggle } from "../../../hooks/useToggle";

const ConnectWallet = () => {
  const {
    user,
    disconnectWallet,
    connectWallet,
    isUserConnected,
    address,
    isLoading,
    chainId,
  } = useWalletConnect();

  const [showSidebarSetting, setShowSidebarSetting] = useToggle();
  return (
    <>
      <div
        className="p-content m-l setting"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          gap: 20,
        }}
      >
        <div style={{ position: "fixed", zIndex: 50, top: 78 }}>
          <SidebarSettingMobile
            showSidebarSetting={showSidebarSetting}
            setShowSidebarSetting={setShowSidebarSetting}
          />
        </div>
        <div
          className="p-content__wrap"
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link
            style={{ paddingBottom: 40 }}
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
            <p style={{ fontSize: 16, fontWeight: 600 }}>Connect Wallet</p>
          </Link>

          <button
            className={clsx("btn-connect btn-linear")}
            disabled={isLoading}
            style={{ padding: "3rem 20rem", gap: 10, width: "100%" }}
            onClick={() =>
              isLoading
                ? null
                : isUserConnected
                ? disconnectWallet()
                : connectWallet()
            }
          >
            <span className="setting-list__icon">
              <img src={Icons.icon_wallet} alt="icon" />
            </span>
            {isUserConnected ? (
              <>
                <span
                  className="setting-list__ttl"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user?.wallet_address}
                >
                  {address?.substring(0, 6) + "..." + address?.slice(-6)}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    style={{ height: 25, fontSize: 16 }}
                    className="btn-linear"
                  >
                    Disconnect
                  </button>
                </div>
              </>
            ) : (
              <p className="setting-list__ttl" style={{ fontSize: 16 }}>
                Connect Wallet
              </p>
            )}
          </button>
          {isUserConnected ? (
            ""
          ) : (
            <p
              style={{
                color: "#FFF",
                textAlign: "center",
                marginTop: 12,
                fontSize: 16,
              }}
            >
              On your mobile device, if you're unable to connect, you can try
              updating your wallet app!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(ConnectWallet);
