import React from "react";
import Ske, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = ({ className, style, containerClassName }) => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Ske
        containerClassName={containerClassName}
        className={className}
        style={style}
      />
    </SkeletonTheme>
  );
};

export default Skeleton;
