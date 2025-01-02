import { z } from "zod";
import { AppServices } from "../constant";
import { ALLOWED_IMAGE_TYPE, ALLOWED_VIDEO_TYPE } from "../lib/inputCheck";
import heic2any from "heic2any";
import loadImage from "blueimp-load-image";
import { generateRandomString } from "../utils";
const MAX_FILE_SIZE = 50000000;

const schemaTextToImage = z.object({
  prompt: z.string({ required_error: "Prompt is required" }).min(1, {
    message: "Prompt is required",
  }),
  model_name: z.string().nullish(),
  original_prompt: z
    .string({ required_error: "Original prompt is required" })
    .nullish(),
  negative_prompt: z.string({ required_error: "Negative prompt is required" }),
  number_of_image: z.coerce
    .number({
      required_error: "Number of images is required",
    })
    .default(1),
  cfg: z.coerce.number().default(7),
  seed: z.coerce.number().default(-1),
  is_random_seed: z.coerce.boolean().default(true),
});
const durantion = 10;
// `Video must be under ${durantion} seconds.`
const validateSizeFile = (files) => files.size <= MAX_FILE_SIZE;
const validateVideoDurantion = async (file) => {
  if (file.type.startsWith("video")) {
    const fileValid = durantion
      ? await new Promise((resolve) => {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.onloadedmetadata = () => {
            if (video.duration > durantion) {
              resolve(null);
            } else {
              resolve(file);
            }
          };
          video.src = URL.createObjectURL(file);
        })
      : file;
    return !!fileValid;
  }
  return false;
};
const cropImage = async (file) => {
  // Implement your cropping logic here
  // Ensure the output is a File type
  const croppedFile = new File(
    [
      /* cropped image data */
    ],
    file.name,
    { type: file.type }
  );
  return croppedFile;
};
const tranformIosImage = async (file) => {
  if (file.type.toLowerCase().startsWith("image")) {
    if (file.type.toLowerCase() === "image/heic") {
      if (window !== undefined) {
        const imageData = await heic2any({ blob: file, toType: "image/jpeg" });
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
            loadImage.writeExifData(data.imageHead, data, "Orientation", 1);
            img.toBlob(function (blob) {
              loadImage.replaceHead(blob, data.imageHead, function (newBlob) {
                if (newBlob) {
                  const newFile = new File(
                    [newBlob],
                    `${generateRandomString(8)}.${file.type.split("/").at(1)}`,
                    { type: file.type }
                  );
                  resolve(newFile);
                } else resolve(file);
              });
            }, file.type);
          } else {
            resolve(file);
          }
        },
        { meta: true, orientation: true, canvas: true }
      );
    });
    const croppedFile = await cropImage(fileValid);
    return croppedFile;
  }
  return file;
};
const fileSizeMessage = `Max file size is ${Math.round(
  MAX_FILE_SIZE / (1024 * 1024)
)}MB.`;
const validateTypeFile = (type) => (files) =>
  type === "image"
    ? ALLOWED_IMAGE_TYPE.includes(files.type)
    : type === "video"
    ? ALLOWED_VIDEO_TYPE.includes(files.type)
    : true;
const fileTypeMessage = {
  image: `${ALLOWED_VIDEO_TYPE.toString().replace(
    "image/",
    "."
  )} files are accepted.`,
  video: `${ALLOWED_VIDEO_TYPE.toString().replace(
    "image/",
    "."
  )} files are accepted.`,
};

export const schemaCreate = {
  body: z.discriminatedUnion("service_id", [
    z
      .object({
        service_id: z.literal(AppServices.TEXT_TO_IMAGE),
        prompt: z.string({ required_error: "Prompt is required" }).min(1, {
          message: "Prompt is required",
        }),
        width: z.coerce.number(),
        captcha: z.string({ required_error: "Captcha is required" }),
        height: z.coerce.number(),
        improve_prompt: z.boolean().nullish(),
      })
      .merge(schemaTextToImage),
    z
      .object({
        service_id: z.literal(AppServices.FLUX_GEN),
        prompt: z.string({ required_error: "Prompt is required" }).min(1, {
          message: "Prompt is required",
        }),
        width: z.coerce.number(),
        captcha: z.string({ required_error: "Captcha is required" }),
        height: z.coerce.number(),
        improve_prompt: z.boolean().nullish(),
      })
      .merge(schemaTextToImage),
    // z
    //   .object({
    //     service_id: z.literal(AppServices.IMAGE_TO_IMAGE),
    //     captcha: z.string({ required_error: 'Captcha is required' }),
    //     prompt: z.string().nullish(),
    //     denoising: z.coerce.number().default(0.5),
    //     init_media_url: z
    //       .instanceof(File, {
    //         message: 'Image is required.'
    //       })
    //       .refine(validateSizeFile, fileSizeMessage)
    //       .refine(validateTypeFile, fileTypeMessage.image)
    //   })
    //   .merge(schemaTextToImage.omit({ prompt: true })),
    z.object({
      service_id: z.literal(AppServices.FACE_SWAP),
      captcha: z.string({ required_error: "Captcha is required" }),
      init_media_url: z
        .instanceof(File, {
          message: "Your face is required.",
        })
        .refine(validateSizeFile, fileSizeMessage)
        .refine(validateTypeFile, fileTypeMessage.image),
      // .transform(tranformIosImage),
      init_theme_url: z
        .instanceof(File, {
          message: "Target image is required.",
        })
        .refine(validateSizeFile, fileSizeMessage)
        .refine(validateTypeFile, fileTypeMessage.image),
    }),
    z
      .object({
        service_id: z.literal(AppServices.TEXT_TO_VIDEO),
        captcha: z.string({ required_error: "Captcha is required" }),
      })
      .merge(schemaTextToImage.pick({ prompt: true, original_prompt: true })),
    z.object({
      service_id: z.literal(AppServices.FACE_DANCE),
      captcha: z.string({ required_error: "Captcha is required" }),
      duration: z.number().nullish(),
      init_media_url: z
        .instanceof(File, {
          message: "Your face is required.",
        })
        .refine(validateSizeFile, fileSizeMessage)
        .refine(validateTypeFile, fileTypeMessage.image),
      init_theme_url: z
        .instanceof(File, {
          message: "Dance video is required.",
        })
        .refine(validateSizeFile, fileSizeMessage)
        .refine(validateTypeFile, fileTypeMessage.video),
    }),
  ]),
};
