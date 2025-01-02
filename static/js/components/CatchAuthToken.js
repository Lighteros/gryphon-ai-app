import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserSignIn } from "../services/authService";
import { useModal } from "../context/modalContext";
import toast from "./Shared/toast";
import { useUser } from "../context/AuthContext";
import { useAppLoading } from "../context/LoadingContext";
import { useUserBind } from "../services/userService";
import { LoginProviders } from "../constant";
import { config } from "../config";
import { sleep } from "../utils";

const CatchAuthToken = () => {
  const { openModal, closeModal } = useModal();
  const { toggleLoading } = useAppLoading();
  const { fetchUserData, isAuthenticated, isLoading } = useUser();
  const [initData, setInitData] = useState(window?.Telegram?.WebApp.initData);
  const navigate = useNavigate();
  const { mutateAsync: mutateBind } = useUserBind({});
  const { mutateAsync: mutateSignIn } = useUserSignIn({});
  const loadingCompleted = () => toggleLoading(false, false);
  const loadingStart = () => toggleLoading(true, true);
  const handler = async () => {
    if (isLoading === null) {
      fetchUserData();
      return;
    }
    if (isLoading === true) {
      return;
    }

    const urlParams = new URLSearchParams(
      window.location.hash
        ? window.location.hash.replace("#", "?")
        : window.location.search
    );

    if (
      urlParams.get("error") === "access_denied" ||
      !!urlParams.get("denied")
    ) {
      openModal("login");
      toast.error("The request has been cancelled");
      // fetchUserData();
      loadingCompleted();
      navigate("/", { replace: true });
      return;
    }

    const fileKey = urlParams.get("id");
    if (fileKey) {
      const type = urlParams.get("type");
      if (type === "share") openModal("share-result");
      else
        openModal("result", {
          file_key: fileKey,
        });
    }
    const accessToken = urlParams.get("access_token");
    const idToken = urlParams.get("id_token");
    const typeToken = urlParams.get("token_type");
    const oauth_token = urlParams.get("oauth_token");
    const oauthVerifier = urlParams.get("oauth_verifier");
    const tgAuthResult = urlParams.get("tgAuthResult");
    let type = "";
    let data = {};
    if (config.IS_MINIAPP) {
      const urlTelegramParams = new URLSearchParams("?" + initData);
      if (initData) {
        const current = localStorage.getItem("current_user");
        if (current !== initData) {
          type = LoginProviders.TELEGRAM_BOT;
          data = {
            token: initData,
            ref_code: urlTelegramParams.get("start_param") || null,
          };
        }
        await sleep(3000);
      } else {
        // toast.error('Login failed, please try again!')
        return;
      }
    } else if (oauthVerifier && oauth_token) {
      type = LoginProviders.TWITTER;
      data = {
        token: oauth_token,
        verifier: oauthVerifier,
      };
    } else if (accessToken && typeToken) {
      type = LoginProviders.DISCORD;
      data = {
        token: accessToken,
        token_type: typeToken,
      };
    } else if (tgAuthResult) {
      type = LoginProviders.TELEGRAM;
      data = {
        token: tgAuthResult,
      };
    }

    if (type) {
      data.provider = type;
      loadingStart();
      if (type === LoginProviders.TELEGRAM_BOT) {
        if (initData) {
          console.log(type, "tele sign");
          await mutateSignIn(data);
          localStorage.setItem("current_user", initData);
        }
        console.log("ignore");

        setInitData(null);
      } else if (isAuthenticated) {
        await mutateBind(data);
      } else {
        await mutateSignIn(data);
      }
    }
    if (isLoading === false) {
      loadingCompleted();
      return;
    }
  };
  useEffect(() => {
    handler();
  }, [isLoading]);

  return <></>;
};

export default CatchAuthToken;
