import React from "react";
import MySection from "../../Components/MySection";
import HeadTitle from "../../Components/HeadTitle";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { axiosPublic } from "../../api/axiosPublic";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { PiSpinnerBallFill } from "react-icons/pi";

const AddParcel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
  } = useForm();

  // tanstack use
  const { isPending, mutateAsync } = useMutation({
    mutationKey: "parcels",
    mutationFn: async (data) => await axiosPublic.post("/parcels", data),
    onSuccess: (res) => {
      console.log(res);
      reset();
    },
    onError: (err) => toast.error(err.code),
    onMutate: (data) => console.table(data),
  });

  const handleParcel = (data) => {
    const checkRegion = data.receiverRegion === data.senderRegion;
    const isDocument = data.isDocument;
    const productWeight = Number(data.weight);
    let cost = 0;
    if (isDocument === "true") {
      cost = checkRegion ? 60 : 80;
    } else {
      productWeight < 3
        ? (cost = checkRegion ? 110 : 150)
        : (cost = checkRegion
            ? 40 * (productWeight - 3) + 110
            : 40 * (productWeight - 3) + 110 + 40);
    }
    data.cost = cost;

    // confirmation
    Swal.fire({
      title: "Aport this cost?",
      text: `Your delivery charge ${cost} Taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Create & Continue Payment!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(data);
        navigate("/dashboard");
        Swal.fire({
          title: "Done!",
          text: "Create success continue payment.",
          icon: "success",
        });
      }
    });
  };

  // region data
  const centers = useLoaderData();
  const getRegion = centers.map((center) => center.region);
  const region = [...new Set(getRegion)];

  // watch
  const controlSenderRegion = useWatch({ name: "senderRegion", control });
  const controlReceiverRegion = useWatch({ name: "receiverRegion", control });

  // district or wirehouse
  const wireHose = (region) => {
    const regionWireHouse = centers.filter((c) => c.region === region);
    const district = regionWireHouse.map((c) => c.district);
    return district;
  };

  return (
    <MySection>
      {/* title */}
      <HeadTitle>Add Parcel</HeadTitle>
      <hr className="border-t-2 border-gray-400 border-dashed my-8" />
      <form onSubmit={handleSubmit(handleParcel)}>
        {/* parcel info, name and weight */}
        <div className="space-y-5">
          <h4 className="text-xl md:text-2xl font-extrabold text-secondary">
            Enter your parcel details
          </h4>
          <div>
            {/* radio */}
            <div className="flex items-center gap-3">
              <label htmlFor="document">
                <input
                  id="document"
                  type="radio"
                  name="radio-7"
                  value={true}
                  className="radio radio-success"
                  defaultChecked
                  {...register("isDocument")}
                />
                {"  "}Document
              </label>

              <label htmlFor="non-document">
                <input
                  type="radio"
                  name="radio-7"
                  id="non-document"
                  className="radio radio-success"
                  value={false}
                  {...register("isDocument")}
                />
                {"  "}Non-Document
              </label>
            </div>

            {/* parcel info */}
            <div className="flex items-center justify-between gap-4">
              {/* Name */}
              <div className="flex flex-col mt-3 flex-1">
                <label htmlFor="parcelName" className="font-medium">
                  Parcel Name
                </label>
                <input
                  type="text"
                  id="parcelName"
                  placeholder="Parcel Name"
                  className="my_input"
                  {...register("parcelName", { required: true })}
                />
                {errors.parcelName?.type === "required" && (
                  <p className="text-red-500">Name is required.</p>
                )}
              </div>
              {/* Weight */}
              <div className="flex flex-col mt-3 flex-1">
                <label htmlFor="weight" className="font-medium">
                  Parcel Weight (KG)
                </label>
                <input
                  type="text"
                  id="weight"
                  placeholder="Parcel Weight (KG)"
                  className="my_input"
                  {...register("weight", {
                    required: "Weight is required.",
                    pattern: {
                      value: /^\d+(\.\d+)?$/,
                      message: "Only use just number",
                    },
                  })}
                />
                {errors.weight && (
                  <p className="text-red-500">{errors.weight.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        {/* main form */}
        <div className="grid grid-cols-2 gap-5">
          {/* ---------- sender ----------*/}
          <div>
            <h5 className="text-lg font-extrabold text-secondary">
              Sender Details
            </h5>

            {/* sender name and pickup */}
            <div className="flex flex-col lg:flex-row lg:gap-4">
              {/* Sender Name */}
              <div className="flex flex-col mt-3 flex-1">
                <label htmlFor="senderName" className="font-medium">
                  Sender Name
                </label>
                <input
                  value={user?.displayName}
                  readOnly
                  type="text"
                  id="senderName"
                  placeholder="Sender Name"
                  className="my_input"
                  {...register("senderName", { required: true })}
                />
                {errors.senderName?.type === "required" && (
                  <p className="text-red-500">Sender Name is required.</p>
                )}
              </div>

              {/* sender email */}
              <div className="flex flex-col mt-3 flex-1 w-full">
                <label htmlFor="senderEmail" className="font-medium">
                  Your Email{" "}
                </label>
                <input
                  value={user?.email}
                  readOnly
                  type="text"
                  id="senderEmail"
                  placeholder="Sender Name"
                  className="my_input"
                  {...register("senderEmail", { required: true })}
                />
                {errors.senderEmail?.type === "required" && (
                  <p className="text-red-500">Sender Email is required.</p>
                )}
              </div>
            </div>

            {/* address, and sender contact */}
            <div className="flex flex-col lg:flex-row lg:gap-4">
              {/* address */}
              <div className="flex flex-col mt-3 flex-1">
                <label htmlFor="senderAddress" className="font-medium">
                  Sender Address
                </label>
                <input
                  type="text"
                  id="senderAddress"
                  placeholder="Address"
                  className="my_input"
                  {...register("senderAddress", { required: true })}
                />
                {errors.senderAddress?.type === "required" && (
                  <p className="text-red-500">Sender Address is required.</p>
                )}
              </div>
              {/* contact */}
              <div className="flex flex-col mt-3 flex-1">
                <label htmlFor="senderContact" className="font-medium">
                  Sender Contact
                </label>
                <input
                  type="text"
                  id="senderContact"
                  placeholder="Sender Contact"
                  className="my_input"
                  {...register("senderContact", {
                    required: "Sender Contact is required.",
                    pattern: {
                      value: /^\+?\d+$/,
                      message: "Only use just number",
                    },
                  })}
                />
                {errors.senderContact && (
                  <p className="text-red-500">{errors.senderContact.message}</p>
                )}
              </div>
            </div>

            {/* sender region */}
            <div className="flex flex-col mt-3 flex-1 w-full">
              <label htmlFor="senderRegion" className="font-medium">
                Your Region{" "}
              </label>
              <select
                id="senderRegion"
                defaultValue="Select your region"
                className="select my_input bg-transparent focus-within:bg-gray-100 text-[#94A3B8] focus-within:text-black w-full"
                placeholder="Select your region"
                {...register("senderRegion", { required: true })}
              >
                <option disabled={true}>Select your region</option>

                {region.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {errors.senderRegion?.type === "required" && (
                <p className="text-red-500">Sender Region is required.</p>
              )}
            </div>

            {/* sender and pickup */}
            <div className="flex flex-col mt-3 flex-1">
              <label htmlFor="senderPickup" className="font-medium">
                Sender Pickup Wire house
              </label>
              <select
                id="senderPickup"
                defaultValue="Select Wire House"
                className="select my_input bg-transparent focus-within:bg-gray-100 text-[#94A3B8] w-full focus-within:text-black"
                placeholder="Select Wire house"
                {...register("senderPickup", { required: true })}
              >
                <option disabled={true}>Select Wire House</option>
                {wireHose(controlSenderRegion).map((house, i) => (
                  <option value={house} key={i}>
                    {house}
                  </option>
                ))}
              </select>

              {errors.senderPickup?.type === "required" && (
                <p className="text-red-500">Sender Pickup is required.</p>
              )}
            </div>

            {/* sender instruction */}
            <div className="flex flex-col mt-3 flex-1">
              <label htmlFor="pickupInstruction" className="font-medium">
                Pickup Instruction
              </label>
              <textarea
                type="text"
                rows={4}
                id="pickupInstruction"
                placeholder="Pickup Instruction"
                className="my_input"
                {...register("senderInstruction", { required: true })}
              />
              {errors.senderInstruction?.type === "required" && (
                <p className="text-red-500">Pickup Instruction is required.</p>
              )}
            </div>
          </div>

          {/*----------- receiver -----------  */}
          <div>
            <h5 className="text-lg font-extrabold text-secondary">
              Receiver Details
            </h5>

            {/* receiver name and delivery */}
            <div className="flex flex-col lg:flex-row lg:gap-4">
              {/* receiver Name */}
              <div className="flex flex-col mt-3 flex-1">
                <label htmlFor="receiverName" className="font-medium">
                  Receiver Name
                </label>
                <input
                  type="text"
                  id="receiverName"
                  placeholder="Receiver Name"
                  className="my_input"
                  {...register("receiverName", { required: true })}
                />
                {errors.receiverName?.type === "required" && (
                  <p className="text-red-500">Receiver Name is required.</p>
                )}
              </div>

              {/* receiver email */}
              <div className="flex flex-col mt-3 flex-1 w-full">
                <label htmlFor="receiverEmail" className="font-medium">
                  Receiver Email{" "}
                </label>
                <input
                  type="email"
                  id="receiverEmail"
                  placeholder="Receiver Name"
                  className="my_input"
                  {...register("receiverEmail", { required: true })}
                />
                {errors.receiverEmail?.type === "required" && (
                  <p className="text-red-500">Receiver Email is required.</p>
                )}
              </div>
            </div>

            {/* address, and receiver contact */}
            <div className="flex flex-col lg:flex-row lg:gap-4">
              {/* address */}
              <div className="flex flex-col  mt-3 flex-1">
                <label htmlFor="receiverAddress" className="font-medium">
                  Receiver Address
                </label>
                <input
                  type="text"
                  id="receiverAddress"
                  placeholder="Address"
                  className="my_input"
                  {...register("receiverAddress", { required: true })}
                />
                {errors.receiverAddress?.type === "required" && (
                  <p className="text-red-500">Receiver Address is required.</p>
                )}
              </div>

              {/* contact */}
              <div className="flex flex-col mt-3 flex-1">
                <label htmlFor="receiverContact" className="font-medium">
                  Receiver Contact
                </label>
                <input
                  type="text"
                  id="receiverContact"
                  placeholder="Receiver Contact"
                  className="my_input"
                  {...register("receiverContact", {
                    required: "Receiver Contact is required.",
                    pattern: {
                      value: /^\+?\d+$/,
                      message: "Only use just number",
                    },
                  })}
                />
                {errors.receiverContact && (
                  <p className="text-red-500">
                    {errors.receiverContact.message}
                  </p>
                )}
              </div>
            </div>

            {/* receiver region */}
            <div className="flex flex-col mt-3 flex-1">
              <label htmlFor="receiverRegion" className="font-medium">
                Receiver Region{" "}
              </label>
              <select
                id="receiverRegion"
                defaultValue="Select receiver region"
                className="select my_input bg-transparent focus-within:bg-gray-100 text-[#94A3B8] focus-within:text-black w-full"
                placeholder="Select receiver region"
                {...register("receiverRegion", { required: true })}
              >
                <option disabled={true}>Select receiver region</option>
                {region.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {errors.receiverRegion?.type === "required" && (
                <p className="text-red-500">Receiver Region is required.</p>
              )}
            </div>

            {/* receiver and delivery wire house */}
            <div className="flex flex-col mt-3 flex-1">
              <label htmlFor="receiverDelivery" className="font-medium">
                Receiver Delivery Wire house
              </label>
              <select
                id="receiverDelivery"
                defaultValue="Select Wire House"
                className="select my_input bg-transparent focus-within:bg-gray-100 text-[#94A3B8] w-full focus-within:text-black"
                placeholder="Select Wire house"
                {...register("receiverDelivery", { required: true })}
              >
                <option disabled={true}>Select Wire House</option>
                {wireHose(controlReceiverRegion).map((house, i) => (
                  <option value={house} key={i}>
                    {house}
                  </option>
                ))}
              </select>

              {errors.receiverDelivery?.type === "required" && (
                <p className="text-red-500">Receiver Delivery is required.</p>
              )}
            </div>

            {/* receiver instruction */}
            <div className="flex flex-col mt-3 flex-1">
              <label htmlFor="deliveryInstruction" className="font-medium">
                Delivery Instruction
              </label>
              <textarea
                type="text"
                rows={4}
                id="deliveryInstruction"
                placeholder="Delivery Instruction"
                className="my_input"
                {...register("deliveryInstruction", { required: true })}
              />
              {errors.deliveryInstruction?.type === "required" && (
                <p className="text-red-500">
                  Delivery Instruction is required.
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="my-5">* PickUp Time 4pm-7pm Approx.</p>
        <button className="btn btn-primary text-secondary">
          {isPending ? (
            <PiSpinnerBallFill className="animate-spin text-secondary" />
          ) : (
            "Proceed to Confirm Booking"
          )}
        </button>
      </form>
    </MySection>
  );
};

export default AddParcel;
