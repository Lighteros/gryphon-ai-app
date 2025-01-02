import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BiLoader, BiSolidCommentError } from "react-icons/bi";
import { RiChatCheckFill } from "react-icons/ri";
import ImagePopup from "../../components/ImagePopup/ImagePopup";
import { useUser } from "../../context/AuthContext";
import toast from "../../components/Shared/toast";
import authService from "../../services/authService";
import { useModal } from "../../context/modalContext";

const Activate = () => {
  const [activate, setActivate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { fetchUserData } = useUser();
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();
  let email = searchParams.get("email");
  let token = searchParams.get("token");

  useEffect(() => {
    if (!email || !token) {
      return;
    }
    const data = { email, token };
    const fetchActive = async (data) => {
      setLoading(true);
      try {
        const res = await authService.activeAcount(data);
        if (res.success) {
          setActivate(true);
          fetchUserData(() => {});
          toast.success("Successfully.");
          openModal("login");
          setLoading(false);
        } else {
          setActivate(false);
          const error = res.error_message;
          setError(error);
          console.log(error);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error checking email", error);
        toast.error();
        setError("Cannot submit request. Check your internet connection.");
        setLoading(false);
      }
    };
    fetchActive(data);
  }, [email, token]);
  return (
    <div
      id="popup"
      className="activate-account"
      style={{
        height: "90vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <div className="popup__body ">
        <div className="popup__content">
          {loading ? (
            <div>
              {" "}
              <p className="popup__ttl">Please wait...</p>
            </div>
          ) : (
            <div>
              {activate ? (
                <p className="popup__ttl" style={{ color: "green" }}>
                  Successful activation <RiChatCheckFill />
                </p>
              ) : (
                <p className="popup__ttl" style={{ color: "red" }}>
                  {error} <BiSolidCommentError />
                </p>
              )}
            </div>
          )}
          <div className="popup-form">
            <form action="">
              <Link to="/" className="popup-form__btn">
                Home
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
