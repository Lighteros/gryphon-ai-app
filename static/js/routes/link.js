import { Icons } from "../constant/icon";
export const ResultImageType = {
  // image2Image: 'from-image',
  text2Image: "from-text",
  soraVideo: "text-to-video",
  swapface: "easy-face-changer",
  refaceVideo: "video-face-transformer",
  architectImage: "architect-image",
  video2Video: "video-to-video",
  image2Video: "photo-to-video-maker",
  text2Video: "text-to-video",
  all: "all",
};

export const APP_ROUTE = {
  TEXT_TO_IMAGE: {
    id: "TEXT_TO_IMAGE",
    name: "AI Text to Image",
    routeName: "instant-art-creator",
    icon: Icons.icon_text2img,
  },
  // IMAGE_TO_IMAGE: {
  //   id: 'IMAGE_TO_IMAGE',
  //   name: 'AI Image Style Transfer',

  //   routeName: 'image-style-transformer',
  //   icon: Icons.icon_img2img
  // },
  FLUX_GEN: {
    id: "FLUX_GEN",
    name: "Flux",
    routeName: "flux-gen",
    icon: Icons.icon_text2img,
  },
  FACE_SWAP: {
    id: "FACE_SWAP",
    name: "AI Image Faceswap",
    routeName: "easy-face-changer",
    icon: Icons.icon_faceswap,
  },
  REFACE_VIDEO: {
    id: "REFACE_VIDEO",
    name: "AI Video Faceswap",
    routeName: "video-face-transformer",
    icon: Icons.icon_videoface,
  },
  ARCHITECT_IMAGE: {
    id: "ARCHITECT_IMAGE",
    name: "AI Architect",
    routeName: "architect",
    icon: Icons.icon_architect,
  },
  VIDEO_TO_VIDEO: {
    id: "VIDEO_TO_VIDEO",
    name: "AI Video Transfer",
    routeName: "video-to-video",
    icon: Icons.icon_video,
  },
  FACE_DANCE: {
    id: "FACE_DANCE",
    name: "Face dance",
    routeName: "face-dance",
    icon: Icons.icon_soravideo,
  },
  IMAGE_TO_VIDEO: {
    id: "IMAGE_TO_VIDEO",
    name: "AI Photo To Video",
    routeName: "photo-to-video-maker",
    icon: Icons.icon_img2video,
  },
  // SORA_VIDEO: {

  // },
  TEXT_TO_VIDEO: {
    id: "TEXT_TO_VIDEO",
    name: "AI Text To Video",
    routeName: "text-to-video",
    icon: Icons.icon_soravideo,
  },
};
const APP_ROUTE_ARRAY = Object.keys(APP_ROUTE).map((x) => APP_ROUTE[x]);
export const AppRoute = {
  getByRoute(route) {
    return APP_ROUTE_ARRAY.find((x) => x.routeName === route);
  },
};
