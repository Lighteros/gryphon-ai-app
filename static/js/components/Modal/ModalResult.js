import { useMemo, useState } from "react";
import { useModal } from "../../context/modalContext";
import ImageResultPage from "../../pages/ImageResultPage";

const ModalResult = () => {
  const { data: initData } = useModal();
  console.log(initData);

  const [index, setIndex] = useState(
    initData.group?.findIndex((item) => item.file_key === initData.file_key) ||
      0
  );
  const data = useMemo(() => {
    return initData.group ? initData.group[index] : initData;
  }, [initData, index]);
  // useEffect(() => {
  //   if (initData.group) {
  //     const i = initData.group.find((item) => item.file_key === initData.file_key);
  //     setIndex(i);
  //   }
  // }, [data]);
  return (
    <ImageResultPage
      from={data?.from}
      fileKey={data?.file_key}
      result_url={data?.result_url}
      init_img={data?.init_img}
      status={data?.status}
      setIndex={setIndex}
      index={index}
      total={initData?.group?.length}
      options={data?.options}
      service_id={data?.service_id}
    />
  );
};

export default ModalResult;
