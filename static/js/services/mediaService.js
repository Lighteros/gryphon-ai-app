import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import instance from "../api";
import { getNextPage, onApiResponse } from "../lib/query";
import { useModal } from "../context/modalContext";
import { useUser } from "../context/AuthContext";

import { useServiceList } from "./commonService";
import useCreditCheck from "../hooks/useCreditCheck";
import { handlerWatermark, toLocalFileUrl } from "../utils/handleImage";
import { useState } from "react";
import { toApiPrompt } from "../helper/handlePrompt";
import { validate, validateAsync } from "../validation";
import { schemaCreate } from "../validation/media";
import { toFormData } from "axios";

const prefix = "media-gen";
const create = (data) => {
  return instance.post(prefix + "/create-multi", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const detail = (id) => {
  return instance.get(`${prefix}/${id}`);
};

const deleteRq = (id) => {
  return instance.delete(`${prefix}/${id}`);
};
const deleteMulti = (ids) => {
  return instance.post(`${prefix}/delete`, ids);
};
const list = (data) => {
  return instance.post(`${prefix}/list`, data);
};
const listModel = (id) => {
  return instance.get(`${prefix}/model`, {
    params: {
      service_id: id,
    },
  });
};
const promptHistory = (data) => {
  return instance.post(`${prefix}/prompts-history`, data);
};
export default {
  detail,
  list,
  create,
  promptHistory,
  deleteRq,
  listModel,
};

const listQueryKey = prefix;
export const useMediaList = (searchQuery, enabledRefetchInterval = false) => {
  return useInfiniteQuery({
    queryKey: [listQueryKey, "list", enabledRefetchInterval, searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      list({ ...searchQuery, page_index: pageParam }),
    refetchOnMount: true,
    getNextPageParam: getNextPage,
    refetchInterval: (res) => {
      if (!enabledRefetchInterval) return false;
      if (res.state.data) {
        const arr =
          res.state.data?.pages.flatMap((el) => el?.data.records) || [];
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

export const useMediaCreate = () => {
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const { fetchUserData, isAuthenticated } = useUser();
  const { data: serviceList } = useServiceList();
  const { checkCredit } = useCreditCheck();
  return useMutation({
    mutationFn: async (data) => {
      if (!isAuthenticated) {
        return {
          success: false,
          error_message: null,
        };
      }
      if (data.prompt) {
        data.original_prompt = data.prompt;
      }
      const validated = validate(data, schemaCreate.body);
      if (!validated.success) {
        return {
          success: false,
          error_message: validated.message,
        };
      }
      if (data.prompt) {
        validated.data.prompt = await toApiPrompt(
          data.prompt,
          data.style_prompt
        );
      }
      if (data.negative_prompt || data.style_negative_prompt) {
        validated.data.negative_prompt = await toApiPrompt(
          data.negative_prompt,
          data.style_negative_prompt
        );
      }
      const s = serviceList?.data.find((x) => x.id === data.service_id);
      if (!checkCredit(s?.credit_pay)) {
        return {
          success: false,
          error_message: "NOT_ENOUGH_CREDIT",
        };
      }
      return create(toFormData(validated.data));
    },
    onSuccess: async (data) => {
      if (onApiResponse(data, true)) {
        fetchUserData(null, true);
        // openModal('result', { file_key: data.data });
        await queryClient.invalidateQueries({
          queryKey: [listQueryKey, "list"],
        });
        setTimeout(() => {
          const element = document.getElementById("result-on-page");
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 600);
      } else {
        if (data?.error_message === "NOT_ENOUGH_CREDIT") {
          openModal("airdrop-missions");
        }
        if (data?.error_message === null) {
          openModal("login");
        }
      }
    },
    refetchOnMount: true,
  });
};
export const useMediaDetail = ({
  id,
  onProcessing,
  initData,
  watermark = true,
  turnOnWatermark = false,
}) => {
  return useQuery({
    queryKey: [listQueryKey, "detail", id, watermark],
    queryFn: async () => {
      const res = await detail(id);
      onProcessing && onProcessing(false);
      if (res.data?.status === "COMPLETED") {
        res.data.isVideo = res.data.result_url.endsWith(".mp4");

        if (!res.data.isVideo) {
          if (turnOnWatermark) {
            res.data.original_result_url = res.data.result_url;
            if (!res.data?.options?.watermark && !res.data.isVideo) {
              res.data.result_url_watermark = await handlerWatermark(
                res.data.original_result_url
              );
              res.data.result_url = await toLocalFileUrl(
                res.data.original_result_url,
                false,
                (blob) => (res.data.blob = blob)
              );
            } else {
              res.data.result_url = await toLocalFileUrl(
                res.data.original_result_url,
                false,
                (blob) => (res.data.blob = blob)
              );
            }
          }
        } else {
        }
        res.data.original_result_url = res.data.result_url;
        console.log(res.data);

        onProcessing && onProcessing(true);
      }
      return res;
    },
    refetchInterval: (res) => {
      if (res.state.data?.data?.status === "COMPLETED") {
        return false;
      }

      return 3500;
    },
    initialData: initData,
  });
};
export const useMediaDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRq,
    onSuccess: (data) => {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey, "list"] });
      } else {
      }
    },
  });
};
export const useMediaDeleteMulti = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMulti,
    onSuccess: (data) => {
      if (onApiResponse(data)) {
        queryClient.invalidateQueries({ queryKey: [listQueryKey, "list"] });
      } else {
      }
    },
  });
};
export const useMediaPromptHistory = (id) => {
  return useQuery({
    queryKey: [listQueryKey, "history", id],
    queryFn: () => promptHistory(id),
  });
};
export const useFetchImage = ({ src, watermark = true, isVideo }) => {
  return useQuery({
    queryKey: ["fetch-image", src, watermark, isVideo],
    queryFn: async () => {
      if (watermark && !isVideo) {
        return await handlerWatermark(src);
      } else {
        return await toLocalFileUrl(src);
      }
    },
  });
};
export const useModel = (id) => {
  return useQuery({
    queryKey: [listQueryKey, "model", "user", id],
    queryFn: () => listModel(id),
    refetchOnMount: true,
  });
};
