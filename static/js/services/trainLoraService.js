import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../api";
import { getNextPage, onApiResponse } from "../lib/query";
import { toFormData } from "axios";

const prefix = "pretrain";
const listQueryKey = prefix;

export const useGetTrainLora = () => {
  return useQuery({
    queryKey: [listQueryKey],
    queryFn: () => {
      return instance.get(`${prefix}/model`);
    },
  });
};
export const useGetHistoryTrainLora = (
  searchQuery,
  enabledRefetchInterval = false
) => {
  return useQuery({
    queryKey: [listQueryKey],
    queryFn: () => {
      return instance.post(`${prefix}/history`, searchQuery);
    },
    refetchOnMount: true,
    getNextPageParam: getNextPage,
    refetchInterval: (res) => {
      if (!enabledRefetchInterval) return false;
      if (res.state.data) {
        const arr = res.state.data?.data?.records || [];
        if (
          !arr.some(
            (item) => item.status === "NEW" || item.status === "PROCESSING"
          )
        ) {
          return false;
        }
      }

      // const completed = arr.every((item) => item.status === 'COMPLETED');
      // if (completed) {
      //   return false;
      // }
      return 5000;
    },
  });
};
export const usePostTrainLora = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return instance.post(`${prefix}`, toFormData(data));
    },
    onSuccess(data) {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey] });
        callback && callback();
      }
    },
  });
};
export const useMediaDetail = ({ id }) => {
  return useQuery({
    queryKey: [listQueryKey, "detail", id],
    queryFn: () => instance.get(`${prefix}/${id}`),
    refetchInterval: (res) => {
      if (res.state.data?.data?.status === "COMPLETED") {
        return false;
      }
      return 3500;
    },
  });
};
