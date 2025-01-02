import React, { useState } from "react";
import { useToggle } from "./useToggle";

const usePageable = (page_size = 12) => {
  const [pageable, setPageable] = useState({
    page_index: 1,
    page_size: page_size,
    hasNextPage: true,
  });
  const [fetchingNextPage, toggleFetchingNextPage] = useToggle(false);
  const [isLoading, setLoading] = useState(true);
  function setPaging(data) {
    if (data.page_index < Math.min(data.total_item / data.page_size)) {
      setPageable({
        hasNextPage: true,
        page_index: data.page_index + 1,
        page_size: data.page_size,
      });
    } else {
      setPageable({
        hasNextPage: false,
        page_index: data.page_index,
        page_size: data.page_size,
      });
    }
  }
  return {
    ...pageable,
    setPaging,
    fetchingNextPage,
    toggleFetchingNextPage,
    isLoading,
    setLoading,
  };
};

export default usePageable;
