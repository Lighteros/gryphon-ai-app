import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import clsx from "clsx";
import LoadingIcon from "./LoadingIcon";
// variant basic for small button
const nameClass = {
  basic: "btn-basic",
  border: "btn-border",
  btn: "popup-form__btn",
};
const Button = ({
  type = "button",
  children,
  loading,
  disabled = false,
  variant = "btn",
  onClick,
  style,
  className,
}) => {
  const disable = loading || disabled;

  return (
    <motion.button
      type={type}
      className={clsx(nameClass[variant], className)}
      style={{
        ...style,
        opacity: disable ? 0.5 : 1,
        scale: disable ? 0.95 : 1,
        marginBottom: 0,
      }}
      onClick={onClick}
      disabled={disable}
    >
      {loading ? <LoadingIcon /> : children}
    </motion.button>
  );
};

export default Button;
