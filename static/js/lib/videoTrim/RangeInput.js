import React, { useEffect, useState } from "react";
import * as helpers from "./videoTrimHelpers";

export default function RangeInput({
  thumbNails,
  rEnd,
  rStart,
  setRend,
  setRstart,
  loading,
  control,
  videoMeta,
  currentTime,
}) {
  let RANGE_MAX = 100;
  if (thumbNails.length === 0 && !loading) {
    return null;
  }

  if (loading) {
    return (
      <center>
        <h4 style={{ color: "#fff" }}>Processing thumbnails.....</h4>
      </center>
    );
  }

  return (
    <>
      <div className="image_box">
        {thumbNails.map((imgURL, id) => (
          // <img src={'https://devapi.stabilityworld.ai/uploads/user_avatar/1714011948788_c8aebb.jpg'} alt={`sample_video_thumbnail_${id}`} key={id} crossOrigin="*" />
          <div style={{ aspectRatio: 1, height: "100%" }} key={id}></div>
        ))}
        <div
          className="clip_box"
          style={{
            width: `calc(${rEnd - rStart}% )`,
            left: `${rStart}%`,
          }}
          data-start={helpers.toTimeString(
            (rStart / RANGE_MAX) * videoMeta.duration,
            false
          )}
          data-end={helpers.toTimeString(
            (rEnd / RANGE_MAX) * videoMeta.duration,
            false
          )}
        >
          <div
            className="currentTime"
            data-current-time={helpers.toTimeString(
              currentTime.currentTime,
              false
            )}
            style={{
              borderRight: "solid 2px white",
              height: "100%",
              width: 1,
              position: "absolute",
              top: 0,
              left: `calc(${currentTime.offset}%)`,
              zIndex: 2,
            }}
          ></div>
          <span className="clip_box_des "></span>
          <span className="clip_box_des"></span>
        </div>

        <input
          className="range"
          type="range"
          min={0}
          max={RANGE_MAX}
          onInput={({ target: { value } }) => {
            setRstart(value);
          }}
          value={rStart}
        />
        <input
          className="range"
          type="range"
          min={0}
          max={RANGE_MAX}
          onInput={({ target: { value } }) => {
            setRend(value);
          }}
          value={rEnd}
        />
      </div>

      {control}
    </>
  );
}
