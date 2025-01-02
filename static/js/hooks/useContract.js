import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import abi from "../abis/Airdrop.json";
import { ContractFunctionExecutionError, toHex } from "viem";

import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../api";
import { onApiResponse } from "../lib/query";
import toast from "../lib/toast";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useUser } from "../context/AuthContext";
const contractStacking = {
  abi: abi,
  address: "0xd245739218eA40e54d7e44C2Ce3562745BaAae08",
};
export const useClaim = (callback) => {
  const { address } = useAccount();
  const { fetchUserData, isLoading: isLoadingUser } = useUser();
  const { writeContractAsync, isPending, data: dataHash } = useWriteContract();
  const { isLoading: isLoadingTrans, data: dataTrans } =
    useWaitForTransactionReceipt({
      hash: dataHash,
    });
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    let idTimeout;
    if (dataHash && !isLoadingTrans && dataTrans?.status === "success") {
      setLoading(true);
      idTimeout = setTimeout(() => {
        fetchUserData();
        callback && callback();
        setLoading(false);
        toast.success();
      }, 5000);
    }
    return () => clearTimeout(idTimeout);
  }, [isLoadingTrans]);

  const handler = async () => {
    try {
      setLoading(true);
      const sign = await instance.post("user/airdrop-claim-sign", {});
      setLoading(false);
      if (!sign.success) {
        toast.error(sign.error_message);
        return;
      }

      if (sign?.data.recipient.toLowerCase() !== address.toLowerCase()) {
        toast.error("Linked wallet address does not match");
        return;
      }
      const res = await writeContractAsync({
        ...contractStacking,
        functionName: "claim",
        args: [BigNumber(sign?.data?.amount), sign?.data.signature],
      });
    } catch (error) {
      if (error instanceof ContractFunctionExecutionError) {
        toast.error(error.shortMessage);
      }
    }
  };

  return { handler, isPending: isPending || isLoadingTrans || isLoading };
};
export const useSignClaim = () => {
  return useMutation({
    mutationFn: () => instance.post("user/airdrop-claim-sign", {}),
    onSuccess(data) {
      if (onApiResponse(data)) {
      }
    },
  });
};
