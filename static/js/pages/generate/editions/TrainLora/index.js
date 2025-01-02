/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Ui/Button";

import FileDropInput from "../../../../components/Ui/FileDropInput";
import { CustomSelect } from "../../../../components/Select/CustomSelect";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Field,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import { usePostTrainLora } from "../../../../services/trainLoraService";
import { z } from "zod";
import toast from "../../../../lib/toast";
import ModalListImage from "./ModalListImage";
import ModalHistoryTrain from "../../../../components/ModalTransition/ModalHistoryTrain";
import LoadingText from "../../../../components/Loading/LoadingText";
import ModalConfirmation from "../../../../components/ModalTransition/ModalConfirmation";

const Pretrain = () => {
  const { mutate, isPending } = usePostTrainLora(() => {
    setIsOpenHistory(true);
  });
  const [isDatasetUpload, setIsDatasetUpload] = useState(false);
  const { watch, setValue, register } = useForm({
    defaultValues: {
      selectedFile1: [],
      crop_size: {
        width: 1024,
        height: 1024,
      },
      cropping: "Central",
      trigger_word: "",
      model_name: "",
      description: "",
    },
  });

  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [isOpenLightBox, setIsOpenLightBox] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const checkImage = watch("selectedFile1").length > 0;
  const [originalImageUrls, setOriginalImageUrls] = useState([]);
  const handleCrop = async () => {
    const noCrop = watch().cropping;
    let updatedImages;
    if (noCrop === "nocrop") {
      updatedImages = originalImageUrls.map((file, index) => ({
        ...file.file,
        captions: watch().selectedFile1[index]?.captions,
      }));
    } else {
      updatedImages = await Promise.all(
        originalImageUrls.map(async (url, index) => {
          const image = new Image();
          image.src = url.initUrl;
          return new Promise((resolve) => {
            image.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              canvas.width = Math.min(watch().crop_size.width);
              canvas.height = Math.min(watch().crop_size.height);
              ctx.drawImage(
                image,
                (image.naturalWidth - canvas.width) / 2,
                (image.naturalHeight - canvas.height) / 2,
                canvas.width,
                canvas.height,
                0,
                0,
                canvas.width,
                canvas.height
              );
              canvas.toBlob((blob) => {
                const captions = watch().selectedFile1[index]?.captions;
                const file = new File([blob], url.initUrl, {
                  type: "image/jpeg",
                });
                resolve({
                  file: file, // Ensure file is included in the object
                  width: canvas.width,
                  height: canvas.height,
                  url: URL.createObjectURL(file),
                  originalUrl: url.initUrl,
                  initWidth: url.initWidth,
                  initHeight: url.initHeight,
                  captions: captions,
                });
              }, "image/jpeg");
            };
          });
        })
      );
    }
    setValue("selectedFile1", updatedImages);
  };
  const handleFileDrop = (files) => {
    setIsDatasetUpload(false);
    const currentFiles = watch("selectedFile1");
    if (currentFiles.length + files.length > 200) {
      return;
    }
    const newFiles = files.map((file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      return new Promise((resolve) => {
        img.onload = () => {
          resolve({
            file: file,
            url: img.src,
            width: img.width,
            height: img.height,
          });
        };
      });
    });
    Promise.all(newFiles).then((resolvedFiles) => {
      setValue("selectedFile1", [...currentFiles, ...resolvedFiles]);
      setOriginalImageUrls([
        ...originalImageUrls,
        ...resolvedFiles?.map((file) => ({
          file: file,
          initUrl: file.url,
          initWidth: file?.width,
          initHeight: file?.height,
        })),
      ]);
    });
  };
  const handleSubmit = () => {
    const bodySchema = z.object({
      trigger_word: z
        .string()
        .min(1, {
          message: "Trigger word is required",
        })
        .max(200, {
          message: "Trigger word must be less than 200 characters",
        }),
      model_name: z
        .string()
        .min(1, {
          message: " Lora model name  is required",
        })
        .max(200, {
          message: "Lora model name  must be less than 200 characters",
        }),
      description: z
        .string()
        .max(500, {
          message: "Description must be less than 500 characters",
        })
        .optional(),
      media: z
        .array(z.instanceof(File))
        .min(8, "File must be minimum 8 images"),
      file_data: z
        .array(
          z.object({
            captions: z.string().nullish(),
          })
        )
        .optional(),
    });
    const body = {
      media: watch().selectedFile1.map((file) => file.file),
      file_data: watch().selectedFile1.map((e) => ({
        captions: e.captions,
      })),
      ...watch(),
    };
    const parsedBody = bodySchema.safeParse(body);
    if (!parsedBody.success) {
      toast.error(parsedBody.error);
      return;
    } else {
      setIsOpenConfirmation(true);
    }
    if (isOpenConfirmation) {
      mutate(parsedBody.data);
      setIsOpenConfirmation(false);
    }
  };
  const onDatasetDrop = useCallback(async (acceptedFiles) => {
    const getImageDimensions = (file) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height,
            url: img.src,
          });
        };
      });
    };

    const readTextFile = async (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(file);
      });
    };
    try {
      const groupedFiles = acceptedFiles.reduce((acc, file) => {
        const baseName = file.name.substring(0, file.name.lastIndexOf("."));
        if (!acc[baseName]) {
          acc[baseName] = {};
        }

        const ext = file.name.split(".").pop().toLowerCase();
        if (["png", "jpg", "jpeg"].includes(ext)) {
          acc[baseName].image = file;
        } else if (ext === "txt") {
          acc[baseName].caption = file;
        }

        return acc;
      }, {});

      const newPreviews = await Promise.all(
        Object.entries(groupedFiles).map(async ([baseName, files]) => {
          if (files.image && files.caption) {
            // Get image dimensions and caption content in parallel
            const [imageDimensions, captionContent] = await Promise.all([
              getImageDimensions(files.image),
              readTextFile(files.caption),
            ]);

            return {
              url: imageDimensions.url,
              width: imageDimensions.width,
              height: imageDimensions.height,
              captions: captionContent,
              file: files.image,
            };
          }
          return null;
        })
      );

      const validPreviews = newPreviews.filter((preview) => preview !== null);
      if (validPreviews) {
        setIsDatasetUpload(true);
      }
      setValue("selectedFile1", validPreviews);
      // Log the processed data
      // console.log('Processed files:', validPreviews);
    } catch (error) {
      console.error("Error processing files:", error);
      // You might want to show an error toast here
    }
  }, []);
  return (
    <div className="content-page">
      <div className="p-content content-left m-l">
        <div className="p-4 bg-[#1D1F23] rounded md:p-10 flex flex-col gap-4 md:flex-row space-y-4 md:space-y-0 md:space-x-4 h-fit">
          <div className="w-full md:w-1/3 bg-[#26282E] p-4 rounded-xl md:p-10 flex flex-col gap-8 justify-between ">
            <div className="flex flex-col gap-8">
              <h2 className="text-xxl font-bold ">
                <span className="circle-icon">1</span> Setting
              </h2>
              <Field>
                <Label className="text-white mb-2 whitespace-nowrap text-2xl">
                  Model Type
                </Label>
                <div
                  className={`rounded-xl p-2 flex-shrink-0 border-2 border-orange-500 w-fit`}
                >
                  <div className="relative">
                    <img
                      src="https://storage.googleapis.com/a1aa/image/epQhEeSHYaviK0wiYSsCaSfmM5nLTaoVq3FolGAy5TfWUKbPB.jpg"
                      alt="Sample image"
                      className="w-28 h-28 md:w-40 md:h-40 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 text-center text-md bg-orange-500 text-black font-semibold">
                      FLUX
                    </div>
                  </div>
                </div>
              </Field>
              <Field>
                <Label className="text-white mb-2 whitespace-nowrap text-2xl">
                  Lora Model Name
                </Label>
                <Input
                  className={"form-control-2"}
                  {...register("model_name")}
                  placeholder="Enter lora model name"
                />
              </Field>
              <Field>
                <Label className="text-white mb-2 whitespace-nowrap text-2xl">
                  Trigger Words
                </Label>
                <Input
                  type="text"
                  className={"form-control-2"}
                  {...register("trigger_word")}
                  placeholder="Enter trigger words"
                  onChange={(e) => setValue("trigger_word", e.target.value)}
                />
              </Field>
              <Field>
                <Label className="text-white mb-2 whitespace-nowrap text-2xl">
                  Description
                </Label>
                <Textarea
                  placeholder="Enter description"
                  className="form-control-2 min-h-[100px] md:min-h-[150px]"
                  {...register("description")}
                ></Textarea>
              </Field>
            </div>
            <div className="flex bg-[#26282E] w-full justify-between items-center space-x-2 rounded-xl ">
              <Button
                className="btn-border gap-2 flex-1 h-[50%] !bg-[#808080] text-white font-semibold py-2 px-6 rounded-lg"
                onClick={() => setIsOpenHistory(true)}
              >
                History
                <img
                  src="/assets/images/history_icon.svg"
                  alt="icon_history"
                  width={14}
                />
              </Button>

              <Button
                className="btn-border flex-1 h-[50%] !bg-gradient-to-r from-[#FF5D01] to-[#FFC60B] text-white font-semibold py-2 px-6 rounded-lg"
                onClick={handleSubmit}
                loading={isPending}
              >
                START
              </Button>
            </div>
          </div>
          <div className="w-full md:w-2/3 flex flex-col justify-between gap-4 bg-[#26282E] p-4 rounded-xl relative md:p-10 max-h-full h-fit">
            <div
              className="w-full h-full absolute top-0 left-0 backdrop-blur-sm z-40 items-center justify-center"
              style={{ display: isPending ? "flex" : "none" }}
            >
              <LoadingText />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex items-center md:flex-row  justify-between gap-4">
                <h2 className="text-xxl font-bold ">
                  <span className="circle-icon">2</span> Crop
                </h2>
                {checkImage ? (
                  <div className="flex items-center flex-col justify-between gap-4 md:flex-row">
                    <button
                      className="bg-[#323339] flex items-center gap-2 justify-center py-2 px-10 rounded-lg w-full h-[40px]"
                      onClick={() => {
                        setValue("selectedFile1", []);
                        setOriginalImageUrls([]);
                        setIsDatasetUpload(false);
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.25 6.74994V11.2499C8.25021 11.4411 8.32341 11.625 8.45464 11.764C8.58586 11.903 8.76521 11.9866 8.95605 11.9978C9.14688 12.009 9.33478 11.9469 9.48137 11.8242C9.62796 11.7016 9.72217 11.5275 9.74475 11.3377L9.75 11.2499V6.74994H14.25C14.6284 6.74982 14.9929 6.89275 15.2704 7.15007C15.5479 7.40738 15.7179 7.76008 15.7463 8.13744L15.75 8.24994V14.9999C15.7501 15.3784 15.6072 15.7429 15.3499 16.0204C15.0926 16.2978 14.7399 16.4678 14.3625 16.4962L14.25 16.4999H3.75C3.37157 16.5001 3.00708 16.3571 2.72959 16.0998C2.4521 15.8425 2.28213 15.4898 2.25375 15.1124L2.25 14.9999V8.24994C2.24988 7.87151 2.3928 7.50702 2.65012 7.22953C2.90744 6.95205 3.26013 6.78207 3.6375 6.75369L3.75 6.74994H8.25ZM9.663 1.85169L12.1823 4.37019C12.323 4.51092 12.402 4.70179 12.402 4.90082C12.402 5.09984 12.323 5.29071 12.1823 5.43144C12.0415 5.57217 11.8506 5.65123 11.6516 5.65123C11.4526 5.65123 11.2617 5.57217 11.121 5.43144L9.75 4.05969V6.74994H8.25V4.05969L6.879 5.43144C6.80932 5.50113 6.72659 5.5564 6.63555 5.59411C6.5445 5.63182 6.44692 5.65123 6.34838 5.65123C6.24983 5.65123 6.15225 5.63182 6.0612 5.59411C5.97016 5.5564 5.88743 5.50113 5.81775 5.43144C5.74807 5.36176 5.69279 5.27903 5.65508 5.18799C5.61737 5.09694 5.59796 4.99936 5.59796 4.90082C5.59796 4.80227 5.61737 4.70469 5.65508 4.61365C5.69279 4.5226 5.74807 4.43988 5.81775 4.37019L8.33775 1.85169C8.51354 1.67605 8.75188 1.57739 9.00037 1.57739C9.24887 1.57739 9.48721 1.67605 9.663 1.85169Z"
                          fill="white"
                        />
                      </svg>
                      Re-upload
                    </button>

                    {!isDatasetUpload ? (
                      <FileDropInput
                        onDrop={handleFileDrop}
                        multiple={true}
                        type="empty"
                        className=""
                        description=""
                      >
                        {" "}
                        <button className="bg-[#323339] flex items-center gap-2 justify-center py-2 px-10 rounded-lg text-nowrap h-[40px] ">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 1.125C6.91926 1.15025 4.93086 1.98804 3.45945 3.45945C1.98804 4.93086 1.15025 6.91926 1.125 9C1.15025 11.0807 1.98804 13.0691 3.45945 14.5406C4.93086 16.012 6.91926 16.8498 9 16.875C11.0807 16.8498 13.0691 16.012 14.5406 14.5406C16.012 13.0691 16.8498 11.0807 16.875 9C16.8498 6.91926 16.012 4.93086 14.5406 3.45945C13.0691 1.98804 11.0807 1.15025 9 1.125ZM13.5 9.5625H9.5625V13.5H8.4375V9.5625H4.5V8.4375H8.4375V4.5H9.5625V8.4375H13.5V9.5625Z"
                              fill="white"
                            />
                          </svg>
                          Add images
                        </button>
                      </FileDropInput>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div
                className="overflow-y-scroll"
                style={{ height: "calc(62vh)" }}
              >
                {checkImage ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {watch("selectedFile1")?.map((image, index) => (
                      <div key={index} className="relative h-full">
                        <div
                          className="absolute top-0 p-2 w-full font-semibold "
                          style={{
                            background:
                              "linear-gradient(0deg, transparent, rgba(0, 0, 0, 0.6))",
                          }}
                        >
                          {image?.width}*{image?.height}
                        </div>
                        <img
                          src={image.url}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-full object-cover rounded aspect-square"
                          onClick={() => {
                            setCurrentIndex(index);
                            setIsOpenLightBox(true);
                          }}
                        />
                        <div
                          className="swap-list__close absolute top-2 right-2 bg-black/50 p-1 rounded-full cursor-pointer"
                          onClick={() => {
                            const newFiles = watch("selectedFile1").filter(
                              (_, i) => i !== index
                            );
                            const newOriginalImageUrls =
                              originalImageUrls.filter((_, i) => i !== index);

                            setValue("selectedFile1", newFiles);
                            setOriginalImageUrls(newOriginalImageUrls);
                          }}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        {image?.captions ? (
                          <div
                            className="absolute bottom-0 p-2 w-full font-semibold line-clamp-1"
                            style={{
                              background: " rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            {image?.captions}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-center mb-4">
                        <i className="fas fa-upload text-4xl mb-2"></i>
                        <FileDropInput
                          onDrop={handleFileDrop}
                          multiple={true}
                          type="empty"
                          className=""
                        >
                          <p className="text-xxl text-[#FF4C13] font-semibold cursor-pointer underline">
                            Upload images
                          </p>
                        </FileDropInput>
                        <p className="text-xl text-gray-400">
                          Up to 200 images. Supporting png/jpg/jpeg
                        </p>
                      </div>
                      <p className="text-xl text-gray-400 mb-4">OR</p>
                      <FileDropInput
                        onDrop={onDatasetDrop}
                        accept={{
                          "image/*": [".png", ".jpg", ".jpeg"],
                          "text/plain": [".txt"],
                        }}
                        multiple={true}
                        type="empty"
                        className=""
                      >
                        <p className="text-xxl text-[#FF4C13] font-semibold cursor-pointer underline">
                          Add an existing dataset
                        </p>
                      </FileDropInput>
                      <p className="text-xl text-gray-400 mt-4">
                        Please ensure that each image corresponds to its
                        respective caption file
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="  flex-col md:flex-row gap-2 items-end "
                style={{ display: isDatasetUpload ? "none" : "flex" }}
              >
                <div className="flex flex-col flex-1 w-full">
                  <label className="text-white mb-1">Cropping</label>
                  <CustomSelect
                    data={[
                      { key: "central", value: "Central" },
                      { key: "nocrop", value: "No crop" },
                    ]}
                    value={watch.cropping}
                    setValue={(pre) => setValue("cropping", pre)}
                    position="top"
                    disabled={!checkImage}
                  />
                </div>
                <div className="flex flex-col flex-1 w-full">
                  <label className="text-white mb-1 whitespace-nowrap">
                    Crop size
                  </label>
                  <CustomSelect
                    data={[
                      { key: "1024*1024", value: "1024*1024" },
                      // { key: '768*512', value: '768*512' },
                      // { key: '512*768', value: '512*768' },
                      // { key: '768*768', value: '768*768' },
                      // { key: '512*512', value: '512*512' }
                    ]}
                    value={watch.crop_size}
                    setValue={(pre) => {
                      const size = pre.split("*").map(Number);
                      setValue("crop_size", {
                        width: size[0],
                        height: size[1],
                      });
                    }}
                    position="top"
                    disabled={!checkImage || watch().cropping === "nocrop"}
                  />
                </div>

                <div className="flex flex-col flex-1 w-full !h-[36px]">
                  <Button
                    onClick={handleCrop}
                    className="flex-1 !bg-gradient-to-r from-[#FF5D01] to-[#FFC60B] w-full"
                    disabled={!checkImage}
                    type="empty"
                  >
                    <p className="py-2">CROP</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {checkImage ? (
        <ModalListImage
          index={currentIndex}
          setIndex={setCurrentIndex}
          captions={watch().selectedFile1}
          setCaptions={setValue}
          isOpen={isOpenLightBox}
          setIsOpen={setIsOpenLightBox}
          slides={watch().selectedFile1.map((img) => ({
            src: img.url,
          }))}
        />
      ) : null}
      {isOpenHistory && (
        <ModalHistoryTrain
          isOpenHistory={isOpenHistory}
          setIsOpenHistory={setIsOpenHistory}
        />
      )}
      {isOpenConfirmation && (
        <Dialog
          open={isOpenConfirmation}
          onClose={() => setIsOpenConfirmation(false)}
          className="relative z-50 "
        >
          <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-md" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4  ">
            <DialogPanel
              transition={isOpenConfirmation}
              className="h-max-content w-[90vw]  md:w-[60vw]  xl:w-[40vw] relative max-w-[100vw] bg-[#1D1F23] rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex flex-col gap-10 h-full p-4 md:p-6 rounded-xl">
                <div className="flex justify-between items-center border-b border-[#323339] pb-6">
                  <h1 className="text-3xl text-white font-bold">
                    Confirmation Required
                  </h1>
                  <div
                    className="popup__close js-close-popup"
                    onClick={() => setIsOpenConfirmation(false)}
                  ></div>
                </div>
                <div className="flex flex-col items-center gap-4 mb-6  text-3xl">
                  Your new Model training cost XXX credits. Do you wish to
                  continue?
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    className="btn-border gap-2 flex-1 h-[50%] !bg-[#808080] text-white font-semibold py-2 px-6 rounded-lg"
                    onClick={() => setIsOpenConfirmation(false)}
                  >
                    No, Cancel
                  </Button>
                  <Button
                    className="btn-border gap-2 flex-1 h-[50%] !bg-gradient-to-r from-[#FF5D01] to-[#FFC60B] text-white font-semibold py-2 px-6 rounded-lg"
                    onClick={handleSubmit}
                  >
                    Yes, Proceed
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};
export default Pretrain;
