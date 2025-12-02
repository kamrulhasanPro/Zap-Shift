import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../api/useAxiosSecure";
import { PiSpinnerBallFill } from "react-icons/pi";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();
  const { data: parcel = {}, isLoading } = useQuery({
    queryKey: ["specificQuery", parcelId],
    queryFn: async () => {
      const res = await axiosSecure(`parcels/${parcelId}`);
      return res.data;
    },
  });
  console.table(parcel);
  const paymentInfo = {
    cost: parcel.cost,
    name: parcel.name,
    _id: parcel._id,
    senderEmail: parcel.senderEmail,
  };

  const handlePayNow = async () => {
    const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
    console.log(res.data);
    window.location.href = res.data;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <PiSpinnerBallFill className="animate-spin text-secondary" size={60} />
      </div>
    );
  }

  return (
    <div>
      <p>Parcel Name: {parcel.name}</p>
      <button onClick={handlePayNow} className="btn btn-warning">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
