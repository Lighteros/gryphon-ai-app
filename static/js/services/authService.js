/* eslint-disable import/no-anonymous-default-export */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../api";
import { LoginProviders } from "../constant";
import { useUser } from "../context/AuthContext";
import { onApiResponse } from "../lib/query";
import { setToken } from "../api/token";
import { useNavigate } from "react-router-dom";
import getRefCode from "../utils/getRefCode";
import { config } from "../config";
import { login_success } from "../constant/MessageToatify";
import userService from "./userService";
import { useModal } from "../context/modalContext";
import toast from "../lib/toast";
const register = (data) => {
  return instance.post("auth/email-sign-up", data);
};
const login = (data) => {
  return instance.post("auth/email-sign-in", data);
};
const activeAcount = (data) => {
  return instance.post("auth/activate", data);
};
const sendmailActiveAcount = (data) => {
  return instance.post("auth/send-email-activate", data);
};
const login_google = (data) => {
  return instance.post("auth/google-sign-in", data);
};
const get_token_twitter = (data) => {
  return instance.get("auth/twitter-token", data);
};
const login_twitter = (data) => {
  return instance.post("auth/twitter-sign-in", data);
};
const login_discord = (data) => {
  return instance.post("auth/discord-sign-in", data);
};

const loginTelegram = (data) => {
  return instance.post("auth/telegram-sign-in", data);
};
const loginLink = (data) => {
  return instance.post("auth/canva-link", data);
};
export default {
  login,
  login_google,
  register,
  activeAcount,
  sendmailActiveAcount,
  login_twitter,
  login_discord,
  loginTelegram,
  get_token_twitter,
  loginLink,
};

export const useRegister = () => {
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return register(data);
    },
    onSuccess(data) {
      if (data.success) {
        setToken(data.data?.access_token, data.data?.refresh_token);
        openModal("verify-email", data.email);
      } else {
      }
      queryClient.invalidateQueries({ queryKey: ["me", "user"] });
    },
    onError(error) {
      console.error("Registration failed:", error);
    },
  });
};
export const useLogin = () => {
  const { fetchUserData } = useUser();
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return login(data);
    },
    onSuccess(data) {
      if (data.success) {
        setToken(data.data?.access_token, data.data?.refresh_token);
        fetchUserData(() => {
          login_success();
          userService
            .checkMissionStarter()
            .then((res) => {
              if (res.success === false) {
                openModal("airdrop-missions");
              } else {
                closeModal();
              }
            })
            .catch((err) => {
              console.error("Error checking mission starter:", err);
            });
        });
      } else if (data.error_message === "USER_NOT_ACTIVATED") {
        openModal("verify-email", data.email);
      } else {
      }
      queryClient.invalidateQueries({ queryKey: ["me", "user"] });
    },
    onError(error) {
      console.error("Login failed:", error);
    },
  });
};
export const useUserSignIn = ({ onSuccess }) => {
  const { fetchUserData } = useUser();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data) => {
      data.app_type = "web";
      data.device_id = "";
      data.version = "";
      data.country = "";
      if (!config.IS_MINIAPP) {
        data.ref_code = getRefCode();
      }
      switch (data.provider) {
        case LoginProviders.EMAIL:
          return instance.post("auth/email-sign-in", data);
        case LoginProviders.TELEGRAM:
          return instance.post("auth/telegram-sign-in", data);
        case LoginProviders.DISCORD:
          return instance.post("auth/discord-sign-in", data);
        case LoginProviders.GOOGLE:
          return instance.post("auth/google-sign-in", data);
        case LoginProviders.TWITTER:
          return instance.post("auth/twitter-sign-in", data);
        case LoginProviders.TELEGRAM_BOT:
          return instance.post("auth/telegram-bot-sign-in", data);
        default:
          break;
      }
    },
    onSuccess(data) {
      if (onApiResponse(data)) {
        setToken(data.data?.access_token, data.data?.refresh_token);
        fetchUserData(() => {
          navigate("/instant-art-creator", { replace: true });
          onSuccess && onSuccess();
        });
      } else {
      }
    },
  });
};
