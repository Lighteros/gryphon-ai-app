import axios from "axios";
import { API_BASE_URL, API_HOST_URL } from "../constant";
import { getFilenameFromUrl } from "../helper";

const FILE_SERVER_URL = API_HOST_URL;

export const toImageUrl = (img) => {
  if (!img) return "/assets/images/img-default.png";
  if (img?.startsWith("http")) {
    return img;
  }
  return FILE_SERVER_URL + img;
};
export const toAvatarUrl = (img) => {
  if (!img) return "/assets/images/user_default_avatar.png";
  if (img?.startsWith("http")) {
    return img;
  }
  return FILE_SERVER_URL + img;
};
export const toLocalFile = async (src, callback) => {
  // if(src.startsWith("data:")){
  //   console.log(src)
  //   src = URL.createObjectURL(src || '')
  //  }
  const response = await fetch(src);
  const contentType = response.headers.get("content-type");
  const fileName = getFilenameFromUrl(response.url);
  const blob = await response.blob();
  const file = new File([blob], fileName.fileName, {
    type: blob.type,
  });
  const obj = {
    preview: src,
    file: file,
    key: getRandomInt(9999),
  };
  callback && callback(obj);
  return obj;
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export const ALLOWED_VIDEO_TYPE_LIB = {
  "video/mp4": [".mp4", ".MP4"],
  "video/mov": [".mov", ".MOV"],
  "video/quicktime": [],
};
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
export const imageFormatAllowed = "png, jpg, jpeg, heic";
export const checkTypeImage = (type) => {
  return ALLOWED_IMAGE_TYPE.includes(type);
};
export const checkFileSize = (size, maxSizeMb = 50) => {
  return size / (1024 * 1024) <= maxSizeMb;
};
function fileDownload(data, filename, mime, bom) {
  var blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  var blob = new Blob(blobData, { type: mime || "application/octet-stream" });
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var blobURL =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob);
    var tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", filename);
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    setTimeout(function () {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 200);
  }
}
export const downloadFileUrl = (url, filename) => {
  const safeFilename = url.toLowerCase().endsWith(".mp4")
    ? `${filename}.mp4`
    : `${filename}.png`;
  axios
    .get(url, {
      responseType: "blob",
    })
    .then((res) => {
      fileDownload(res.data, safeFilename);
    });
};
