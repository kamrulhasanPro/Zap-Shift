import React from "react";
import MySection from "../../Components/MySection";
import HeadTitle from "../../Components/HeadTitle";
import riderImage from "../../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../api/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Rider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  // onsubmit
  const onSubmit = async (data) => {
    console.log(data);
    const res = await axiosSecure.post("/riders", data);
    console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        title:
          "Your Request successfully. we are check your request via 24hours!",
        icon: "success",
        draggable: true,
      });
      reset();
    }
    if(res.data.message){
      toast.error(res.data.message)
    }
  };

  // region data
  const centers = useLoaderData();
  const getRegion = centers.map((center) => center.region);
  const region = [...new Set(getRegion)];

  // regin watch mode
  const yourRegion = useWatch({
    name: "region",
    control,
    defaultValue: "Dhaka",
  });

  // wirehouse
  const wireHoseDetect = () => {
    const regionFilter = centers.filter((r) => r.region === yourRegion);
    const district = regionFilter.map((center) => center.district);
    return district;
  };
  const wireHouse = wireHoseDetect() || [];

  return (
    <MySection>
      {/* title */}
      <div>
        <HeadTitle>Be a Rider</HeadTitle>
        <p className="text-secondary-content mt-4">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="divider"></div>

      {/* form and image */}
      <div className="flex gap-4">
        {/* form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="text-lg font-extrabold text-secondary">
              Tell us about yourself
            </h5>

            {/* your name and age */}
            <div className="flex flex-col lg:flex-row lg:gap-4">
              {/* Your Name */}
              <div className="flex flex-col mt-3 flex-1">
                <label htmlFor="name" className="font-medium">
                  Your Name
                </label>
                <input
                  defaultValue={user?.displayName}
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="my_input"
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Your Name is required.</p>
                )}
              </div>

              {/* Driving License Number */}
              <div className="flex flex-col mt-3 flex-1 w-full">
                <label htmlFor="license" className="font-medium">
                  Driving License Number
                </label>
                <input
                  type="number"
                  id="license"
                  placeholder="Driving License Number"
                  className="my_input"
                  {...register("license", { required: true })}
                />
                {errors.license?.type === "required" && (
                  <p className="text-red-500">Your license is required.</p>
                )}
              </div>
            </div>

            {/* address, and Region */}
            <div className="flex flex-col lg:flex-row lg:gap-4">
              {/* email */}
              <div className="flex flex-col mt-3 flex-1 w-full">
                <label htmlFor="email" className="font-medium">
                  Your Email{" "}
                </label>
                <input
                  value={user?.email}
                  readOnly
                  type="text"
                  id="email"
                  placeholder="Your Email"
                  className="my_input"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Your Email is required.</p>
                )}
              </div>
              {/* your region */}
              <div className="flex flex-col mt-3 flex-1 w-full">
                <label htmlFor="region" className="font-medium">
                  Your Region{" "}
                </label>
                <select
                  id="region"
                  defaultValue="Select your region"
                  className="select my_input bg-transparent focus-within:bg-gray-100 text-[#94A3B8] focus-within:text-black w-full"
                  placeholder="Select your region"
                  {...register("region", { required: true })}
                >
                  <option disabled={true}>Select your region</option>

                  {region.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                {errors.region?.type === "required" && (
                  <p className="text-red-500">Your Region is required.</p>
                )}
              </div>
            </div>

            {/* Nid, and Phone */}
            <div className="flex flex-col lg:flex-row lg:gap-4">
              {/* Nid */}
              <div className="flex flex-col mt-3 flex-1 w-full">
                <label htmlFor="nidNumber" className="font-medium">
                  NID{" "}
                </label>
                <input
                  type="text"
                  id="nidNumber"
                  placeholder="Your NID Number"
                  className="my_input"
                  {...register("nidNumber", {
                    required: true,
                    pattern: {
                      value: /^\+?\d+$/,
                      message: "Only use just number",
                    },
                  })}
                />
                {errors.nidNumber && (
                  <p className="text-red-500">{errors.nidNumber.message}</p>
                )}
              </div>

              {/* contact */}
              <div className="flex flex-col mt-3 flex-1">
                <label htmlFor="phoneNumber" className="font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  className="my_input"
                  {...register("phoneNumber", {
                    required: "Your Phone Number is required.",
                    pattern: {
                      value:
                        /^\+?\d+$/,
                      message: "Only use just phone number",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            {/* your district */}
            <div className="flex flex-col mt-3 flex-1">
              <label htmlFor="district" className="font-medium">
                Your District
              </label>
              <select
                id="district"
                defaultValue="Select Wire House"
                className="select my_input bg-transparent focus-within:bg-gray-100 text-[#94A3B8] w-full focus-within:text-black"
                placeholder="Select Wire house"
                {...register("district", { required: true })}
              >
                <option disabled={true}>Select Wire House</option>
                {wireHouse.map((house, i) => (
                  <option key={i}>{house}</option>
                ))}
              </select>

              {errors.district?.type === "required" && (
                <p className="text-red-500">District is required.</p>
              )}
            </div>

            {/* Bike Brand Modal and year */}
            <div className="flex flex-col mt-3 flex-1">
              <label htmlFor="bikeModal" className="font-medium">
                Bike Brand Modal and Year
              </label>
              <input
                type="text"
                id="bikeModal"
                placeholder="Bike Brand Modal and Year"
                className="my_input"
                {...register("bikeModal", {
                  required: "Bike Modal is required.",
                })}
              />
              {errors.bikeModal && (
                <p className="text-red-500">{errors.bikeModal.message}</p>
              )}
            </div>

            {/* Bike Register Number */}
            <div className="flex flex-col mt-3 flex-1">
              <label htmlFor="bikeRegister" className="font-medium">
                Bike Register Number
              </label>
              <input
                type="text"
                id="bikeRegister"
                placeholder="Bike Register Number"
                className="my_input"
                {...register("bikeRegister", {
                  required: "Bike Registration is required.",
                  pattern: {
                    value: /^\+?\/?\d+$/,
                    message: "Only use just number",
                  },
                })}
              />
              {errors.bikeRegister && (
                <p className="text-red-500">{errors.bikeRegister.message}</p>
              )}
            </div>

            {/* Tell Us About Yourself */}
            <div className="flex flex-col mt-3 flex-1">
              <label htmlFor="about" className="font-medium">
                Tell Us About Yourself
              </label>
              <input
                type="text"
                id="about"
                placeholder="Tell Us About Yourself"
                className="my_input"
                {...register("about", {
                  required: "About YourSelf is required.",
                })}
              />
              {errors.about && (
                <p className="text-red-500">{errors.about.message}</p>
              )}
            </div>
            <button className="btn btn-primary text-secondary btn-block mt-5">
              {/* {isPending ? (
                <PiSpinnerBallFill className="animate-spin text-secondary" />
              ) : (
                "Proceed to Confirm Booking"
              )} */}
              Submit
            </button>
          </form>
        </div>

        {/* image */}
        <figure className="flex-1 flex items-start justify-center">
          <img src={riderImage} alt="rider image" />
        </figure>
      </div>
    </MySection>
  );
};

export default Rider;
