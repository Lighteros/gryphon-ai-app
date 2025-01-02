/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef } from "react";

import toast from "../components/Shared/toast";
import { useUser } from "../context/AuthContext";
import userService from "../services/userService";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { useState } from "react";

const useWalletConnect = (callback) => {
  const { user, fetchUserData } = useUser();
  const { open, close } = useWeb3Modal();
  const isClickButton = useRef(false);
  const { address, isConnected, chainId } = useAccount();
  const { signMessage, data, isSuccess } = useSignMessage();
  const { disconnect } = useDisconnect();
  const [isLoading, setLoading] = useState(false);
  // useEffect(() => {
  //   disconnect();
  // }, []);
  console.log(address);

  const getMessage = async () => {
    await userService
      .walletMessage({ address })
      .then((res) => {
        signMessage(
          { message: res.data },
          {
            onSuccess(data) {
              userService
                .walletLink({ signature: data, address: address })
                .then((res) => {
                  if (res.success) {
                    fetchUserData(null, true);
                    callback && callback();
                    toast.success("Success");
                    isClickButton.current = false;
                    close();
                  } else {
                    toast.error(res?.error_message);
                    disconnect();
                  }
                })
                .catch(console.error)
                .finally(() => setLoading(false));
            },
            onError() {
              close();
              disconnect();
            },
          }
        );
      })
      .catch(console.log);
  };
  // useEffect(() => {
  //   alert(isIdle + ' ' + isLoading + ' ' + isError + ' ' + variables?.message);
  // }, [isLoading, isIdle, isError]);
  useEffect(() => {
    if (isClickButton.current) {
      getMessage();
    }
  }, [isConnected]);
  const connectWallet = async () => {
    await open({ view: "AllWallets" });
    isClickButton.current = true;
  };

  const disconnectWallet = () => {
    userService.walletUnlink().then((res) => {
      if (res.success) {
        disconnect();
        fetchUserData(null, true);
      }
    });
  };

  return {
    connectWallet,
    userAdressWallet: user?.wallet_address,
    disconnectWallet,
    fetchUserData,
    user,
    isUserConnected: !!user?.wallet_address,
    address: user?.wallet_address,
    isConnected,
    isLoading,
    chainId,
  };
};

export default useWalletConnect;
