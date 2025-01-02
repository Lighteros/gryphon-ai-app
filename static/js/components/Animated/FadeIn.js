import { motion } from "framer-motion";
const FadeIn = ({
  children,
  index = 0,
  className,
  style,
  initDeplay = 0.2,
  direction = "y",
  as = "div",
  from = "-50%",
  to = "0%",
  ...rest
}) => {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, [direction]: from }}
      animate={{ opacity: 1, [direction]: to }}
      className={className}
      style={style}
      transition={{ duration: 0.6, ease: "easeOut", delay: initDeplay * index }}
      {...rest}
    >
      {children}
    </Component>
  );
};
export default FadeIn;
export const FadeInHeader = ({ children, ...rest }) => {
  return (
    <FadeIn {...rest} direction="x">
      {children}
    </FadeIn>
  );
};
