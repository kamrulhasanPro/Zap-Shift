import React from "react";
import Logo from "../../Components/logo";
import MyLink from "../../Components/MyLink";
import { MdArrowOutward } from "react-icons/md";
import ArrowIcon from "../../Components/ArrowIcon";

const Navbar = () => {
  const navList = <>
  <MyLink to={'/service'}>Service</MyLink>
  <MyLink to={'/coverage'}>Coverage</MyLink>
  <MyLink to={'/about-us'}>About Us</MyLink>
  <MyLink to={'/pricing'}>Pricing</MyLink>
  <MyLink to={'/blog'}>Blog</MyLink>
  <MyLink to={'/contact'}>Contact</MyLink>
  </>
  return (
    <div className="navbar bg-base-200 px-8 py-4 shadow-sm rounded-2xl z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navList}
          </ul>
        </div>
        {/* logo */}
        <Logo/>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal gap-5 px-1">
          {navList}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <button className="my_btn_outline !rounded-xl">Sign in</button>
        <button className="my_btn">Sign Up</button>
        <ArrowIcon/>
      </div>
    </div>
  );
};

export default Navbar;
