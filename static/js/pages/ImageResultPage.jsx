import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icons } from '../constant/icon';
import { APP_ROUTE } from '../routes/link';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';
import useFaceDetect from '../hooks/useFaceDetect';
import { IoReload } from 'react-icons/io5';
import toast from '../lib/toast';
import { useModal } from '../context/modalContext';
import { CiShare1 } from 'react-icons/ci';
import { useMediaDelete, useMediaDetail } from '../services/mediaService';
import { Tooltip } from 'react-tooltip';
import LoadingIcon from '../components/Ui/LoadingIcon';
import { AppServices } from '../constant';
import { config } from '../config';
import confirmAlert from '../lib/confirmAlert';
import { downloadFileUrl } from '../utils/file';

const ImageResultPage = ({
  from,
  fileKey: key,
  init_img,
  status,
  result_url,
  service_id,
  options,
  index,
  setIndex,
  total
}) => {
  const [processValue, setProcessValue] = useState(0);
  const [hasWatermark, setHasWatermark] = useState(true);
  const { data: result, isLoading } = useMediaDetail({
    id: key,
    onProcessing: (completed) => {
      if (processValue === 100) {
        return;
      }
      if (completed) {
        setProcessValue(100);
        return;
      }
      setProcessValue((prev) => {
        return prev + 5;
      });
    },
    turnOnWatermark: true
  });
  const data = useMemo(
    () =>
      result?.data || {
        result_url: result_url,
        file_key: key,
        init_img: init_img,
        service_id: service_id,
        original_result_url: result_url,
        options
      },
    [result?.data]
  );
  const src = useMemo(
    () =>
      hasWatermark && result?.data?.result_url_watermark && !result?.data?.options?.watermark
        ? result?.data.result_url_watermark
        : data.result_url,
    [result?.data, isLoading, hasWatermark, result?.data?.options?.watermark]
  );
  const completed = status === 'COMPLETED' || data?.status === 'COMPLETED';
  const progressing = !completed;
  const isDisplayWatermark = options?.watermark === false || data?.options?.watermark === false;

  return (
    <>
      {completed ? (
        <Result
          data={data}
          from={from}
          src={src}
          isDisplayWatermark={isDisplayWatermark}
          setHasWatermark={setHasWatermark}
          hasWatermark={hasWatermark}
          file_key={key}
          isLoadingApi={isLoading}
          total={total}
          index={index}
          setIndex={setIndex}
          serviceId={service_id}
        />
      ) : (
        <Loading data={data} />
      )}
    </>
  );
};

export default ImageResultPage;

