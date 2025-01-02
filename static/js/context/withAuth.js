import React, { useEffect } from "react";
import { useUser } from "./AuthContext";
import { useModal } from "./modalContext";
import { useNavigate, us } from "react-router-dom";
import { RedirectUri } from "../utils";
const withAuth = (WrappedComponent, navigateTo = "/") => {
  const WithAuthRedirectComponent = (props) => {
    const { isAuthenticated, isLoading } = useUser();

    const navigate = useNavigate();
    const { openModal } = useModal();
    useEffect(() => {
      if (isLoading || isAuthenticated) return;
      openModal("login");
      RedirectUri.set(window.location.pathname);
      navigate(navigateTo);
      // eslint-disable-next-line no-restricted-globals
    }, [isAuthenticated, isLoading]);

    if (isLoading || !isAuthenticated) return <></>;

    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirectComponent;
};

export default withAuth;
