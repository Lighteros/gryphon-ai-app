import React, { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useGetHistoryTrainLora } from "../../services/trainLoraService";
import { toLocalTime } from "../../utils/timeUtils";
import { toImageUrl } from "../../utils/file";
import { Link } from "react-router-dom";
import LoadingText from "../Loading/LoadingText";
const ModalHistoryTrain = ({ isOpenHistory, setIsOpenHistory }) => {
  const { data: dataHistory, isLoading } = useGetHistoryTrainLora(
    {
      page_index: 1,
      page_size: 10,
    },
    true
  );
  return (
    <Dialog
      open={isOpenHistory}
      onClose={() => setIsOpenHistory(false)}
      className="relative z-50 "
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-md" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4  ">
        <DialogPanel
          transition={isOpenHistory}
          className="h-[80vh] w-[90vw] md:h-[60vh] md:w-[60vw] xl:h-[60vh] xl:w-[40vw] relative max-w-[100vw] bg-[#1D1F23] rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <div className="flex flex-col gap-10 h-full p-4 md:p-6 rounded-xl">
            <div className="flex justify-between items-center border-b border-[#323339] pb-6">
              <h1 className="text-3xl text-white font-bold">History</h1>
              <div
                className="popup__close js-close-popup"
                onClick={() => setIsOpenHistory(false)}
              ></div>
            </div>
            <div className="flex flex-col items-center gap-4 mb-6 overflow-y-scroll overflow-x-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center w-full">
                  <LoadingText />
                </div>
              ) : dataHistory?.data?.records?.length > 0 ? (
                dataHistory.data.records.map((item) => (
                  <HistoryItem key={item?.id} item={item} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <img
                    src="/assets/images/img_history_empty.png"
                    alt="404"
                    style={{ paddingBottom: 10 }}
                  />
                  <p className="text-[#FF4C13] text-3xl">
                    You haven't created any models yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalHistoryTrain;
const HistoryItem = ({ key, item }) => {
  const [progress, setProgress] = useState(
    item.status === "COMPLETED" ? 100 : 0
  );
  useEffect(() => {
    const interval = setInterval(() => {
      if (item.status === "COMPLETED") {
        setProgress(100);
        clearInterval(interval);
        return;
      }
      if (progress < 95) {
        setProgress((prev) => Math.min(prev + 5, 95)); // Increase progress by 5%
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [item.status]);
  return (
    <Link
      key={key}
      to={
        item?.status === "COMPLETED"
          ? `/flux-gen?model=${item?.request_key}`
          : ""
      }
      className="flex flex-col flex-wrap items-center justify-center gap-4 w-full md:flex-row cursor-pointer border-slate-600 border-b-2  md:items-center hover:bg-white/5 px-4 mb-4 py-2"
    >
      <img
        alt="Person's face"
        className="w-32 h-32 rounded-md"
        src={toImageUrl(item?.thumbnail)}
      />
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <span className="font-bold text-xl md:text-2xl">
            {item?.request_key}
          </span>
          <div className="flex items-center md:ml-4">
            <p className="text-xl md:text-2xl text-[#ff4c13]">{item?.status}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="#ff4c13"
                strokeWidth="1.7"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <div className="bg-gray-200 h-2 rounded-full mt-2 mb-1 overflow-hidden">
          <div
            className={`h-2 rounded-full ${
              progress === 100
                ? "bg-[#ff4c13] w-full"
                : progress > 0
                ? `bg-[#ff4c13]`
                : ""
            }`}
            style={{
              transition: "width 1s ease-in-out",
              width: `${progress}%`,
            }}
          ></div>
        </div>
        <div className="text-gray-500 text-xl flex flex-row justify-between items-center">
          <span>{toLocalTime(item?.create_time, "DD-MM-YYYY, HH:mm:ss")}</span>
        </div>
      </div>
    </Link>
  );
};
