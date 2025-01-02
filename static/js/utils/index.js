import { config } from "../config";
import { AppServices } from "../constant";
import toast from "../lib/toast";

export function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}
export const copyText = async (text) => {
  if (!navigator?.clipboard) {
    console.warn("Clipboard not supported");
    document.execCommand("copy", true, text);
    toast.success("Copied");
    return true;
  }
  // Try to save to clipboard then save it in the state if worked
  try {
    await navigator.clipboard.writeText(text);

    toast.success("Copied");

    return true;
  } catch (error) {
    console.warn("Copy failed", error);
    // toast.error("Trình duyệt không hỗ trợ");
    document.execCommand("copy", true, text);
    toast.success("Copied");
    return true;
  }
};
export const RedirectUri = {
  key: "redirect_url",
  canva: "canva-url",
  set: (value) => {
    sessionStorage.setItem("redirect_url", value);
  },
  get: () => {
    return sessionStorage.getItem("redirect_url") || "/";
  },
  setCanva: (value) => {
    sessionStorage.setItem("canva-url", value);
  },
  getCanva: (value) => {
    return sessionStorage.getItem("canva-url");
  },
  clearCanva: () => sessionStorage.removeItem("canva-url"),
};
export function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}
export function checkIosVersion() {
  let agent = window.navigator.userAgent;
  let start = agent.indexOf("OS");
  if (
    (agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1) &&
    start > -1
  ) {
    // alert(agent.substr(start + 3, 4))
    return window.Number(agent.substr(start + 3, 4).replace("_", "."));
  }
  return 0;
}
export function isMobile() {
  console.log(isAndroid(), isiOS(), navigator.userAgent);
  return isAndroid() || isiOS();
}
export function getContainedSize(img) {
  var ratio = img.naturalWidth / img.naturalHeight;
  var width = img.height * ratio;
  var height = img.height;
  if (width > img.width) {
    width = img.width;
    height = img.width / ratio;
  }
  return {
    width,
    height,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
  };
}
export function calculateLogoSize(
  originalWidth,
  originalHeight,
  logoWidth,
  logoHeight
) {
  const originalAspectRatio = logoWidth / logoHeight;
  const newLogoHeight =
    originalWidth > originalHeight ? originalHeight / 9 : originalWidth / 9;
  const newLogoWidth = newLogoHeight * originalAspectRatio;
  return { width: newLogoWidth, height: newLogoHeight };
}
export const checkCaptcha = (captchaId) => {
  return true;
};
export const validateGenData = (service_id, data) => {
  if (service_id === AppServices.TEXT_TO_IMAGE) {
    if (!data.prompt) {
      toast.error("Prompt cannot be empty");
      return;
    }
    if (!data.cfg || data.cfg < 0 || data.cfg > 10) {
      toast.error(
        "CFG should be equal or greater than 0 and less than or equal to 10."
      );
      return;
    }
    if (!data.seed) {
      toast.error("Seed cannot be empty");
      return;
    }
    if (data.seed < -1) {
      toast.error("Seed must be greater than -1");
      return;
    }

    if (service_id === AppServices.IMAGE_TO_IMAGE) {
      if (!data.denoising) {
        toast.error("Denoising cannot be empty");
        return;
      }
      if (!data.denoising || data.denoising < 0.1 || data.denoising > 1) {
        toast.error(
          "Denoising should be equal or greater than 0.1 and less than or equal to 1."
        );
        return;
      }
    }
  } else if (service_id === AppServices.FACE_SWAP) {
    if (!data.selectedFile1) {
      toast.error(
        "You must select both destination image and look like image."
      );
      return;
    }
    if (!data.selectedFile2) {
      toast.error(
        "You must select both destination image and look like image."
      );
      return;
    }
    if (!data.selectedFile1.valid || !data.selectedFile2.valid) {
      toast.error("No face was detected in the photo.");
      return;
    }
  }
  return true;
};
export const createCommandWorker = ({
  device_id,
  device_name,
  os,
  user_code,
}) => {
  return `swai.exe
  --device_id=${device_id}
  --user_id=${user_code} --operating_system="${os}"
  --device_name="${device_name}"`;
};
export const generateRefLink = (refCode) => {
  return config.IS_MINIAPP
    ? process.env.REACT_APP_REF_URL + "?startapp=" + refCode
    : process.env.REACT_APP_REF_URL + "/ref/" + refCode;
};
export const sleep = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));
