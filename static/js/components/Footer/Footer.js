/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import iconDis from "../../assets/images/icon_dis.svg";
import iconX from "../../assets/images/icon_x_white.svg";
import iconTele from "../../assets/images/icon_tele.svg";

import { useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  return (
    <footer className="footer">
      {/* <footer className="footer d-none"> */}

      
      <ul className="footer-social">
        {/* <p style={{ color: '#FFF', fontWeight: 600 }}>Find us on</p> */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <li>
            <a
              href="https://twitter.com/GryphonAI_Org"
              target="_blank"
              rel="noreferrer"
            >
              <img src={iconX} alt="x" />
            </a>
          </li>
          <li>
            <a
              href="https://t.me/GryphonAI_Org"
              target="_blank"
              rel="noreferrer"
            >
              <img src={iconTele} alt="telegram" />
            </a>
          </li>
        </div>
      </ul>
    </footer>
  );
};

export default Footer;
