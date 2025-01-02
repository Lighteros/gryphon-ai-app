import React, { useState } from "react";
import { useModal } from "../../../context/modalContext";
import toast from "../../../components/Shared/toast";
import { useUser } from "../../../context/AuthContext";
import authService from "../../../services/authService";
import { useToggle } from "../../../hooks/useToggle";
import { RedirectUri } from "../../../utils";
import { LoginProviders } from "../../../constant";
import SidebarSettingMobile from "../../../components/SideBar/SidebarSettingMobile";
import { Link } from "react-router-dom";
import withAuth from "../../../context/withAuth";
import { FaCheck } from "react-icons/fa";
const LinkSocial = () => {
  const { closeModal } = useModal();
  const { user, fetchUserData } = useUser();
  const [loading, toggleLoading] = useToggle(false);
  const [showSidebarSetting, setShowSidebarSetting] = useToggle(false);
  const getTokenTwitter = () => {
    if (loading) return;
    toggleLoading();
    authService
      .get_token_twitter()
      .then((res) => {
        if (res.success) {
          RedirectUri.set("/setting-full/link-social-network");
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
  // const handleUnbind = (code) => {
  //   if (loading) return;
  //   toggleLoading();
  //   userService
  //     .unbindPlatform(code)
  //     .then((res) => {
  //       if (res.success) {
  //         fetchUserData(null, true);
  //         toast.success();
  //       } else {
  //         toast.error(res.error_message);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     })
  //     .finally(() => {
  //       toggleLoading();
  //     });
  // };
  return (
    <div className="p-content m-l setting">
      <div style={{ position: "fixed", zIndex: 50, top: 78, left: 0 }}>
        <SidebarSettingMobile
          showSidebarSetting={showSidebarSetting}
          setShowSidebarSetting={setShowSidebarSetting}
        />
      </div>
      <div className="p-content__wrap">
        <Link
          style={{ paddingBottom: 20 }}
          className="back-mobile"
          // to="/setting-full"
          onClick={() => setShowSidebarSetting(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M13 16.25L6.75 10L13 3.75"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p style={{ fontSize: 16, fontWeight: 600 }}>Link social</p>
        </Link>
        <div className="popup-policy">
          <div className="popup-policy__box" style={{ paddingTop: 0 }}>
            <div className="setting-link-social" style={{ padding: 12 }}>
              <h3 style={{ textAlign: "start", paddingBottom: 10 }}>
                Connect your social network
              </h3>
              <div className="setting-link-social-row">
                <div style={{ flex: 1 }}>
                  <div className="banner">
                    <div className="backdrop">
                      <div>
                        <div style={{ padding: 8, textAlign: "center" }}>
                          <h4>
                            Thousand of threads & experience sharing on our
                            Discord community
                          </h4>
                          <h6>
                            Unlocking endless creative possibilities with{" "}
                            <span>Blockchain-Powered Al</span>
                          </h6>
                        </div>
                      </div>
                    </div>

                    <img src="/assets/images/banner3.1.png" alt="images" />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="box-link-social">
                    <div className="box-link-social-item">
                      <div className="child-box-social">
                        <div className="child-box-social-top">
                          <div className="social-top-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M15.2726 1.58643H18.0838L11.9421 8.606L19.1673 18.1581H13.51L9.07901 12.3648L4.00894 18.1581H1.19601L7.76518 10.6498L0.833984 1.58643H6.63491L10.6401 6.8817L15.2726 1.58643ZM14.2859 16.4754H15.8436L5.78848 3.1807H4.11687L14.2859 16.4754Z"
                                fill="#2E2E2E"
                              />
                            </svg>
                          </div>
                          <div className="social-top-title">X (Twitter)</div>
                        </div>
                        {user?.provider.includes(LoginProviders.TWITTER) ? (
                          <>
                            <button
                              style={{ maxWidth: 120 }}
                              className="btn-social-top-check"
                            >
                              <FaCheck />
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn-social-top"
                            onClick={getTokenTwitter}
                            style={{ maxWidth: 120 }}
                          >
                            Connect
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="box-link-social-item">
                      <div className="child-box-social">
                        <div className="child-box-social-top">
                          <div className="social-top-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M16.9308 3.4629C15.6561 2.87799 14.2892 2.44707 12.8599 2.20025C12.8339 2.19549 12.8079 2.20739 12.7945 2.2312C12.6187 2.54388 12.4239 2.9518 12.2876 3.27242C10.7503 3.04228 9.22099 3.04228 7.71527 3.27242C7.57887 2.94467 7.37707 2.54388 7.20048 2.2312C7.18707 2.20819 7.16107 2.19629 7.13504 2.20025C5.70659 2.44628 4.33963 2.87721 3.06411 3.4629C3.05307 3.46766 3.04361 3.4756 3.03732 3.48591C0.444493 7.35954 -0.265792 11.138 0.0826501 14.8695C0.0842267 14.8878 0.0944749 14.9053 0.108665 14.9164C1.81934 16.1726 3.47642 16.9353 5.10273 17.4408C5.12876 17.4488 5.15634 17.4393 5.1729 17.4178C5.55761 16.8925 5.90054 16.3385 6.19456 15.756C6.21192 15.7219 6.19535 15.6814 6.15989 15.6679C5.61594 15.4616 5.098 15.21 4.59977 14.9243C4.56037 14.9013 4.55721 14.8449 4.59347 14.8179C4.69831 14.7394 4.80318 14.6576 4.9033 14.5751C4.92141 14.56 4.94665 14.5568 4.96794 14.5664C8.24107 16.0608 11.7846 16.0608 15.0191 14.5664C15.0404 14.5561 15.0657 14.5592 15.0846 14.5743C15.1847 14.6568 15.2895 14.7394 15.3952 14.8179C15.4314 14.8449 15.4291 14.9013 15.3897 14.9243C14.8914 15.2155 14.3735 15.4616 13.8288 15.6671C13.7933 15.6806 13.7775 15.7219 13.7949 15.756C14.0952 16.3377 14.4381 16.8917 14.8157 17.417C14.8315 17.4393 14.8599 17.4488 14.8859 17.4408C16.5201 16.9353 18.1772 16.1726 19.8879 14.9164C19.9028 14.9053 19.9123 14.8886 19.9139 14.8703C20.3309 10.5562 19.2154 6.80878 16.9568 3.4867C16.9513 3.4756 16.9419 3.46766 16.9308 3.4629ZM6.68335 12.5974C5.69792 12.5974 4.88594 11.6927 4.88594 10.5816C4.88594 9.47056 5.68217 8.56585 6.68335 8.56585C7.69239 8.56585 8.49651 9.4785 8.48073 10.5816C8.48073 11.6927 7.68451 12.5974 6.68335 12.5974ZM13.329 12.5974C12.3435 12.5974 11.5316 11.6927 11.5316 10.5816C11.5316 9.47056 12.3278 8.56585 13.329 8.56585C14.338 8.56585 15.1421 9.4785 15.1264 10.5816C15.1264 11.6927 14.338 12.5974 13.329 12.5974Z"
                                fill="#2E2E2E"
                              />
                            </svg>
                          </div>
                          <div className="social-top-title">Discord</div>
                        </div>
                        {user?.provider.includes(LoginProviders.DISCORD) ? (
                          <div style={{ display: "flex", gap: 4 }}>
                            <button
                              style={{ maxWidth: 120 }}
                              className="btn-social-top-check"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <a
                            style={{ maxWidth: 120 }}
                            onClick={() => RedirectUri.set("/setting-full")}
                            href={`https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_CALLBACK_DISCORD}&scope=identify+email+guilds`}
                            className="btn-social-top"
                          >
                            Connect
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="box-link-social-item">
                  <div className="child-box-social">
                    <div className="child-box-social-top">
                      <div className="social-top-icon">
                      <img src={"/assets/images/telegram.png"} alt="telegram" height={24} />
                      </div>
                      <div className="social-top-title">Telegram</div>
                    </div>
                    {user?.provider.includes(LoginProviders.TELEGRAM) ? (
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button
                          className="btn-social-top-check"
                          onClick={() => {
                            handleUnbind(LoginProviders.TELEGRAM);
                          }}
                        >
                          {loading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" size={24} />
                          ) : (
                            'Unbind'
                          )}
                        </button>
                      </div>
                    ) : (
                      <a
                        onClick={() => RedirectUri.set('/setting-full')}
                        href={`https://oauth.telegram.org/auth?bot_id=${process.env.REACT_APP_TELEGRAM_BOT_ID}&origin=${process.env.REACT_APP_TELEGRAM_CALLBACK}&embed=1&request_access=write&return_to=${process.env.REACT_APP_TELEGRAM_CALLBACK}`}
                        className="btn-social-top"
                      >
                        Connect
                      </a>
                    )}

                 
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(LinkSocial);
