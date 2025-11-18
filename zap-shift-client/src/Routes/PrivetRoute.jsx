import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivetRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const { pathname } = useLocation();

  if (loader) {
    return <p>loading.......</p>;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={pathname} />;
};

export default PrivetRoute;
