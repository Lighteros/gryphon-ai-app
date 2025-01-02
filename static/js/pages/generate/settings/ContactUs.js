import React from "react";
import { Icons } from "../../../constant/icon";
import SidebarSettingMobile from "../../../components/SideBar/SidebarSettingMobile";
import { Link } from "react-router-dom";
import withAuth from "../../../context/withAuth";

import { useToggle } from "../../../hooks/useToggle";
const ContactUs = () => {
  const [showSidebarSetting, setShowSidebarSetting] = useToggle();
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
          <p style={{ fontSize: 16, fontWeight: 600 }}>Contact us </p>
        </Link>
        <div className="popup-policy">
          <div className="popup-policy__box">
            <div className="setting-social">
              <a
                href="https://stabilityworld.ai/"
                className="setting-social__item"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon">
                  <img src="/favicon.ico" alt="images" width={28} />
                </span>

                <span className="ttl">Website: Heaven World AI</span>
              </a>
              <a
                href="https://docs.stabilityworld.ai/stability-world-ai/about-us/about-stability-world-ai"
                className="setting-social__item"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon">
                  <img src="/favicon.ico" alt="images" width={28} />
                </span>

                <span className="ttl">Docs: Heaven World AI</span>
              </a>
              <div className="setting-social">
                <a
                  href="https://twitter.com/HeavenW_AI"
                  className="setting-social__item"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon">
                    <img src={Icons.icon_x} alt="images" />
                  </span>

                  <span className="ttl">X (Twitter): Heaven World AI</span>
                </a>
                <a
                  href="https://t.me/HeavenW_AI"
                  className="setting-social__item"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon">
                    <img src={Icons.icon_tele} alt="images" />
                  </span>

                  <span className="ttl">
                    {" "}
                    Telegram Group: Heaven World AI
                  </span>
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ContactUs);
