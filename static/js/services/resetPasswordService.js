/* eslint-disable import/no-anonymous-default-export */
import { useMutation } from "@tanstack/react-query";
import instance from "../api";

const sendEmail = (data) => {
  return instance.post("auth/send-email-reset-password", data);
};
const resetPassword = (data) => {
  return instance.post("auth/reset-password", data);
};
const changePassword = (data) => {
  return instance.post("auth/change-password", data);
};

export default {
  sendEmail,
  resetPassword,
  changePassword,
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => resetPassword(data),
  });
};
