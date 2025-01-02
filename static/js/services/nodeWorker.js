import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../context/modalContext";
import { getNextPage, onApiResponse } from "../lib/query";
import { useUser } from "../context/AuthContext";
import instance from "../api";
const prefix = "node-worker";
const listQueryKey = prefix;
export const useNodeWorkerList = (searchQuery) => {
  return useQuery({
    queryKey: [listQueryKey, "list", searchQuery],
    queryFn: () => {
      return instance.post(`/${prefix}/list`, searchQuery);
    },
    getNextPageParam: getNextPage,
  });
};
export const useNodeWorkerGpuList = (searchQuery) => {
  return useQuery({
    queryKey: [listQueryKey, "list", "gpu-sp", searchQuery],
    queryFn: () => {
      return instance.post(`/${prefix}/gpu-supported`, searchQuery);
    },
    getNextPageParam: getNextPage,
    refetchOnMount: true,
  });
};

export const useNodeWorkerInfo = (id) => {
  return useQuery({
    queryKey: [listQueryKey, "list", id],
    queryFn: () => {
      return instance.get(`/${prefix}/` + id);
    },
    refetchOnMount: true,
  });
};

export const useNodeWorkerCreate = () => {
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
export const useNodeWorkerUpdate = (callback) => {
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  return useMutation({
    mutationFn: (data) => instance.put(`/${prefix}/${data.id}`, data),
    onSuccess(data) {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey, "list"] });
        callback();
      }
    },
  });
};

export const useNodeWorkerDelete = () => {
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  return useMutation({
    mutationFn: (id) => instance.delete(`/${prefix}/${Number(id)}`),
    onSuccess(data) {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey, "list"] });
      } else {
      }
    },
  });
};

export const useNodeWorkerSettingModel = () => {
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
