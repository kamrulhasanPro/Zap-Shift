import React from "react";
import MyContainer from "../Components/MyContainer";
import authImage from "../assets/authImage.png";
import Logo from "../Components/logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <MyContainer className={"flex  justify-between !p-0 min-h-screen "}>
      {/* form */}
      <div className="bg-base-200 flex-1 p-5 space-y-5">
        <Logo />

        <div className="w-9/12 mx-auto">
          <Outlet />
        </div>
      </div>

      {/* right side image */}
      <div className="bg-[#FAFDF0] flex-1 p-5 hidden md:flex items-center justify-center ">
        <img src={authImage} alt="" />
      </div>
    </MyContainer>
  );
};

export default AuthLayout;
