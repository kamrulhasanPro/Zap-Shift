import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { PiSpinnerBallFill } from "react-icons/pi";
import Lottie from "lottie-react";
import errorAnimation from "../assets/Protect.json";
import { Link } from "react-router";

const AdminRoute = ({ children }) => {
  const { loader } = useAuth();
  const { role, isLoading } = useRole();

  if (loader || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <PiSpinnerBallFill className="animate-spin text-secondary" size={60} />
      </div>
    );
  }

  if (role !== "Admin") {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <Lottie
          animationData={errorAnimation}
          loop={true}
          className="h-80"
        />
        <h5 className="text-red-400 font-semibold text-4xl">
          Your Are Forbidden user not access for you.
        </h5>
        <p>please contact to admin and allow this page.</p>

        <div className="flex gap-2">
          <Link to={"/"} className="btn btn-primary text-secondary">
            Go Home
          </Link>
          <Link to={"/dashboard"} className="btn btn-secondary text-white">
            Go Dashboard
          </Link>
        </div>
      </div>
  
    );
  }

  return children;
};

export default AdminRoute;
