import watermark from "watermarkjs";
import { calculateLogoSize } from ".";
function base64ToBlob(base64String, contentType = "") {
  // Check if the base64String contains a data URL prefix
  const dataUrlPattern = /^data:(.+);base64,(.*)$/;
  const matches = base64String.match(dataUrlPattern);

  if (matches) {
    // If there is a match, extract the content type and the base64 string
    contentType = matches[1];
    base64String = matches[2];
  }

  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], { type: contentType });
}

export function handlerWatermark(image) {
  return watermark([image, "/assets/images/watermark.png"], {
    init(img) {
      img.crossOrigin = "anonymous";
    },
  })
    .image((uploadImage, logo) => {
      const context = uploadImage.getContext("2d");
      context.save();
      context.globalAlpha = 0.8;
      const size = calculateLogoSize(
        uploadImage.width,
        uploadImage.height,
        logo.width,
        logo.height
      );
      const posX = uploadImage.width - size.width - uploadImage.width * 0.031;
      const posY =
        uploadImage.height - size.height - uploadImage.height * 0.022;
      context.drawImage(logo, posX, posY, size.width, size.height);
      context.restore();

      return uploadImage;
    })
    .then((img) => window.URL.createObjectURL(base64ToBlob(img.src)))
    .catch((e) => {
      return image;
    });
}
export async function toLocalFileUrl(src, toBlob, cb) {
  return fetch(src, {
    method: "GET",
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      if (toBlob) {
        return blob;
      }
      cb && cb(blob);
      return url;
    });
}
