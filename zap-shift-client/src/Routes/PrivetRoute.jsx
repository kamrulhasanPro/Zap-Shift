import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import { PiSpinnerBallFill } from "react-icons/pi";

const PrivetRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const { pathname } = useLocation();

  if (loader) {
    return (
      <div className="h-screen flex items-center justify-center">
        <PiSpinnerBallFill className="animate-spin text-secondary" size={60}/>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={pathname} />;
};

export default PrivetRoute;
