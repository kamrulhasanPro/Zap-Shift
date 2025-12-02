import React from "react";
import { MdArrowOutward } from "react-icons/md";

const ArrowIcon = () => {
  return (
    <>
      <div className="bg-secondary rounded-full text-primary w-10 h-10 cursor-pointer flex items-center justify-center">
        <MdArrowOutward size={26} />
      </div>
    </>
  );
};

export default ArrowIcon;
