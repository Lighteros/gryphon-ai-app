import React, { useRef, useState } from "react";
import { useModal } from "../../../context/modalContext";

import { useUser } from "../../../context/AuthContext";
import withAuth from "../../../context/withAuth";
import {
  checkFileSize,
  checkTypeImage,
  imageFormatAllowed,
  toAvatarUrl,
} from "../../../utils/file";
import toast from "../../../components/Shared/toast";
import userService from "../../../services/userService";
import { FaPenClip, FaPlus } from "react-icons/fa6";
import Modal from "../../../components/Modal/Modal";
import { useToggle } from "../../../hooks/useToggle";
import ChangeNameModal from "../../../components/Modal/ChangeNameModal";
import { Link } from "react-router-dom";
import { copyText, generateRefLink } from "../../../utils";
import SidebarSettingMobile from "../../../components/SideBar/SidebarSettingMobile";
const Profile = () => {
  const { closeModal, openModal } = useModal();
  const { user, fetchUserData } = useUser();
  const [openModalChangeName, toggleModalChangName] = useToggle(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebarSetting, setShowSidebarSetting] = useToggle(false);
  const ref = useRef(null);
  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!checkTypeImage(file.type)) {
      return toast.error("Accept image formats " + imageFormatAllowed);
    }
    if (!checkFileSize(file.size, 50)) {
      toast.error("Your file maximum is 50mb");
      return;
    }
    var formData = new FormData();
    formData.append("avatar", file);
    try {
      setIsLoading(true);
      const rs = await userService.uploadAvatar(formData);
      if (rs.success) {
        fetchUserData(() => {
          setIsLoading(false);
          toast.success();
        }, true);
        return;
      }
      toast.error(rs.error_message);
      setIsLoading(false);
      return null;
    } catch (error) {
      toast.error();
      setIsLoading(false);
      return null;
    }
  };
  const refLink = generateRefLink(user?.ref_code);
  return (
    <div className="p-content m-l setting" style={{ height: "100vh" }}>
      <div style={{ position: "fixed", zIndex: 50, top: 78, left: 0 }}>
        <SidebarSettingMobile
          showSidebarSetting={showSidebarSetting}
          setShowSidebarSetting={setShowSidebarSetting}
        />
      </div>
      <div className="p-content__wrap" style={{ width: "100%" }}>
        <Link
          style={{ paddingBottom: 20 }}
          className="back-mobile"
          to="/setting-full"
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
          <p style={{ fontSize: 16, fontWeight: 600 }}>Profile information</p>
        </Link>
        <div className="popup-policy" style={{ marginTop: 70 }}>
          <div
            className="popup-policy__box"
            style={{ maxWidth: "60rem", margin: "auto" }}
          >
            <div
              className="setting-profile"
              style={{
                position: "relative",
                marginTop: 5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="avatar-img"
                onClick={() => !isLoading && ref.current?.click()}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={toAvatarUrl(user?.avatar_url)}
                  alt="images"
                  style={{
                    width: 100,
                    aspectRatio: 1,
                    borderRadius: 9999,
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: `rgba(255,255,255, ${
                      isLoading ? "0.8" : "0.2"
                    })`,
                    borderRadius: 9999,
                  }}
                >
                  <FaPlus size={30} color="orange" />
                </div>
              </div>
              <input
                type="file"
                ref={ref}
                style={{ display: "none" }}
                onChange={handleChangeAvatar}
              />
              <div className="info-user">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="user-name">
                    {" "}
                    {user?.full_name ? user?.full_name : user?.code}{" "}
                  </p>
                  <FaPenClip
                    size={16}
                    color="orange"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      toggleModalChangName();
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <p style={{ fontSize: 16 }}>UID: </p>
                    <p className="user-name" style={{ fontSize: 16 }}>
                      {" "}
                      {user?.code}{" "}
                    </p>
                    <span
                      className="copy"
                      onClick={() => copyText(user?.code)}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15.75 15.75H20.25V3.75H8.25V8.25"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.75 8.25H3.75V20.25H15.75V8.25Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <p style={{ textAlign: "center" }} className="user-email">
                  {user?.email}
                </p>

                {/* 
                <p className="user-email">
                  Credit Balance: {Number(user?.bonus_balance) + Number(user?.credit_balance)}
                </p> */}
              </div>
            </div>
            <h4 style={{ fontWeight: 500, textAlign: "center", marginTop: 20 }}>
              Invite friends to earn more point{" "}
            </h4>

            <p
              className="setting-invite__code"
              style={{ marginTop: 8, minWidth: 0 }}
            >
              <p style={{ wordBreak: "break-word" }}>{refLink}</p>
              <span className="copy" onClick={() => copyText(refLink)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.75 15.75H20.25V3.75H8.25V8.25"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.75 8.25H3.75V20.25H15.75V8.25Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                alignItems: "flex-start",
                // margin: '20px 20px 0px',
                marginTop: 40,
                justifyContent: "center",
              }}
            >
              <Link
                to="/instant-art-creator"
                className="popup-form__btn"
                style={{ flex: 1, minWidth: "200px" }}
                onClick={() => closeModal()}
              >
                Create profile picture
              </Link>
              {user?.by_email ? (
                <div
                  className="popup-change-password__btn"
                  style={{ flex: 1, minWidth: "200px" }}
                  onClick={() => openModal("change-password")}
                >
                  Change password
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={openModalChangeName} closeModal={toggleModalChangName}>
        <ChangeNameModal onClose={toggleModalChangName} />
      </Modal>
    </div>
  );
};

export default withAuth(Profile);
