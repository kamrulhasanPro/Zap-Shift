import React from "react";
import ArrowIcon from "../../../Components/ArrowIcon";
import delivery from '../../../assets/tiny-deliveryman.png'

const Banner = ({item}) => {
  const {title, description, bannerImg} = item
  return (
    <>
      <div
        className={
          "bg-base-200 p-10 flex flex-col-reverse md:flex-row justify-between gap-10"
        }
      >
        {/* banner content */}
        <div className="flex-1">
          <figure>
            <img src={delivery} alt="" />
          </figure>
          {/* hading */}
          <h1 className="text-secondary font-extrabold text-3xl lg:text-5xl">
            {title}
          </h1>

          {/* description */}
          <p className="text-secondary-content mt-4">
            {description}
          </p>

          {/* button */}
          <div className="flex mt-4">
            <button className="my_btn !rounded-full mr-0.5">
              Track Your Parcel
            </button>
            <ArrowIcon />
            <button className="my_btn_outline ml-2.5">Be A Rider</button>
          </div>
        </div>

        {/* banner image */}
        <div className="flex-1">
          <img src={bannerImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Banner;
