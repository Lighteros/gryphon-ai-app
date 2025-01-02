import { useQuery } from "@tanstack/react-query";
import instance from "../api";

const translatePrompt = (text) => {
  return instance.post("common/translate-prompt", { text });
};
const getCoin = () => {
  return instance.get("common/payments/coins");
};
const getReferral = () => {
  return instance.get("common/referral/setting");
};
const getService = () => {
  return instance.get("common/service-list");
};
const getPackageCredit = () => {
  return instance.get("common/package");
};
const logger = ({ message }) => {
  return instance.post("common/logger", { error: message });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCoin,
  getReferral,
  translatePrompt,
  getService,
  getPackageCredit,
  logger,
};
export const useGetCoin = () => {
  return useQuery({
    queryKey: ["common", "payments"],
    queryFn: () => {
      return instance.get("common/payments/coins");
    },
  });
};
export const usePackageCredit = (searchQuery) => {
  return useQuery({
    queryKey: ["common", "package"],
    queryFn: getPackageCredit,
    searchQuery,
  });
};
export const useServiceList = () => {
  return useQuery({
    queryKey: ["common", "service"],
    queryFn: getService,
  });
};
