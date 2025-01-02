import React from "react";
import withAuth from "../../context/withAuth";
import AirdropSectionItem from "../../components/AirDrop/AirdropSectionItem";

import {
  useMissionStarterCheck,
  useStarterMissionList,
} from "../../services/userService";
import { FaCheck } from "react-icons/fa";
import { useModal } from "../../context/modalContext";
import useWalletConnect from "../../hooks/useWalletConnect";
import Tutorials from "../../components/Tutorials";
import LoadingIcon from "../../components/Ui/LoadingIcon";
import LoadingText from "../../components/Loading/LoadingText";

const pageSize = 10;
const SocialMission = () => {
  const {
    data: result,
    refetch,
    isLoading,
  } = useStarterMissionList({
    page_index: 1,
    page_size: pageSize,
  });
  const data = result?.data;
  const { closeModal } = useModal();
  const {
    isPending,
    mutate,
    variables: dataChecking,
  } = useMissionStarterCheck(() => refetch());
  const { connectWallet } = useWalletConnect(() => {
    refetch();
  });

  const checking = (mission_code) => {
    mutate({
      mission_code,
    });
  };
  return (
    <div id="popup">
      <div
        className="popup__close js-close-popup"
        onClick={() => {
          closeModal();
        }}
      ></div>
      <div className="popup__content">
        <div className="box-popup-missions" style={{ padding: "24px 0" }}>
          <div>
            <h3 style={{ color: "#FFF" }}>
              FREE EXTRA CREDITS FOR FEATURE ACCESS
            </h3>
            <p className="top-des-page">
              Simply complete the <b>3</b> tasks below to earn extra credits.
              The more tasks you complete, the more daily credits you'll
              receive.
            </p>
          </div>
          <div className="airdrop-sec">
            <div className="airdrop-sec__right">
              {isLoading ? (
                <LoadingText />
              ) : (
                data?.records?.map((item) => {
                  return (
                    <AirdropSectionItem
                      key={item.id}
                      title={item?.name}
                      note={item?.description}
                      RightIcon={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            flexWrap: "wrap",
                            justifyContent: "flex-end",
                          }}
                        >
                          {!item?.is_completed ? (
                            <button
                              className="mission__button-action"
                              onClick={() => {
                                if (item?.code === "METAMASK_CONNECT") {
                                  connectWallet();
                                  return;
                                }
                                if (item?.link) window.open(item?.link);
                              }}
                            >
                              {item?.code?.split("_")?.at(1)}
                            </button>
                          ) : null}
                          {item?.is_completed ? (
                            <button disabled>
                              <FaCheck />
                            </button>
                          ) : item?.link ||
                            item?.code === "METAMASK_CONNECT" ? (
                            <div
                              style={{
                                height: 32,
                                width: 100,
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center  ",
                              }}
                              className="header-info__btn mission__button-verify"
                              disabled={
                                isPending &&
                                dataChecking?.mission_code === item.code
                              }
                              onClick={() => {
                                checking(item?.code);
                              }}
                            >
                              {isPending &&
                              dataChecking?.mission_code === item.code ? (
                                <LoadingIcon />
                              ) : (
                                <p style={{ maxWidth: 50 }}>VERIFY</p>
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      }
                      Icon={
                        item?.code?.split("_")?.at(0) === "TWITTER" ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.2726 1.58659H18.0838L11.9421 8.60617L19.1673 18.1582H13.51L9.07901 12.365L4.00894 18.1582H1.19601L7.76518 10.65L0.833984 1.58659H6.63491L10.6401 6.88187L15.2726 1.58659ZM14.2859 16.4756H15.8436L5.78848 3.18087H4.11687L14.2859 16.4756Z"
                              fill="white"
                            />
                          </svg>
                        ) : item?.code?.split("_")?.at(0) === "DISCORD" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M16.9308 3.46299C15.6561 2.87809 14.2892 2.44716 12.8599 2.20035C12.8339 2.19558 12.8079 2.20749 12.7945 2.23129C12.6187 2.54397 12.4239 2.95189 12.2876 3.27251C10.7503 3.04237 9.22099 3.04237 7.71527 3.27251C7.57887 2.94476 7.37707 2.54397 7.20048 2.23129C7.18707 2.20828 7.16107 2.19638 7.13504 2.20035C5.70659 2.44637 4.33963 2.8773 3.06411 3.46299C3.05307 3.46775 3.04361 3.47569 3.03732 3.486C0.444493 7.35964 -0.265792 11.1381 0.0826501 14.8696C0.0842267 14.8879 0.0944749 14.9054 0.108665 14.9165C1.81934 16.1727 3.47642 16.9354 5.10273 17.4409C5.12876 17.4489 5.15634 17.4394 5.1729 17.4179C5.55761 16.8926 5.90054 16.3386 6.19456 15.7561C6.21192 15.722 6.19535 15.6815 6.15989 15.668C5.61594 15.4617 5.098 15.2101 4.59977 14.9244C4.56037 14.9014 4.55721 14.845 4.59347 14.818C4.69831 14.7395 4.80318 14.6577 4.9033 14.5752C4.92141 14.5601 4.94665 14.5569 4.96794 14.5665C8.24107 16.0608 11.7846 16.0608 15.0191 14.5665C15.0404 14.5561 15.0657 14.5593 15.0846 14.5744C15.1847 14.6569 15.2895 14.7395 15.3952 14.818C15.4314 14.845 15.4291 14.9014 15.3897 14.9244C14.8914 15.2156 14.3735 15.4617 13.8288 15.6672C13.7933 15.6807 13.7775 15.722 13.7949 15.7561C14.0952 16.3378 14.4381 16.8917 14.8157 17.4171C14.8315 17.4394 14.8599 17.4489 14.8859 17.4409C16.5201 16.9354 18.1772 16.1727 19.8879 14.9165C19.9028 14.9054 19.9123 14.8887 19.9139 14.8704C20.3309 10.5563 19.2154 6.80887 16.9568 3.48679C16.9513 3.47569 16.9419 3.46775 16.9308 3.46299ZM6.68335 12.5975C5.69792 12.5975 4.88594 11.6928 4.88594 10.5817C4.88594 9.47065 5.68217 8.56595 6.68335 8.56595C7.69239 8.56595 8.49651 9.47859 8.48073 10.5817C8.48073 11.6928 7.68451 12.5975 6.68335 12.5975ZM13.329 12.5975C12.3435 12.5975 11.5316 11.6928 11.5316 10.5817C11.5316 9.47065 12.3278 8.56595 13.329 8.56595C14.338 8.56595 15.1421 9.47859 15.1264 10.5817C15.1264 11.6928 14.338 12.5975 13.329 12.5975Z"
                              fill="white"
                            />
                          </svg>
                        ) : (
                          <img
                            src="/assets/images/icon-metamask.png"
                            alt="images"
                          />
                        )
                      }
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
            alignItems: "center",
          }}
        >
          <p className="top-des-page">
            *The credits you use will convert into <b>Loyalty Points</b>, which
            can be exchanged for the exclusive rewards
          </p>
          <span
            className="header-info__btn"
            style={{ padding: "10px 20px", color: "#FFF" }}
            onClick={() => closeModal()}
          >
            Continue
          </span>
        </div>
      </div>
      <Tutorials id={"MISSION"} />
    </div>
  );
};
export default withAuth(SocialMission);
