import { checkIosVersion, isiOS } from "../utils";

export const IMAGE_RATIO = [
  { width: 768, height: 1024, ratio: "3/4", name: "Portrait" },
  { width: 1024, height: 1024, ratio: "1/1", name: "Square" },
  { width: 1024, height: 768, ratio: "4/3", name: "Landscape" },
];
export const IMAGE_QUANTITY = [
  { quantity: 1 },
  { quantity: 2 },
  { quantity: 3 },
  { quantity: 4 },
];

export const API_HOST_URL = process.env.REACT_APP_API_BASE_URL;
export const API_BASE_URL = process.env.REACT_APP_API;
// export const API_BASE_URL = `
// https://devapi.stabilityworld.ai/api/app/`;

// export const API_BASE_URL = `https://devapi.stabilityworld.ai/api/app/`;
export const SUPPORT_VIDEO_TRIM = !(isiOS() && checkIosVersion() < 16.4);
export const LoginProviders = {
  GOOGLE: "google",
  EMAIL: "email",
  FACEBOOK: "facebook",
  DISCORD: "discord",
  TWITTER: "twitter",
  TELEGRAM: "telegram",
  TELEGRAM_BOT: "telegram_bot",
};
export const AppServices = {
  // IMAGE_TO_IMAGE: 'IMAGE_TO_IMAGE',
  TEXT_TO_VIDEO: "TEXT_TO_VIDEO",
  TEXT_TO_IMAGE: "TEXT_TO_IMAGE",
  FACE_SWAP: "FACE_SWAP",
  ARCHITECT_IMAGE: "ARCHITECT_IMAGE",
  REFACE_VIDEO: "REFACE_VIDEO",
  FACE_DANCE: "FACE_DANCE",
  FLUX_GEN: "FLUX_GEN",
};
export const NodeWokerStatus = {
  NEW: "NEW",
  CONNECTED: "CONNECTED",
  DISCONNECTED: "DISCONNECTED",
  TERMINATED: "TERMINATED",
};

export const SHOW_TOKEN = false;
export const NOTIFICATION_MESSAGE =
  "🎉 The token claim period is about to start.";
