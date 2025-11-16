import React from "react";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end">
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
