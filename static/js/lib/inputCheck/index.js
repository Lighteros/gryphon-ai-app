export const ALLOWED_VIDEO_TYPE = ["video/mp4", "video/mov", "video/quicktime"];
export const ALLOWED_AUDIO_TYPE = ["audio/mpeg", "audio/aac", "audio/wav"];
export const ALLOWED_IMAGE_TYPE = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/heic",
];
export const ALLOWED_IMAGE_TYPE_LIB = {
  "image/jpeg": [],
  "image/png": [],
  "image/jpg": [],
  "image/heic": [],
};
export const ALLOWED_VIDEO_TYPE_LIB = {
  "video/mp4": [".mp4", ".MP4"],
  "video/mov": [".mov", ".MOV"],
  "video/quicktime": [],
};
export const ALLOWED_AUDIO_TYPE_LIB = {
  "audio/mpeg": [],
  "audio/wav": [],
  "audio/aac": [],
};
export const imageFormatAllowed = "png, jpg, jpeg, heic";
export const checkTypeVideo = (type) => {
  return ALLOWED_VIDEO_TYPE.includes(type);
};
export const checkTypeAudio = (type) => {
  return ALLOWED_AUDIO_TYPE.includes(type);
};
export const checkTypeImage = (type) => {
  return ALLOWED_IMAGE_TYPE.includes(type);
};
export const checkFileSize = (size, maxSizeMb = 50) => {
  return size / (1024 * 1024) <= maxSizeMb;
};
