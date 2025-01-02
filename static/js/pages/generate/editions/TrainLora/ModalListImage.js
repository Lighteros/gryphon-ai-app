import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Textarea,
} from "@headlessui/react";
import React from "react";
import Button from "../../../../components/Ui/Button";

const ModalListImage = ({
  captions,
  setCaptions,
  index,
  setIndex,
  isOpen,
  setIsOpen,
  slides,
}) => {
  const handleNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrev = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  const handleCaptionChange = (e) => {
    setCaptions(`selectedFile1.[${index}].captions`, e.target.value);
  };
  const handleAppendCaption = () => {
    setIsOpen(false);
    setIndex(0);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[1] md:w-[50vw] "
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-md" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
        <DialogPanel
          transition={isOpen}
          className=" max-w-[100vw] bg-[#1D1F23] rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <CloseButton
            className="popup__close"
            style={{ zIndex: 2 }}
          ></CloseButton>
          <div className="relative  grid grid-cols-1 gap-10 p-4 sm:grid-cols-1 lg:grid-cols-2 md:p-6 ">
            <div className="flex justify-center items-center  relative gap-4 h-[50vh] border-b-[0.5px] px-4 md:border-r-[0.5px] md:border-b-0">
              {index > 0 ? (
                <button
                  onClick={handlePrev}
                  className=" transform bg-[#383A42] bg-opacity-50 w-[40px] aspect-square  rounded-full flex  justify-center items-center"
                >
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.292787 7.70694C0.105316 7.51941 0 7.26511 0 6.99994C0 6.73478 0.105316 6.48047 0.292787 6.29294L5.94979 0.635942C6.13839 0.453783 6.39099 0.352989 6.65319 0.355268C6.91538 0.357546 7.1662 0.462715 7.35161 0.648124C7.53701 0.833532 7.64218 1.08434 7.64446 1.34654C7.64674 1.60874 7.54594 1.86134 7.36379 2.04994L2.41379 6.99994L7.36379 11.9499C7.54594 12.1385 7.64674 12.3911 7.64446 12.6533C7.64218 12.9155 7.53701 13.1664 7.35161 13.3518C7.1662 13.5372 6.91538 13.6423 6.65319 13.6446C6.39099 13.6469 6.13839 13.5461 5.94979 13.3639L0.292787 7.70694Z"
                      fill="#D0D0D0"
                    />
                  </svg>
                </button>
              ) : (
                <button className="transform  bg-opacity-50  w-[40px] aspect-square  rounded-full "></button>
              )}
              <div className="slider-images aspect-square h-full flex items-center justify-center w-full ">
                <img
                  src={slides[index]?.src}
                  alt={`Slide ${index + 1}`}
                  className=" max-h-full max-w-full object-contain  rounded-lg"
                />
              </div>
              {index < slides.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="transform bg-[#383A42] bg-opacity-50  w-[40px] aspect-square  rounded-full flex  justify-center items-center"
                >
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.70721 7.70694C7.89468 7.51941 8 7.26511 8 6.99994C8 6.73478 7.89468 6.48047 7.70721 6.29294L2.05021 0.635942C1.86161 0.453783 1.60901 0.352989 1.34681 0.355268C1.08462 0.357546 0.833803 0.462715 0.648395 0.648124C0.462986 0.833532 0.357818 1.08434 0.355539 1.34654C0.353261 1.60874 0.454055 1.86134 0.636213 2.04994L5.58621 6.99994L0.636213 11.9499C0.454055 12.1385 0.353261 12.3911 0.355539 12.6533C0.357818 12.9155 0.462986 13.1664 0.648395 13.3518C0.833803 13.5372 1.08462 13.6423 1.34681 13.6446C1.60901 13.6469 1.86161 13.5461 2.05021 13.3639L7.70721 7.70694Z"
                      fill="#D0D0D0"
                    />
                  </svg>
                </button>
              ) : (
                <button className="transform  bg-opacity-50  w-[40px] aspect-square  rounded-full "></button>
              )}
            </div>
            <div className="h-full flex flex-col gap-6">
              <h1 className="text-3xl font-bold">Add caption to image</h1>
              <Textarea
                key={index}
                className="form-control-2 h-[100px] md:h-[250px]"
                placeholder="Enter your caption"
                value={captions?.[index]?.captions}
                onChange={handleCaptionChange}
              />
              <Button onClick={handleAppendCaption}>Confirm</Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalListImage;
