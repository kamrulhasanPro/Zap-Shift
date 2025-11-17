import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate('/')} className="flex items-end cursor-pointer">
        {/* logo */}
      <img src={logo} alt="logo" />
      {/* logo name */}
      <p className="text-3xl font-extrabold -ml-3.5">
        ZapShift
      </p>
    </div>
  );
};

export default Logo;
