import React from "react";
import icon from "../../../assets/service.png";

const Service = () => {
  const serviceList = [
    {
      title: "Express  & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Nationwide Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Fulfillment Solution",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Cash on Home Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Parcel Return",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
  ];
  return (
    <div className="bg-secondary p-10 rounded-2xl text-white space-y-8">
      {/* title and subtitle */}
      <div className="text-center space-y-4">
        <h3 className="text-4xl font-extrabold">Our Service</h3>
        <p className="font-medium text-base-200/70">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br /> business shipments — we
          deliver on time, every time.
        </p>
      </div>

      {/* service */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceList.map((service, i) => (
          <div key={i} className="p-5 rounded-xl bg-base-200 hover:bg-primary transition-all flex flex-col items-center justify-center ">
            <figure className="p-3 rounded-full bg-linear-to-b from-[#EEEDFC] to-transparent">
              <img src={icon} alt="" />
            </figure>
            <div className="text-center">
              <h4 className="text-xl font-bold mb-2 text-secondary">
                {service.title}
              </h4>
              <p className="text-secondary-content">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
