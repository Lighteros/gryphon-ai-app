/* eslint-disable import/no-anonymous-default-export */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../api";
import { onApiResponse } from "../lib/query";
import { useUser } from "../context/AuthContext";
import useWalletConnect from "../hooks/useWalletConnect";
import toast from "../lib/toast";
import { config } from "../config";
import authService from "./authService";
import { LoginProviders } from "../constant";
import { useNavigate } from "react-router-dom";
import { RedirectUri } from "../utils";

const prefix = "user";
const listQueryKey = prefix;
const getUser = () => {
  return instance.get("user/me");
};

const updateProfile = (body) => {
  return instance.post("user/update-profile", body);
};
const uploadAvatar = (body) => {
  return instance.post("user/upload-avatar", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getReferral = () => {
  return instance.get("user/referral");
};

const depositDetail = (code) => {
  return instance.get("user/deposit/coins/" + code);
};
const getReferralList = (page_size, page_index, indirectly = false) => {
  return instance.post("user/referral-list", {
    page_size,
    page_index,
    indirectly,
  });
};
const airdropMissionList = (page_size, page_index, is_completed) => {
  return instance.post("user/airdrop-mission-list", {
    page_size,
    page_index,
    is_completed,
  });
};
const airdropMissionCheck = ({ mission_code, token, token_type }) => {
  return instance.post("user/airdrop-mission-check", {
    mission_code,
    token,
    token_type,
  });
};

const unbindPlatform = (platform) => {
  return instance.post("user/unbind", { platform });
};
const leaderboard = (page_size, page_index, type, last) => {
  return instance.post("user/airdrop-leader-board", {
    page_size,
    page_index,
    type,
    last,
  });
};
const rankUser = () => {
  return instance.post("user/airdrop-rank-info");
};
const usageHistory = (page_index, page_size) => {
  return instance.post("user/usage-history", { page_size, page_index });
};
const depositHistory = (page_index, page_size) => {
  return instance.post("user/deposit-history", { page_size, page_index });
};
// const depositPackage = (data) => {
//   return instance.post('user/deposit-package', data);
// };

const bonusHistory = (page_index, page_size) => {
  return instance.post("user/bonus-credit-history", { page_size, page_index });
};
const discordLink = (data) => {
  return instance.post("user/discord-linking", data);
};
const telegramLink = (data) => {
  return instance.post("user/telegram-linking", data);
};
const twitterLink = (data) => {
  return instance.post("user/twitter-linking", data);
};
const walletMessage = (data) => {
  return instance.post("user/wallet-address-message", data);
};
const walletLink = (data) => {
  return instance.post("user/wallet-address-linking", data);
};
const walletUnlink = (data) => {
  return instance.post("user/wallet-address-unlink", data);
};
const checkMissionStarter = (data) => {
  return instance.get("user/mission-starter", data);
};

export default {
  getUser,
  depositDetail,
  getReferral,
  getReferralList,
  leaderboard,
  usageHistory,
  depositHistory,
  bonusHistory,
  airdropMissionList,
  airdropMissionCheck,
  discordLink,
  twitterLink,
  walletMessage,
  walletLink,
  rankUser,
  updateProfile,
  uploadAvatar,
  unbindPlatform,
  telegramLink,
  checkMissionStarter,
  walletUnlink,
};

// export const useDepositPackage = (searchQuery) => {
//   return useQuery({
//     queryKey: [listQueryKey, "deposit-package", searchQuery],
//     queryFn: () => {
//       return instance.post(`${prefix}/deposit-package`, searchQuery);
//     }
//   });
// };
export const useDeposit = () => {
  return useMutation({
    mutationFn: (data) => {
      return instance.post(`${prefix}/deposit`, data);
    },
  });
};
export const useUserTasks = (searchQuery) => {
  return useQuery({
    queryKey: [listQueryKey, "tasks", searchQuery],
    queryFn: () => {
      return instance.post(`${prefix}/tasks`, searchQuery);
    },
  });
};
export const useUserTaskCompletion = () => {
  const { fetchCredits } = useUser();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return instance.post(`${prefix}/task-completion`, data);
    },
    onSuccess(data) {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey, "tasks"] });
        fetchCredits();
      }
    },
  });
};

