import React, { useEffect } from "react";
import { useModal } from "../../../context/modalContext";
const ActivatePass = () => {
  const { openModal } = useModal();
  useEffect(() => {
    openModal("create-password");
  }, []);
  return <div></div>;
};

export default ActivatePass;
