import { useEffect, useMemo, useRef, useState } from "react";
import "./style.css";
import * as helpers from "./videoTrimHelpers";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

import toast from "../../components/Shared/toast";

export function useVideoProcessing({
  reloadOnUnmount = true,
  file,
  maxDurantion,
}) {
  const [loaded, setLoaded] = useState(false);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const FF = useRef(new FFmpeg());
  const load = async () => {
    try {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      const ffmpeg = FF.current;
      ffmpeg.on("log", ({ message }) => {
        console.log(message, "mm");
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });
      setLoaded(true);
    } catch (e) {
      console.log(e, "ee");
    }
  };

  const playerRef = useRef(null);
  const [inputVideoFile, setInputVideoFile] = useState(null);
  const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
  const [videoMeta, setVideoMeta] = useState(null);
  const [URL, setURL] = useState(null);
  const [trimIsProcessing, setTrimIsProcessing] = useState(false);
  const [rStart, setRstart] = useState(0);
  const [rEnd, setRend] = useState(100);
  const [thumbNails, setThumbNails] = useState([]);
  const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);
  const [currentTime, setCurrentTime] = useState({
    currentTime: 0,
    offset: 0,
  });
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const get = async () => {
      setInputVideoFile(file);
      setURL(window.URL.createObjectURL(file));
    };
    if (file) get();
  }, [file]);
  useEffect(() => {
    if (!playerRef.current) return;
    const onPause = () => {
      setPlayed(false);
    };
    const onPlay = () => {
      setPlayed(true);
    };
    const onLoadedData = async (e) => {
      console.log(playerRef.current);
      playerRef.current.muted = false;
      const el = playerRef.current;

      // if (reloadOnUnmount) return;
      const meta = {
        name: inputVideoFile.name,
        duration: el.duration,
        videoWidth: el.videoWidth,
        videoHeight: el.videoHeight,
      };
      setVideoMeta(meta);

      const thumbNails = await getThumbnails(meta);
      setThumbNails([...thumbNails]);
    };
    onLoadedData();
    playerRef.current.addEventListener("pause", onPause);
    playerRef.current.addEventListener("play", onPlay);

    // playerRef.current.addEventListener('loadedmetadata', onLoadedData);
    return () => {
      if (!playerRef.current) return;
      playerRef.current.removeEventListener("pause", onPause);
      playerRef.current.removeEventListener("play", onPlay);

      // playerRef.current.removeEventListener('loadedmetadata', onLoadedData);
    };
  }, [playerRef.current]);
  useEffect(() => {
    if (!playerRef.current) return;
    const onUpdateTime = () => {
      if (!playerRef.current) return;
      let currentTime = playerRef.current?.currentTime;
      let startTime = parseInt(
        ((rStart / 100) * playerRef.current?.duration).toFixed(2)
      );
      let endTime = parseInt(
        ((rEnd / 100) * playerRef.current?.duration - startTime).toFixed(2)
      );
      const duration = endTime - startTime;
      let offset = ((currentTime - startTime) / duration) * 100;
      setCurrentTime({
        currentTime,
        offset,
      });
      if (currentTime > endTime) {
        pauseVideo();
        return;
      }
    };
    playerRef.current.addEventListener("timeupdate", onUpdateTime);
    return () => {
      if (!playerRef.current) return;
      playerRef.current.removeEventListener("timeupdate", onUpdateTime);
    };
  }, [playerRef.current, rEnd, rStart]);

  useEffect(() => {
    if (playerRef.current) pauseVideo();
  }, [rEnd, rStart, playerRef.current]);
  const checkDurantion = (max = 10, showMessage = true) => {
    let startTime = parseInt(((rStart / 100) * videoMeta.duration).toFixed(2));
    let offset = parseInt(
      ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2)
    );
    if (offset - startTime <= max) return true;
    showMessage && toast.error("Your video file must be under 10 seconds");
    return false;
  };

  const getThumbnails = async ({ duration }) => {
    if (!loaded) await load();

    // const ffmpeg = FF.current;
    try {
      setThumbnailIsProcessing(true);
      let MAX_NUMBER_OF_IMAGES = 15;
      // let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 15;
      // let offset = duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / NUMBER_OF_IMAGES;
      const arrayOfImageURIs = [];

      // await ffmpeg.writeFile(inputVideoFile.name, await fetchFile(inputVideoFile));
      // for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
      //   let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));
      //   try {
      //     await ffmpeg.exec([
      //       '-ss',
      //       startTimeInSecs,
      //       '-i',
      //       inputVideoFile.name,
      //       '-t',
      //       '00:00:1.000',
      //       '-vf',
      //       `scale=150:-1`,
      //       `img${i}.png`
      //     ]);
      //     const data = await ffmpeg.readFile(`img${i}.png`);
      //     let blob = new Blob([data.buffer], { type: 'image/png' });
      //     let dataURI = await helpers.readFileAsBase64(blob);
      //     await ffmpeg.deleteFile(`img${i}.png`);
      //     arrayOfImageURIs.push(dataURI);
      //   } catch (error) {
      //     console.log({ message: error });
      //   }
      // }
      for (let i = 0; i < 10; i++) {
        arrayOfImageURIs.push(
          "https://devapi.stabilityworld.ai/uploads/user_avatar/1714011948788_c8aebb.jpg"
        );
      }
      setThumbnailIsProcessing(false);
      return arrayOfImageURIs;
    } catch (e) {
      console.log(e, "Zz");
      return [];
    }
  };
  const handleTrim = async (callback) => {
    setTrimIsProcessing(true);
    const ffmpeg = FF.current;
    let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
    let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
    try {
      ffmpeg.writeFile(inputVideoFile.name, await fetchFile(inputVideoFile));
      // await FF.run('-ss', '00:00:13.000', '-i', inputVideoFile.name, '-t', '00:00:5.000', 'ping.mp4');

      await ffmpeg.exec([
        "-ss",
        helpers.toTimeString(startTime),
        "-to",
        helpers.toTimeString(offset),
        "-i",
        inputVideoFile.name,
        "-vf",
        `crop=${croppedArea.width}:${croppedArea.height}:${croppedArea.x}:${croppedArea.y}`,
        // '-c:a','copy',
        "ping.mp4",
      ]);
      // `crop=${croppedArea.width}:${croppedArea.height}:${croppedArea.x}:${croppedArea.y}``img${i}.png`
      const data = await ffmpeg.readFile("ping.mp4");

      const dataURL = await helpers.readFileAsBase64(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      const myFile = new File([data.buffer], "image.mp4", {
        type: "video/mp4",
      });
      const myFile2 = new File([thumbNails[0]], "image.jpg", {
        type: "image/jpg",
      });
      const obj = {
        duration: parseInt(offset),
        file: myFile,
        thumbnail: myFile2,
        preview: dataURL,
      };
      callback && callback(obj);
      setTrimmedVideoFile(dataURL);
      return obj;
    } catch (error) {
      console.log(error);
    } finally {
      setTrimIsProcessing(false);
    }
  };
  const pauseVideo = () => {
    playerRef.current.pause();
  };

  const trimProps = useMemo(() => {
    return {
      rEnd,
      rStart,
      loading: thumbnailIsProcessing,
      videoMeta,
      thumbNails,
      playerRef,
      setRend,
      setRstart,
      currentTime,
    };
  }, [rEnd, rStart, thumbnailIsProcessing, videoMeta, thumbNails, currentTime]);
  const startPreview = () => {
    if (!playerRef.current) return;
    if (playerRef.current.paused) {
      let time = ((rStart / 100) * videoMeta.duration).toFixed(2);
      playerRef.current.currentTime = time;
      playerRef.current.play();
    } else {
      pauseVideo();
    }
  };
  return {
    handleTrim,
    downLoadVideo: helpers.download,
    trimmedVideoFile,
    videoUrl: URL,
    trimIsProcessing,
    inputVideoFile,
    trimProps,
    playerRef,
    checkDurantion,
    startPreview,
    played,
    thumbnailIsProcessing,
    zoom,
    setZoom,
    loaded,
    croppedArea,
    setCroppedArea,
    crop,
    setCrop,
  };
}
