import React, { useState, useCallback, useMemo, useEffect } from "react";
import UserService from "../services/userService";
import { clearToken, getRefreshToken } from "../api/token";

import userService from "../services/userService";
import { useModal } from "./modalContext";
import { RedirectUri } from "../utils";

const AuthContext = React.createContext({
  user: null,
  isLoading: false,
  logout: () => undefined,
  fetchUserData: (callback, disableLoading = false) => undefined,
  fetchCredits: () => undefined,
  isAuthenticated: false,
  W3Modal: null,
  openW3Modal: () => undefined,
  disconnectWallet: () => undefined,
  completedStartMission: null,
});
export const AuthContextProvider = ({ children }) => {
  // const { disconnect } = useDisconnect();
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [completedStartMission, setCompletedStartMission] = useState(null);

  const fetchUserData = useCallback(
    async (callback, disableLoading = false) => {
      if (!disableLoading) setLoading(true);
      if (!getRefreshToken()) {
        setUser(null);
        setLoading(false);
        setAuthenticated(false);
        callback && callback();
        return;
      }
      UserService.getUser()
        .then((u) => {
          if (u.success) {
            const by_email = u.data?.provider.find((x) => x === "email");
            u.data.by_email = by_email;
            setUser(u.data);
            setAuthenticated(true);
            const canva = RedirectUri.getCanva();
            if (canva) {
              RedirectUri.clearCanva();
              window.location.href = canva;
            }
            return;
          } else {
            setUser(null);
            setAuthenticated(false);
          }
        })
        .catch((e) => {
          setUser(null);
          setAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
          callback && callback();
        });

      fetchStatusMission();
    },
    []
  );
  const fetchCredits = useCallback(async () => {
    const data = await UserService.getUser().then((u) => {
      if (u.success) {
        const by_email = u.data?.provider.find((x) => x === "email");
        u.data.by_email = by_email;
        setUser((userPrev) =>
          userPrev ? { ...userPrev, ...u.data } : userPrev
        );
        setAuthenticated(true);
        return {
          credit_balance: Number(u.data.credit_balance),
          bonus_balance: Number(u.data.bonus_balance),
        };
      } else {
        setUser(null);
        setAuthenticated(false);
        return null;
      }
    });
    return data;
  }, [user]);

  const fetchStatusMission = useCallback(() => {
    userService
      .checkMissionStarter()
      .then((res) => {
        setCompletedStartMission(res.success);
      })
      .catch(() => {});
  }, []);

  const logout = useCallback(() => {
    // disconnect();
    clearToken();
    setAuthenticated(false);
    setUser(null);
  }, []);
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      fetchUserData,
      logout,
      isAuthenticated,
      completedStartMission,
      fetchCredits,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoading, isAuthenticated, completedStartMission, fetchCredits]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useUser = () => {
  return React.useContext(AuthContext);
};
export default AuthContext;
