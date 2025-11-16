import React from "react";
import { MdArrowOutward } from "react-icons/md";

const ArrowIcon = () => {
  return (
    <>
      <div className="bg-secondary rounded-full text-primary p-2 cursor-pointer inline-block">
        <MdArrowOutward size={26} />
      </div>
    </>
  );
};

export default ArrowIcon;
