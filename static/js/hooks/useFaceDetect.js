import React, { useEffect, useRef, useState } from "react";

import { getContainedSize } from "../utils";
// import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";

const useFaceDetect = () => {
  const imgRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const [facesDetected, setFacesDetected] = useState(0);
  const [boundingBox, setBoundingBox] = useState({
    yCenter: 0,
    xCenter: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handler = async () => {
      try {
        setIsLoading(true);
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        const faceDetector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
            delegate: "GPU",
          },
          runningMode: "IMAGE",
          minDetectionConfidence: 0.4,
        });
        const faceLandmarkerResult = faceDetector.detect(imgRef.current);
        if (faceLandmarkerResult?.detections.length > 0) {
          const detection = faceLandmarkerResult.detections[0];
          const getSize = getContainedSize(imgRef.current);
          const widthRatio = getSize.width / getSize.naturalWidth;
          const heightRatio = getSize.height / getSize.naturalHeight;
          const realBoxWidth = detection.boundingBox.width * widthRatio;
          const realBoxHeight = detection.boundingBox.height * heightRatio;
          const realBoxX = detection.boundingBox.originX * widthRatio;
          const realBoxY = detection.boundingBox.originY * heightRatio;
          setBoundingBox({
            yCenter: realBoxY,
            xCenter: realBoxX,
            width: realBoxWidth,
            height: realBoxHeight,
          });
          setFacesDetected(1);
        } else {
          setFacesDetected(0);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (imgRef.current) {
      handler();
    }
  }, [imgRef.current]);

  return { imgRef, isLoading, facesDetected, boundingBox };
};

export default useFaceDetect;
