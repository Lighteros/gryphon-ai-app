import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Generate from "./../pages/generate/Generate";

import Edition from "./../pages/generate/editions/TextEdition";
import VideoEdition from "./../pages/generate/editions/VideoEdition";

import SwapEdition from "./../pages/generate/editions/SwapEdition";
import ImageEdition from "./../pages/generate/editions/ImageEdition";
import HistotyList from "./../pages/generate/history/HistotyList";
import Activate from "./../pages/activate/Activate";
import ActivatePass from "./../pages/form/forgotPassword/ChangePassword";

import NotFound from "./../pages/notFound/NotFound";

import ImageResultPage from "./../pages/ImageResultPage";
import CoinPaymentSuccess from "./../pages/form/payment/CoinPaymentSuccess";
import CoinPaymentCancel from "./../pages/form/payment/CoinPaymentCancel";
import LoadingAnimation from "../components/Loading/LoadingAnimation";
import ComingSoon from "../pages/comingSoon/ComingSoon";
// import AI Architect from '../pages/generate/editions/AI Architect';
import { useAppLoading } from "../context/LoadingContext";

import Term from "../pages/generate/settings/Term";
import Airdrop from "../pages/airdrop/Airdrop";
import { Outlet } from "react-router-dom";
import InviteFriends from "../pages/airdrop/InviteFriends";
import SocialMission from "../pages/airdrop/SocialMission";
import Leaderboard from "../pages/airdrop/Leaderboard";
import SoraVideo from "../pages/generate/editions/SoraVideo";
import Architect from "../pages/generate/editions/Architect";
import SettingInvite from "../pages/generate/settings/SettingInvite";
import Profile from "../pages/generate/settings/Profile";
import SettingPolicy from "../pages/generate/settings/Policy";
import PaymentHistory from "../pages/generate/settings/PaymentHistory";
import LinkSocial from "../pages/generate/settings/LinkSocial";
import ConnectWallet from "../pages/generate/settings/ConnectWallet";
import ContactUs from "../pages/generate/settings/ContactUs";
import { APP_ROUTE } from "./link";
import { config } from "../config";
import VideoToVideo from "../pages/generate/editions/VideoToVideo/VideoToVideo";
import AdvancedSetting from "../pages/generate/editions/VideoToVideo/AdvancedSetting";
import ApiSetting from "../pages/generate/settings/ApiSetting";
import Landing from "../pages/Landing";
import NodeWorker from "../pages/nodes/WorkerLayout";
import Worker from "../pages/nodes/WorkerCreate";
import WorkHome from "../pages/nodes/WorkerHome";
import NodeList from "../pages/nodes/WorkerList";
import WorkerDetail from "../pages/nodes/WorkerDetail";
import FaceDance from "../pages/generate/editions/FaceDance/FaceDance";
import Tasks from "../components/AppTelegram/Tasks";
import { SHOW_TOKEN } from "../constant";
import { useModal } from "../context/modalContext";
import Flux from "../pages/generate/editions/Flux";
import Pretrain from "../pages/generate/editions/TrainLora";
import ResultTrain from "../pages/generate/editions/TrainLora/ResultTrain";
// import ImageToVideo from '../pages/generate/editions/ImageToVideo/ImageToVideo';
// import AdvancedSettingImage from '../pages/generate/editions/ImageToVideo/AdvancedSettingImage';
// import AdvancedSetting from '../pages/generate/editions/VideoToVideo/AdvancedSetting';
// import VideoToVideo from '../pages/generate/editions/VideoToVideo/VideoToVideo';
const AppRoute = () => {
  const { showLoading } = useAppLoading();
  const location = useLocation();
  const { openModal } = useModal();
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (SHOW_TOKEN) openModal('notificationToken');
  //   }, 10000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [location.pathname, openModal]);
  if (showLoading) {
    return (
      <>
        <LoadingAnimation />
      </>
    );
  }

  return (
    <>
      <Routes>
        {/* <Route path="/twitter-login" element={<TwitterLoginPage />} /> */}
        <Route element={<Generate />}>
          <Route path="/" element={<Landing />} />
          <Route path="/ref/:refcode?" element={<Edition />} />
          <Route
            path={`/${APP_ROUTE.TEXT_TO_IMAGE.routeName}`}
            element={<Edition />}
          />
          {/* <Route path={`/${APP_ROUTE.IMAGE_TO_IMAGE.routeName}`} element={<ImageEdition />} /> */}
          <Route
            path={`/${APP_ROUTE.TEXT_TO_VIDEO.routeName}`}
            element={<SoraVideo />}
          />

          <Route
            path={`/${APP_ROUTE.FACE_SWAP.routeName}`}
            element={<SwapEdition />}
          />
          <Route
            path={`/${APP_ROUTE.REFACE_VIDEO.routeName}`}
            element={
              config.UNLOCK_COMMINGSOON ? <VideoEdition /> : <ComingSoon />
            }
          />
          <Route
            path={`/${APP_ROUTE.ARCHITECT_IMAGE.routeName}`}
            element={config.UNLOCK_COMMINGSOON ? <Architect /> : <ComingSoon />}
          />
          <Route
            path={`/${APP_ROUTE.FACE_DANCE.routeName}`}
            element={<FaceDance />}
          />
          <Route
            path={`/${APP_ROUTE.VIDEO_TO_VIDEO.routeName}`}
            element={
              config.UNLOCK_COMMINGSOON ? <VideoToVideo /> : <ComingSoon />
            }
          />
          <Route
            path={`/flux-gen`}
            element={config.UNLOCK_COMMINGSOON ? <Flux /> : <ComingSoon />}
          />
          <Route
            path={`/pretrain`}
            element={config.UNLOCK_COMMINGSOON ? <Pretrain /> : <ComingSoon />}
          />
          <Route
            path={`/train/:key`}
            element={
              config.UNLOCK_COMMINGSOON ? <ResultTrain /> : <ComingSoon />
            }
          />
          <Route
            path={`/${APP_ROUTE.VIDEO_TO_VIDEO.routeName}/advance-setting`}
            element={<AdvancedSetting />}
          />

          <Route
            path={`/${APP_ROUTE.IMAGE_TO_VIDEO.routeName}`}
            element={<ComingSoon />}
          />
          <Route
            path={`/${APP_ROUTE.IMAGE_TO_VIDEO.routeName}/advance-setting`}
            element={<ComingSoon />}
          />

          <Route path="/history/:tab?" element={<HistotyList />} />
          <Route path="/result/:from/:key" element={<ImageResultPage />} />
          <Route path="/loyalty-point" element={<Outlet />}>
            <Route path="" element={<Airdrop />} />
            {/* <Route path="daily-mission" element={<DailyMission />} /> */}
            <Route path="invite-friend" element={<InviteFriends />} />
            <Route path="social-mission" element={<SocialMission />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            {config.IS_MINIAPP ? (
              <Route path="tasks" element={<Tasks />} />
            ) : null}
          </Route>
          <Route path="/setting-full" element={<Outlet />}>
            <Route path="" element={<Profile />} />
            {/* <Route path="daily-mission" element={<DailyMission />} /> */}
            <Route path="referral-program" element={<SettingInvite />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="link-social-network" element={<LinkSocial />} />
            <Route path="connect-wallet" element={<ConnectWallet />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="term-of-service" element={<Term />} />
            <Route path="privacy-policy" element={<SettingPolicy />} />
            {/* <Route path="*" element={<Profile />} /> */}
          </Route>
          <Route path="/api-key-setting" element={<ApiSetting />} />
        </Route>

        <Route
          path="/deposite/coinpayments-success"
          element={<CoinPaymentSuccess />}
        />
        <Route
          path="/deposite/coinpayments-cancel"
          element={<CoinPaymentCancel />}
        />
        <Route path="/activate" element={<Activate />} />
        <Route path="/privacy-policy" element={<SettingPolicy margin={0} />} />
        <Route path="/term-of-service" element={<Term margin={0} />} />
        <Route path="/reset-password" element={<ActivatePass />} />
        {/* <Route path="/video-to-video" element={<ComingSoon />} />
        <Route path="/photo-to-video-maker" element={<ComingSoon />} /> */}
        <Route path="*" element={<NotFound />} />
        <Route element={<NodeWorker />}>
          <Route path="/worker" element={<WorkHome />} />
          <Route path="/worker/create" element={<Worker />} />
          <Route path="/worker/devices" element={<NodeList />} />
          <Route path="/worker/detail/:id" element={<WorkerDetail />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoute;
