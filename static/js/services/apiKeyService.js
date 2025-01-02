import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../context/modalContext";
import { getNextPage, onApiResponse } from "../lib/query";
import { useUser } from "../context/AuthContext";
import instance from "../api";
const prefix = "api-access";
const listQueryKey = prefix;

const apiKetService = {
  categoryList: () => instance.get(`/${prefix}/category/list`),
  chainList: () => instance.get(`/${prefix}/chain/list`),
};
export default apiKetService;

export const useApiKeyList = (searchQuery) => {
  return useQuery({
    queryKey: [listQueryKey, "list", searchQuery],
    queryFn: () => {
      return instance.post(`/${prefix}/list`, searchQuery);
    },
    getNextPageParam: getNextPage,
  });
};
export const useApiKeyInfo = () => {
  return useQuery({
    queryKey: [listQueryKey, "list"],
    queryFn: () => {
      return instance.get(`/${prefix}/info`);
    },
    refetchOnMount: true,
    getNextPageParam: getNextPage,
  });
};

export const useApiKeyCreate = () => {
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  return useMutation({
    mutationFn: (data) => instance.post(`/${prefix}`, data),
    onSuccess(data) {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey, "list"] });
      } else {
        if (data?.error_message === "NOT_ENOUGH_CREDIT") {
          openModal("balance");
        }
      }
    },
  });
};

export const useApiKeySetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => instance.put(`/${prefix}/setting`, data),
    onSuccess(data) {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey, "list"] });
      }
    },
  });
};
export const useApiKeyDelete = () => {
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  return useMutation({
    mutationFn: (id) => instance.delete(`/${prefix}/${Number(id)}`),
    onSuccess(data) {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey, "list"] });
      } else {
        if (data?.error_message === "NOT_ENOUGH_CREDIT") {
          openModal("balance");
        }
      }
    },
  });
};

export const useApiKeySettingModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => instance.put(`/${prefix}/setting-model`, data),
    onSuccess(data) {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey, "list"] });
      }
    },
  });
};
