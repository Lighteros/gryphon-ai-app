import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import "../../assets/css/style.css";

import Footer from "../../components/Footer/Footer";
import { TabTelegram } from "../../components/AppTelegram/TabTelegram";

const Generate = ({ isSetting = false }) => {
  return (
    <div className="bg-opaque">
      <NavBar />
      <div className="p-wrapper">
        <SideBar isSetting={isSetting} />
        <Outlet />
      </div>
      <Footer />
      <TabTelegram />
    </div>
  );
};

export default Generate;
