import React from "react";
import MySection from "../../../Components/MySection";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  return (
    <MySection className={"flex flex-col items-center justify-center"}>
      <figure>
        <img className="w-40" src={"https://img.icons8.com/color/48/cancel--v1.png"} alt="" />
      </figure>
      <p className="text-2xl font-semibold mb-2 text-red-500">Payment failed</p>

      <button
        onClick={() => navigate("/dashboard")}
        className="my_btn"
      >
        Go Dashboard
      </button>
    </MySection>
  );
};

export default Error;
