import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Helpers
import { getAccessToken, getRefreshToken } from "@/helpers/auth";

// Actions
import { refreshToken, verifyToken } from "@/store/auth/actions";
import Loader from "@/components/Loader";

interface Props {
  children: React.ReactNode;
}

const Authmiddleware = ({ children }: Props) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const checkAuth = async (access: string, refresh: string) => {
    if (access) {
      await dispatch(verifyToken(access)).then((result) => {
        if (result.meta.requestStatus === "rejected" && !refresh) navigate("/auth/login");
      });
      return;
    } else if (refresh) {
      await dispatch(refreshToken(refresh)).then((result) => {
        if (result.meta.requestStatus === "rejected") navigate("/auth/login");
      });
      return;
    }
  };

  useEffect(() => {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    if (!access && !refresh) {
      navigate("/auth/login");
      return;
    }

    if (!isAuth && (access || refresh)) checkAuth(access, refresh);
  }, []);

  if (!isAuth) return <Loader />;

  return <React.Fragment>{children}</React.Fragment>;
};

export default Authmiddleware;
