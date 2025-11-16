import React from "react";
import location from "../../../assets/location-merchant.png";
import bgPng from "../../../assets/be-a-merchant-bg.png"

const Merchant = () => {
  return (
    <section 
    style={{backgroundImage: `url(${bgPng})`}}
    className={`bg-secondary p-10 rounded-2xl text-base-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-top bg-no-repeat`}>
      {/* content */}
      <div className="space-y-3 flex-1">
        <h3 className="text-2xl lg:text-4xl font-extrabold">
          Merchant and Customer Satisfaction is Our First Priority
        </h3>
        <p className="font-medium text-base-200/70">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>

        {/* button */}
        <div className="flex gap-2 flex-wrap">
          <button className="my_btn !rounded-full">Become a Merchant</button>
          <button className="btn btn-primary rounded-full btn-outline">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>

      {/* image */}
      <figure className="flex-1">
        <img src={location} alt="" />
      </figure>
    </section>
  );
};

export default Merchant;