const Loading = ({ data }) => {
  const [seconds, setSeconds] = useState(0);
  const isCheck = data?.options?.width;
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div
        className="generate-result"
        style={{
          borderRadius: '1.2rem',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            filter: 'blur(20px) saturate(0.8)',
            opacity: 0.5,
            width: '100%'
          }}
        >
          <img
            src={Icons.icon_logo_result}
            alt="bg-result"
            className="image-bg"
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '90%',
              lineHeight: 0,
              objectFit: 'contain',
              maxWidth: 768,
              maxHeight: 768,
              margin: 'auto',
              color: 'black'
            }}
          />
        </div>
        <div
          className="generate-media animate-pulse"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <div className="generate-media__image ">
            <img
              src="/assets/images/img_test.png"
              alt="images"
              style={{ zIndex: 1, objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <LoadingIcon size={40} />
              <span style={{ textAlign: 'center' }}>{seconds.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative' }}></div>
    </div>
  );
};
const Result = ({
  file_key,
  data,
  src,
  setHasWatermark,
  hasWatermark,
  isDisplayWatermark,
  isLoadingApi,
  total,
  index,
  setIndex,
  serviceId
}) => {
  // const { from, key } = useParams();
  const { mutate, isPending } = useMediaDelete();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const { imgRef, facesDetected } = useFaceDetect();
  const navigate = useNavigate();
  const isVideo = data?.original_result_url?.endsWith('.mp4');
  // const isFaceDance = data?.service_id === AppServices.FACE_DANCE;
  const { closeModal } = useModal();
  const handleShare = async () => {
    if (!navigator.share) {
      return toast.error('Browser is not supported');
    }
    const newFile = data.blob;
    const rs = {
      files: [
        new File([newFile], `${data?.file_key}.${newFile.type?.split('/')?.at(1)}`, {
          type: newFile.type
        })
      ],
      title: isVideo ? 'Video' : 'Image'
    };

    try {
      await navigator.share(rs);
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };
  const downloadFile = () => {
    const pathname = new URL(data.original_result_url).pathname;
    const filename = pathname?.split('/').pop();
    downloadFileUrl(src, filename);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div
          className="generate-result"
          style={{ borderRadius: '1.2rem', paddingBottom: 0, maxHeight: '70dvh', minHeight: '70dvh' }}
        >
          <div
            style={{
              position: 'absolute',
              zIndex: -1,
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              filter: 'blur(20px) saturate(0.8)',
              opacity: 0.5
            }}
          >
            <img
              src={src}
              alt="bg-result"
              className="image-bg"
              style={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                lineHeight: 0,
                objectFit: 'contain',

                margin: 'auto',
                color: 'black'
              }}
            />
          </div>
          <div className="generate-media">
            {' '}
            {/* <div
              className="popup__close2"
              onClick={() => {
                closeModal();
              }}
            ></div> */}
            <div className="generate-media__image">
              {isVideo ? (
                <video
                  src={data.original_result_url}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: 0
                  }}
                  onLoadedData={() => setVideoLoaded(true)}
                  autoPlay
                  preload="metadata"
                  disablePictureInPicture
                  disableRemotePlayback
                  type="video/mp4"
                />
              ) : (
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: 0
                  }}
                  crossOrigin="*"
                  src={src}
                  ref={imgRef}
                  alt="stabilityworld"
                  loading="eager"
                  onLoad={() => setVideoLoaded(true)}
                />
              )}
            </div>
          </div>
          <div
            className="generate-button-feature"
            style={{
              gap: 8,
              display: 'flex'
            }}
          >
            {isDisplayWatermark ? (
              <label
                className="generate-head__toggle"
                data-tooltip-id="watermark-tooltip"
                data-tooltip-content="Remove watermark"
              >
                <input
                  type="checkbox"
                  className="toggle-input"
                  id="toggle"
                  checked={hasWatermark}
                  onChange={() => setHasWatermark(!hasWatermark)}
                />
                <span className="toggle-label">
                  <div className="toggle-handle"></div>
                </span>
              </label>
            ) : null}

            {config.IS_MINIAPP ? null : (
              <>
                <button
                  data-tooltip-id="download-tooltip"
                  data-tooltip-content="Download image"
                  disabled={isLoadingApi}
                  onClick={downloadFile}
                  type="button"
                  className="btn-bottom-result"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 3.75V14.25"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <Tooltip
                  id="download-tooltip"
                  clickable={true}
                  style={{ zIndex: 1019, maxWidth: 300 }}
                />
              </>
            )}
            <Tooltip
              id="watermark-tooltip"
              clickable={true}
              style={{ zIndex: 1005, maxWidth: 300 }}
            />

            {facesDetected > 0 ? (
              <button
                className="btn-bottom-result"
                data-tooltip-id="face-tooltip"
                data-tooltip-content="Swap face"
                type="button"
                onClick={() => {
                  navigate(`/easy-face-changer`, { state: { target: src } });
                  closeModal();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.5 15C12.3284 15 13 14.3284 13 13.5C13 12.6716 12.3284 12 11.5 12C10.6716 12 10 12.6716 10 13.5C10 14.3284 10.6716 15 11.5 15Z"
                    fill="white"
                  />
                  <path
                    d="M20.5 15C21.3284 15 22 14.3284 22 13.5C22 12.6716 21.3284 12 20.5 12C19.6716 12 19 12.6716 19 13.5C19 14.3284 19.6716 15 20.5 15Z"
                    fill="white"
                  />
                  <path
                    d="M21.2 19C20.6714 19.9107 19.9128 20.6667 19.0002 21.1922C18.0876 21.7176 17.053 21.9942 16 21.9942C14.9469 21.9942 13.9123 21.7176 12.9998 21.1922C12.0872 20.6667 11.3286 19.9107 10.8 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Tooltip
                  id="face-tooltip"
                  clickable={true}
                  style={{ zIndex: 1005, maxWidth: 300 }}
                />
              </button>
            ) : null}
            <Tooltip
              id="regenerate-tooltip"
              clickable={true}
              style={{ zIndex: 1005, maxWidth: 200 }}
            />

            <button
              data-tooltip-id="regenerate-tooltip"
              data-tooltip-content="Re-generate"
              className="btn-bottom-result"
              disabled={isLoadingApi}
              onClick={() => {
                navigate(`/${APP_ROUTE[data?.service_id]?.routeName}`, {
                  state: { ...data, init_img: data?.init_media_url }
                });

                closeModal();
                window.scrollTo(0, 0);
              }}
              type="button"
            >
              <IoReload size={20} color="#ffffff" />
            </button>

            <Tooltip id="share-tooltip" clickable={true} style={{ zIndex: 1005, maxWidth: 500 }} />

            <button
              data-tooltip-id="share-tooltip"
              data-tooltip-content="Share social"
              className="btn-bottom-result"
              onClick={() => {
                setOpenShare(!openShare);
              }}
              disabled={isLoadingApi}
              type="button"
            >
              <CiShare1 size={20} color="#ffffff" />
            </button>

            {openShare ? (
              <div
                style={{
                  position: 'absolute',
                  background: '#000',
                  bottom: 130,
                  right: 10,
                  borderRadius: 15
                }}
              >
                <ShareComponent
                  shareUrl={window.location.origin + `?id=${file_key}&type=share`}
                  title="I just created a stunning piece of artwork with Heaven World AI. Check it out and join the $HVN Airdrop program with me!"
                  handleShare={handleShare}
                />
              </div>
            ) : (
              ''
            )}
            <button
              className="btn-bottom-result"
              onClick={(e) => {
                e.stopPropagation();
                confirmAlert({
                  title: 'Are you sure you want to delete?',
                  isLoading: isPending,

                  onClick: async (close) => {
                    mutate(file_key, {
                      onSuccess: close
                    });
                    closeModal();
                  }
                });
              }}
            >
              <FaTrash color="#FFF" />
            </button>
          </div>
        </div>
      </div>
      <div className="btn-carousel-modal">
        {!total || total === 1
          ? null
          : Array(total)
              .fill(0)
              .map((t, i) => {
                return (
                  <button
                    className={`round-btn ${index === i ? 'is-active' : ''}`}
                    onClick={() => setIndex(i)}
                  >
                    <div className=""></div>
                  </button>
                );
              })}
      </div>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
        Images and videos will be stored by us for 7 days. After that, they will be deleted.
      </p>
    </>
  );
};
const ShareComponent = ({ shareUrl, title, handleShare }) => {
  const spShare = useRef(navigator.share);
  return (
    <div className="generate-social" style={{ flexWrap: 'wrap' }}>
      {spShare.current ? (
        <span to="#" className="generate-social__item" onClick={handleShare}>
          <img src={Icons.share} alt="share" />
        </span>
      ) : null}
      <>
        <TwitterShareButton title={title} openShareDialogOnClick={!!shareUrl} url={shareUrl}>
          <span className="generate-social__item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 30 30"
            >
              <path
                fill="white"
                d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"
              ></path>
            </svg>
          </span>
        </TwitterShareButton>
        <TelegramShareButton title={title} openShareDialogOnClick={!!shareUrl} url={shareUrl}>
          <span className="generate-social__item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 50 50"
            >
              <path
                fill="white"
                d="M 44.376953 5.9863281 C 43.889905 6.0076957 43.415817 6.1432497 42.988281 6.3144531 C 42.565113 6.4845113 40.128883 7.5243408 36.53125 9.0625 C 32.933617 10.600659 28.256963 12.603668 23.621094 14.589844 C 14.349356 18.562196 5.2382813 22.470703 5.2382812 22.470703 L 5.3046875 22.445312 C 5.3046875 22.445312 4.7547875 22.629122 4.1972656 23.017578 C 3.9185047 23.211806 3.6186028 23.462555 3.3730469 23.828125 C 3.127491 24.193695 2.9479735 24.711788 3.015625 25.259766 C 3.2532479 27.184511 5.2480469 27.730469 5.2480469 27.730469 L 5.2558594 27.734375 L 14.158203 30.78125 C 14.385177 31.538434 16.858319 39.792923 17.402344 41.541016 C 17.702797 42.507484 17.984013 43.064995 18.277344 43.445312 C 18.424133 43.635633 18.577962 43.782915 18.748047 43.890625 C 18.815627 43.933415 18.8867 43.965525 18.957031 43.994141 C 18.958531 43.994806 18.959437 43.99348 18.960938 43.994141 C 18.969579 43.997952 18.977708 43.998295 18.986328 44.001953 L 18.962891 43.996094 C 18.979231 44.002694 18.995359 44.013801 19.011719 44.019531 C 19.043456 44.030655 19.062905 44.030268 19.103516 44.039062 C 20.123059 44.395042 20.966797 43.734375 20.966797 43.734375 L 21.001953 43.707031 L 26.470703 38.634766 L 35.345703 45.554688 L 35.457031 45.605469 C 37.010484 46.295216 38.415349 45.910403 39.193359 45.277344 C 39.97137 44.644284 40.277344 43.828125 40.277344 43.828125 L 40.310547 43.742188 L 46.832031 9.7519531 C 46.998903 8.9915162 47.022612 8.334202 46.865234 7.7402344 C 46.707857 7.1462668 46.325492 6.6299361 45.845703 6.34375 C 45.365914 6.0575639 44.864001 5.9649605 44.376953 5.9863281 z M 44.429688 8.0195312 C 44.627491 8.0103707 44.774102 8.032983 44.820312 8.0605469 C 44.866523 8.0881109 44.887272 8.0844829 44.931641 8.2519531 C 44.976011 8.419423 45.000036 8.7721605 44.878906 9.3242188 L 44.875 9.3359375 L 38.390625 43.128906 C 38.375275 43.162926 38.240151 43.475531 37.931641 43.726562 C 37.616914 43.982653 37.266874 44.182554 36.337891 43.792969 L 26.632812 36.224609 L 26.359375 36.009766 L 26.353516 36.015625 L 23.451172 33.837891 L 39.761719 14.648438 A 1.0001 1.0001 0 0 0 38.974609 13 A 1.0001 1.0001 0 0 0 38.445312 13.167969 L 14.84375 28.902344 L 5.9277344 25.849609 C 5.9277344 25.849609 5.0423771 25.356927 5 25.013672 C 4.99765 24.994652 4.9871961 25.011869 5.0332031 24.943359 C 5.0792101 24.874869 5.1948546 24.759225 5.3398438 24.658203 C 5.6298218 24.456159 5.9609375 24.333984 5.9609375 24.333984 L 5.9941406 24.322266 L 6.0273438 24.308594 C 6.0273438 24.308594 15.138894 20.399882 24.410156 16.427734 C 29.045787 14.44166 33.721617 12.440122 37.318359 10.902344 C 40.914175 9.3649615 43.512419 8.2583658 43.732422 8.1699219 C 43.982886 8.0696253 44.231884 8.0286918 44.429688 8.0195312 z M 33.613281 18.792969 L 21.244141 33.345703 L 21.238281 33.351562 A 1.0001 1.0001 0 0 0 21.183594 33.423828 A 1.0001 1.0001 0 0 0 21.128906 33.507812 A 1.0001 1.0001 0 0 0 20.998047 33.892578 A 1.0001 1.0001 0 0 0 20.998047 33.900391 L 19.386719 41.146484 C 19.35993 41.068197 19.341173 41.039555 19.3125 40.947266 L 19.3125 40.945312 C 18.800713 39.30085 16.467362 31.5161 16.144531 30.439453 L 33.613281 18.792969 z M 22.640625 35.730469 L 24.863281 37.398438 L 21.597656 40.425781 L 22.640625 35.730469 z"
              ></path>
            </svg>
          </span>
        </TelegramShareButton>
        <FacebookShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <span className="generate-social__item">
            <img src={Icons.facebook} alt="share" />
          </span>
        </FacebookShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <span className="generate-social__item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fff"
                d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
              ></path>
              <path
                fill="#fff"
                d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
              ></path>
              <path
                fill="#cfd8dc"
                d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
              ></path>
              <path
                fill="#40c351"
                d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
              ></path>
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </WhatsappShareButton>
      </>
    </div>
  );
};
