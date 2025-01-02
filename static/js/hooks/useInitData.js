import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppServices } from "../constant";
import { toLocalFile } from "../utils/file";

const useInitData = (serviceId, reset, defaultValue) => {
  const location = useLocation();
  useEffect(() => {
    const init = async () => {
      if (serviceId === AppServices.TEXT_TO_IMAGE) {
        const obj = {
          ...defaultValue,
          prompt: location.state?.prompt || "",
          cfg: location.state?.options?.cfg || undefined,
          seed: location.state?.options?.seed || undefined,
          is_random_seed: location.state?.options?.is_random_seed
            ? location.state?.options?.is_random_seed === "true"
            : true,
        };
        if (location.state?.options?.seed) {
          obj.seed = location.state?.options.seed;
        }
        if (location.state?.options?.cfg) {
          obj.cfg = location.state?.options?.cfg;
        }
        if (location.state?.options?.denoising) {
          obj.denoising = location.state?.options?.denoising;
        }
        if (location.state?.target) {
          obj.selectedFile1 = await toLocalFile(location.state.target);
        }
        if (location.state?.init_img) {
          obj.selectedFile1 = await toLocalFile(location.state.init_img);
        }
        reset(obj);
      } else if (
        serviceId === AppServices.FACE_SWAP ||
        serviceId === AppServices.ARCHITECT_IMAGE ||
        serviceId === AppServices.FACE_DANCE
      ) {
        const obj = {
          ...defaultValue,
        };
        if (location.state?.target) {
          const file = await toLocalFile(location.state.target);
          obj.selectedFile2 = { ...file, valid: true };
        }
        if (location.state?.init_theme_url) {
          const file = await toLocalFile(location.state.init_theme_url);
          obj.selectedFile2 = { ...file, valid: true };
        }
        reset(obj);
      } else if (serviceId === AppServices.TEXT_TO_VIDEO) {
        const obj = {
          ...defaultValue,
          prompt: location.state?.prompt || "",
        };
        if (location.state?.init_img) {
          obj.selectedFile1 = await toLocalFile(location.state.init_img);
        }
        reset(obj);
      }
    };
    if (serviceId && location.state) {
      init();
    }
  }, [location, serviceId]);
};

export default useInitData;
