import React, { useEffect } from "react";

import Register from "../pages/form/register/Register";
import Signin from "../pages/form/signin/Signin";
import ForgotPass from "../pages/form/forgotPassword/ForgotPassword";
import NewPassword from "../pages/form/forgotPassword/NewPasswordModal";
import VerifyEmail from "../pages/activate/SendMailActive";
import { useModal } from "../context/modalContext";
import Modal, { ModalHeadless } from "./Modal/Modal";
import SettingInvite from "../pages/generate/settings/SettingInvite";
import ContactUs from "../pages/generate/settings/ContactUs";
import Payment from "../pages/form/payment/Payment";
import ModalChangePass from "../pages/form/changePassword/modalChange";

import PaymentHistory from "../pages/generate/settings/PaymentHistory";
import LinkSocial from "../pages/generate/settings/LinkSocial";
import ModalIntro from "./Modal/ModalIntro";
import ModalResultShare from "./Modal/ModalResultShare";
import ModalResult from "./Modal/ModalResult";
import SocialMission from "../pages/airdrop/SocialMission";
import { useUser } from "../context/AuthContext";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { config } from "../config";
import { SHOW_TOKEN } from "../constant";

const ModalContainer = () => {
  const { isShow, closeModal, type, openModal } = useModal();
  const { completedStartMission, user } = useUser();

  useEffect(() => {
    if (completedStartMission === false) {
      if (config.IS_MINIAPP) {
      } else {
        openModal("airdrop-missions");
      }
    }
  }, [completedStartMission]);

  return (
    <>
      <ModalHeadless
        isOpen={isShow}
        closeModal={closeModal}
        zIndex={70}
        background={type === "result" ? "transparent" : undefined}
        boxShadow={type === "result" ? "transparent" : undefined}
      >
        {config.IS_MINIAPP ? (
          <></>
        ) : (
          <>
            {type === "login" && <Signin />}
            {type === "register" && <Register />}
            {type === "change-password" && <ModalChangePass />}
            {type === "forgot-password" && <ForgotPass />}
            {type === "verify-email" && <VerifyEmail />}
            {type === "airdrop-missions" && <SocialMission />}
            {type === "create-password" && <NewPassword />}
            {type === "history-payment" && <PaymentHistory />}
            {type === "payment" && <Payment />}
          </>
        )}

        {type === "settingInvite" && <SettingInvite />}
        {type === "contact-us" && <ContactUs />}
        {type === "link-social-network" && <LinkSocial />}
        {type === "intro" && <ModalIntro />}
        {type === "share-result" && <ModalResultShare />}
        {type === "result" && <ModalResult />}
      </ModalHeadless>
    </>
  );
};

export default ModalContainer;
