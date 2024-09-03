import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Components
import Loader from "@/components/Loader";

// Helpers
import { getAccessToken, getRefreshToken, hasPermission } from "@/helpers/auth";

// Actions
import { refreshToken, verifyToken, getAccount } from "@/store/actions";

interface Props {
  children: React.ReactNode;
  permissions?: number[];
}

const Authmiddleware = ({ children, permissions }: Props) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.account);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const checkAuth = async (access: string, refresh: string) => {
    if (access) {
      await dispatch(verifyToken(access)).then((result) => {
        if (result.meta.requestStatus === "rejected" && !refresh)
          navigate("/auth/login");
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

  useEffect(() => {
    if (!isAuth) return;
    dispatch(getAccount());
  }, [isAuth]);

  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if (!isAuth) return;
    if (!user) return;
    if (!hasPermission(user, permissions)) navigate("/");
    setPermission(true);
  }, [isAuth, user]);

  if (!isAuth || !permission) return <Loader />;

  return <React.Fragment>{children}</React.Fragment>;
};

export default Authmiddleware;
