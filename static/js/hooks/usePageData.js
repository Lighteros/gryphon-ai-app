import React, { useMemo } from "react";

const usePageData = (pageData) => {
  const data = useMemo(
    () => pageData?.pages.flatMap((el) => el?.data.records) || [],
    [pageData?.pages]
  );
  return { dataList: data };
};

export default usePageData;
