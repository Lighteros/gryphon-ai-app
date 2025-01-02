import { useMemo } from "react";
import commonService, { useServiceList } from "../services/commonService";

const useServiceCredit = (id) => {
  const { data: serviceList } = useServiceList();

  const service = useMemo(() => {
    if (!serviceList?.data) {
      return {
        id,
      };
    }
    const s = serviceList.data.find((x) => x.id === id);

    return s;
  }, [serviceList, id]);
  return { service };
};

export default useServiceCredit;
