import React from "react";
import { useUser } from "../context/AuthContext";
import toast from "../components/Shared/toast";

const useCreditCheck = () => {
  const { user, fetchCredits } = useUser();
  const checkCredit = async (amount) => {
    if (amount === null || amount === undefined) {
      toast.error("Please try again.");
      return false;
    }
    const data = await fetchCredits();
    const freeCredit = data?.bonus_balance || 0;
    const boughtCredit = data?.credit_balance || 0;
    const totalCredit = freeCredit + boughtCredit;
    amount = Number(amount || 0);
    if (totalCredit <= 0 || totalCredit < amount) {
      return false;
    }
    return true;
  };
  return { checkCredit };
};

export default useCreditCheck;
