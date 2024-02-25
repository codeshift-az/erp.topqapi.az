import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

// Helpers
import { getRefreshToken } from "@/helpers/auth";

// Actions
import { logout } from "@/store/auth/actions";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const refresh = getRefreshToken();

    dispatch(logout(refresh)).then(() => {
      navigate("/auth/login");
    });
  }, [dispatch]);

  return <React.Fragment></React.Fragment>;
};

export default Logout;
