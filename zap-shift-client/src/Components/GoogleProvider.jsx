import React from "react";
import useAuth from "../Hooks/useAuth";
import { providerGoogle } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { axiosPublic } from "../api/axiosPublic";

const GoogleProvider = ({ children }) => {
  const { otherAuthUser } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleGoogleLogin = () => {
    otherAuthUser(providerGoogle)
      .then(async (res) => {
        const user = res.user;

        // store user in the database for role base authorization

        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date()
        };

        console.log("userInfo", userInfo);
        await axiosPublic.post("/register-user", userInfo).then((response) => {
          if (response.data.insertedId) {
            console.log("Google User success fully added in the database.");
          }
        });

        toast.success(`Google ${children} success`);
        navigate(state || "/");
      })
      .catch((err) => toast.error(err.code));
  };
  return (
    <>
      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        className="btn btn-active hover:bg-gray-300 font-inter text-black font-bold border-[#e5e5e5] btn-block"
      >
        <svg
          aria-label="Google logo"
          width="30"
          height="30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff0"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        {children} with Google
      </button>
    </>
  );
};

export default GoogleProvider;
