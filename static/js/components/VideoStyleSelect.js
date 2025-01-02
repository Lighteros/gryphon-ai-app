import React, { useRef, useState } from "react";
import { VideoPromptData } from "../data/template/prompt-data";
import FadeIn from "./Animated/FadeIn";
import clsx from "clsx";

const VideoStyleSelect = ({
  onChange,
  value,
  className,
  data = VideoPromptData,
}) => {
  let delay = useRef(1).current;

  return (
    <div className={clsx("edition-style__list js-select-style", className)}>
      {data.map((item, index) => {
        const checked = item.id === value?.id;
        return (
          <FadeIn
            as="label"
            direction="x"
            index={delay++}
            className={`item ${checked ? "is-active" : ""}`}
            key={index}
            style={{ aspectRatio: "1" }}
          >
            <img src={item.thumbnail} alt="stabilityworld" />
            <input
              type="checkbox"
              name={`select-0${index}`}
              checked={checked}
              onChange={() => {
                if (checked) {
                  onChange(null);
                } else {
                  onChange(item);
                }
              }}
            />
          </FadeIn>
        );
      })}
    </div>
  );
};

export default VideoStyleSelect;
