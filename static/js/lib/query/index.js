import toast from "../toast";

export const onApiResponse = (data, disableToast) => {
  if (data.success) {
    if (!disableToast) toast.success();
    return true;
  }
  return false;
};
export const getNextPage = (data) => {
  const page = data?.data;
  if (!page) return undefined;
  if (page.page_index < Math.min(page.total_item / page.page_size)) {
    return page?.page_index + 1;
  }
  return undefined;
};
export function toApiResponseData(data) {
  return {
    data,
  };
}