export const useBalanceHistoryList = (searchQuery) => {
  return useQuery({
    queryKey: [listQueryKey, "balance-history", searchQuery],
    queryFn: () => {
      if (searchQuery.type === "bonus_credit") {
        return instance.post(`${prefix}/bonus-credit-history`, searchQuery);
      }
      if (searchQuery.type === "credit") {
        return instance.post(`${prefix}/usage-history`, searchQuery);
      }
      if (searchQuery.type === "deposit") {
        return instance.post(`${prefix}/deposit-history`, searchQuery);
      }
      return instance.post(`${prefix}/usage-history`, searchQuery);
    },
    refetchOnMount: true,
  });
};
export const useLeaderBoardList = (searchQuery) => {
  return useQuery({
    queryKey: [listQueryKey, "airdrop-leader-board", searchQuery],
    queryFn: () => {
      return instance.post(`${prefix}/airdrop-leader-board`, searchQuery);
    },
  });
};
export const useLeaderBoardInfo = () => {
  return useQuery({
    queryKey: [listQueryKey, "airdrop-leader-board-info", "me"],
    queryFn: () => {
      return instance.post(`${prefix}/airdrop-rank-info`);
    },
    refetchOnMount: true,
  });
};
export const useRefferalList = (searchQuery) => {
  return useQuery({
    queryKey: [listQueryKey, "referral-list", searchQuery],
    queryFn: () => {
      return instance.post(`${prefix}/referral-list`, searchQuery);
    },
  });
};
export const useRefferalInfo = () => {
  return useQuery({
    queryKey: [listQueryKey, "referral"],
    queryFn: () => {
      return instance.get(`${prefix}/referral`);
    },
    refetchOnMount: true,
  });
};
export const useStarterMissionList = (searchQuery) => {
  return useQuery({
    queryKey: [listQueryKey, "starter-mission-list", searchQuery],
    queryFn: () => {
      return instance.post(`${prefix}/airdrop-mission-list`, searchQuery);
    },
  });
};
export const useMissionStarterCheck = (callback) => {
  const queryClient = useQueryClient();
  const { fetchUserData } = useUser();
  const { connectWallet } = useWalletConnect(() => {
    callback && callback("WALLET");
  });
  return useMutation({
    mutationFn: (data) =>
      instance.post(`${prefix}/airdrop-mission-check`, data),
    onSuccess(data) {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({
          queryKey: [listQueryKey, "starter-mission-list"],
        });
        fetchUserData(null, true);
      } else {
        queryClient.invalidateQueries({
          queryKey: [listQueryKey, "starter-mission-list"],
        });
        if (data?.error_message === "REQUIRED_LINK_DISCORD_ACCOUNT") {
          const discordLink = `https://discord.com/oauth2/authorize?client_id=${config.DISCORD_CLIENT_ID}&response_type=token&redirect_uri=${config.CALLBACK_DISCORD}&scope=identify+email+guilds`;
          window.location.href = discordLink;
        }
        if (data?.error_message === "REQUIRED_LINK_TWITTER_ACCOUNT") {
          authService
            .get_token_twitter()
            .then((res) => {
              if (res.success) {
                // RedirectUri.set('/setting-full/link-social-network');
                window.location.href =
                  "https://api.twitter.com/oauth/authorize?oauth_token=" +
                  res.data;
              } else {
                toast.error(res.error_message);
              }
            })
            .catch((error) => {
              toast.error();
            });
        }
        if (data?.error_message === "REQUIRED_WALLET_CONNECT") {
          connectWallet();
        }
      }
    },
  });
};

export const useUserBind = ({ onSuccess }) => {
  const { fetchUserData, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      data.app_type = "web";
      data.device_id = "";
      data.version = "";
      data.country = "";
      switch (data.provider) {
        // case LoginProviders.TELEGRAM:
        //   return instance.post('user/telegram-linking', data);
        case LoginProviders.DISCORD:
          return instance.post("user/discord-linking", data);
        case LoginProviders.TWITTER:
          return instance.post("user/twitter-linking", data);
        default:
          break;
      }
    },
    onSuccess(data) {
      if (onApiResponse(data)) {
        fetchUserData(() => {
          navigate("/instant-art-creator", { replace: true });
          onSuccess && onSuccess();
        });
      } else {
      }
      navigate(RedirectUri.get());
    },
  });
};
