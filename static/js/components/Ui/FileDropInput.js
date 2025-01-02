import clsx from "clsx";
import React from "react";
import heic2any from "heic2any";
import { useDropzone } from "react-dropzone";
import toast from "../Shared/toast";
import loadImage from "blueimp-load-image";
import { generateRandomString } from "../../utils";
import {
  ALLOWED_AUDIO_TYPE_LIB,
  ALLOWED_IMAGE_TYPE_LIB,
  ALLOWED_VIDEO_TYPE_LIB,
} from "../../lib/inputCheck";

// function FileDropInput({
//   onDrop,
//   description = 'The maximum file size allowed is 50MB.',
//   className,
//   type = 'swap',
//   isVideo = false,
//   name = 'swap1'
// }) {
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: async (files) => {
//       if (files?.[0].type === 'image/heic') {
//         toast.loading('Please wait!');

//         const imageData = await heic2any({ blob: files[0], toType: 'image/jpeg' });
//         files[0] = new File([imageData], `image.${imageData?.type?.split('/')?.at(1)}`, {
//           type: imageData.type
//         });
//       }
//       loadImage(
//         files[0],
//         function (img, data) {
//           if (data.imageHead && data.exif) {
//             loadImage.writeExifData(data.imageHead, data, 'Orientation', 1);
//             img.toBlob(function (blob) {
//               loadImage.replaceHead(blob, data.imageHead, function (newBlob) {
//                 if (newBlob)
//                   files[0] = new File(
//                     [newBlob],
//                     `${generateRandomString(8)}/${newBlob.type.split('/').at(1)}`,
//                     { type: newBlob.type }
//                   );
//                 onDrop(files);
//               });
//             }, 'image/jpeg');
//           } else {
//             onDrop(files);
//           }
//         },
//         { meta: true, orientation: true, canvas: true }
//       );
//     },
//     accept: isVideo ? ALLOWED_VIDEO_TYPE_LIB : ALLOWED_IMAGE_TYPE_LIB,
//     multiple: false
//   });
//   const { ...rest } = getInputProps();

//   return (
//     <div
//       {...getRootProps()}
//       className={clsx(className, type === 'swap' ? 'swap-list__file' : 'edition-update__file')}
//       style={type === 'swap' ? { aspectRatio: 1 } : undefined}
//       // htmlFor={name}
//     >
//       <input {...rest} />
//       <p className="ttl">
//         Drop and drag or <span className="anchor">choose file</span> here to upload
//       </p>
//       <p className="note">{description}</p>
//     </div>
//   );
// }
function FileDropInput({
  onDrop,
  disabled = false,
  description = "The maximum file size allowed is 50MB.",
  className = "p-genarate-type__file",
  inputType = "image",
  children = (
    <>
      {disabled ? (
        <p className="ttl">{description}</p>
      ) : (
        <p className="ttl">
          Drop and drag or <span className="anchor">choose file</span> here to
          upload
        </p>
      )}

      <p className="note">{description}</p>
    </>
  ),
  type = "swap",
  maxSize = 50,
  durantion,
  isVideo = false,
  multiple = false,
  accept,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      let wait = 0;
      const newFiles = [];
      for (let file of files) {
        if (file.type.startsWith("video")) {
          const fileValid = durantion
            ? await new Promise((resolve) => {
                const video = document.createElement("video");
                video.preload = "metadata";
                video.onloadedmetadata = () => {
                  if (video.duration > durantion) {
                    toast.error(`Video must be under ${durantion} seconds.`);
                    resolve(null);
                  } else {
                    file.durantion = durantion;
                    resolve(file);
                  }
                };
                video.src = URL.createObjectURL(file);
              })
            : file;
          if (fileValid) {
            newFiles.push(fileValid);
          }
        } else if (file.type.toLowerCase().startsWith("image")) {
          if (file.type.toLowerCase() === "image/heic") {
            if (window !== undefined) {
              if (wait === 0) {
                toast.loading("Please wait!");
                wait++;
              }
              const imageData = await heic2any({
                blob: file,
                toType: "image/jpeg",
              });
              file = new File(
                [imageData],
                `image.${imageData.type.split("/").at(1)}`,
                {
                  type: imageData.type,
                }
              );
            }
          }
          const fileValid = await new Promise((resolve) => {
            loadImage(
              file,
              function (img, data) {
                if (data.imageHead && data.exif) {
                  loadImage.writeExifData(
                    data.imageHead,
                    data,
                    "Orientation",
                    1
                  );
                  img.toBlob(function (blob) {
                    loadImage.replaceHead(
                      blob,
                      data.imageHead,
                      function (newBlob) {
                        if (newBlob) {
                          const newFile = new File(
                            [newBlob],
                            `${generateRandomString(8)}.${file.type
                              .split("/")
                              .at(1)}`,
                            { type: file.type }
                          );
                          resolve(newFile);
                        } else resolve(file);
                      }
                    );
                  }, file.type);
                } else {
                  resolve(file);
                }
              },
              { meta: true, orientation: true, canvas: true }
            );
          });
          if (fileValid) {
            newFiles.push(fileValid);
          }
        } else {
          newFiles.push(file);
        }
      }
      onDrop(newFiles);
    },
    accept: accept
      ? accept
      : inputType === "video" || isVideo
      ? ALLOWED_VIDEO_TYPE_LIB
      : inputType === "audio"
      ? ALLOWED_AUDIO_TYPE_LIB
      : ALLOWED_IMAGE_TYPE_LIB,
    multiple: multiple,
    maxSize: maxSize * (1024 * 1024),
    onDropRejected: (filesError) => {
      filesError.forEach((file) => {
        let error = file.errors.flatMap((e) => e.message).join("|");
        error = error.replace(/\b(\d+)\sbytes\b/g, maxSize + " MB");
        toast.error(file.file.name + ": \n" + error);
      });
      // toast.error('Accept image formats ' + imageFormatAllowed);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        className,
        type === "empty"
          ? "train-list__file"
          : type === "swap"
          ? "swap-list__file"
          : "edition-update__file"
      )}
      style={{
        aspectRatio: type === "swap" ? 1 : "",
        pointerEvents: disabled ? "none" : "",
      }}
    >
      <input {...getInputProps()} type="file" disabled={disabled} />
      {children}
    </div>
  );
}

export default FileDropInput;
