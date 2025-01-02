import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../constant/icon";

const WebLogo = () => {
  return (
    <Link
      to="/"
      style={{ display: "flex", gap: 10, alignItems: "center" }}
      className="logo-navbar"
    >
      <img style={{ height: 45 }} src={Icons.logo} alt="stabilityworld" />{" "}
      {/* <img style={{ height: 30 }} src={'/assets/images/stabilityworld.svg'} alt="stabilityworld" /> */}
    </Link>
  );
};

export default WebLogo;
