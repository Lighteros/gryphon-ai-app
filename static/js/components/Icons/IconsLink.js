import React, { useRef } from "react";
import { Icons } from "../../constant/icon";
import authService from "../../services/authService";

import toast from "../Shared/toast";

import { useToggle } from "../../hooks/useToggle";
import { generateRandomString } from "../../utils";

const IconsLink = () => {
  const [loading, toggleLoading] = useToggle(false);
  const nonce = useRef(generateRandomString(64)).current;
  // const handleAppleLogin = async () => {
  //   if (loading) return;
  //   const data = {};
  //   await authService
  //     .login_apple(data)
  //     .then((res) => {})
  //     .catch((error) => {})
  //     .finally();
  // };

  const getTokenTwitter = () => {
    if (loading) return;
    toggleLoading();
    authService
      .get_token_twitter()
      .then((res) => {
        if (res.success) {
          window.location.href =
            "https://api.twitter.com/oauth/authorize?oauth_token=" + res.data;
        } else {
          toast.error(res.error_message);
        }
      })
      .catch((error) => {
        console.log("get token failed:", error);
        toast.error();
      })
      .finally(() => {
        toggleLoading();
      });
  };

  const opacity = loading ? 0.4 : 1;

  return (
    <div className="popup-form__logo">
      {/* <div className="item" style={{ opacity: opacity }}>
        <img src={Icons.facebook} alt="facebook" />
      </div> */}

      {/* <a
        tabIndex={3}
        className="item"
        style={{ opacity: opacity }}
        href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CALLBACK_GOOGLE}&response_type=id_token&scope=email&nonce=${nonce}`}
      >
        <img src={Icons.google} alt="google" />
      </a> */}
      {/* 
      <div className="item" onClick={handleAppleLogin} style={{ opacity: opacity }}>
        <img src={Icons.apple} alt="apple" />
      </div> */}

      <a
        tabIndex={4}
        className="item"
        href={`https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_CALLBACK_DISCORD}&scope=identify+email+guilds`}
        rel="noopener noreferrer"
        style={{ opacity: opacity, display: "flex", gap: 5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M16.9308 3.4629C15.6561 2.87799 14.2892 2.44707 12.8599 2.20025C12.8339 2.19549 12.8079 2.20739 12.7945 2.2312C12.6187 2.54388 12.4239 2.9518 12.2876 3.27242C10.7503 3.04228 9.22099 3.04228 7.71527 3.27242C7.57887 2.94467 7.37707 2.54388 7.20048 2.2312C7.18707 2.20819 7.16107 2.19629 7.13504 2.20025C5.70659 2.44628 4.33963 2.87721 3.06411 3.4629C3.05307 3.46766 3.04361 3.4756 3.03732 3.48591C0.444493 7.35954 -0.265792 11.138 0.0826501 14.8695C0.0842267 14.8878 0.0944749 14.9053 0.108665 14.9164C1.81934 16.1726 3.47642 16.9353 5.10273 17.4408C5.12876 17.4488 5.15634 17.4393 5.1729 17.4178C5.55761 16.8925 5.90054 16.3385 6.19456 15.756C6.21192 15.7219 6.19535 15.6814 6.15989 15.6679C5.61594 15.4616 5.098 15.21 4.59977 14.9243C4.56037 14.9013 4.55721 14.8449 4.59347 14.8179C4.69831 14.7394 4.80318 14.6576 4.9033 14.5751C4.92141 14.56 4.94665 14.5568 4.96794 14.5664C8.24107 16.0608 11.7846 16.0608 15.0191 14.5664C15.0404 14.5561 15.0657 14.5592 15.0846 14.5743C15.1847 14.6568 15.2895 14.7394 15.3952 14.8179C15.4314 14.8449 15.4291 14.9013 15.3897 14.9243C14.8914 15.2155 14.3735 15.4616 13.8288 15.6671C13.7933 15.6806 13.7775 15.7219 13.7949 15.756C14.0952 16.3377 14.4381 16.8917 14.8157 17.417C14.8315 17.4393 14.8599 17.4488 14.8859 17.4408C16.5201 16.9353 18.1772 16.1726 19.8879 14.9164C19.9028 14.9053 19.9123 14.8886 19.9139 14.8703C20.3309 10.5562 19.2154 6.80878 16.9568 3.4867C16.9513 3.4756 16.9419 3.46766 16.9308 3.4629ZM6.68335 12.5974C5.69792 12.5974 4.88594 11.6927 4.88594 10.5816C4.88594 9.47056 5.68217 8.56585 6.68335 8.56585C7.69239 8.56585 8.49651 9.4785 8.48073 10.5816C8.48073 11.6927 7.68451 12.5974 6.68335 12.5974ZM13.329 12.5974C12.3435 12.5974 11.5316 11.6927 11.5316 10.5816C11.5316 9.47056 12.3278 8.56585 13.329 8.56585C14.338 8.56585 15.1421 9.4785 15.1264 10.5816C15.1264 11.6927 14.338 12.5974 13.329 12.5974Z"
            fill="white"
          />
        </svg>
        <p style={{ color: "#FFF", fontSize: 14, fontWeight: 500 }}>Discord</p>
      </a>
      <div
        className="item"
        onClick={getTokenTwitter}
        style={{ opacity: opacity, display: "flex", gap: 5 }}
        tabIndex={5}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M15.2719 1.58667H18.0831L11.9414 8.60625L19.1666 18.1583H13.5093L9.07834 12.365L4.00827 18.1583H1.19534L7.76451 10.6501L0.833313 1.58667H6.63424L10.6395 6.88195L15.2719 1.58667ZM14.2852 16.4757H15.843L5.78781 3.18095H4.1162L14.2852 16.4757Z"
            fill="white"
          />
        </svg>
        <p style={{ color: "#FFF", fontSize: 14, fontWeight: 500 }}>
          X (Twitter)
        </p>
      </div>
    </div>
  );
};

export default IconsLink;
