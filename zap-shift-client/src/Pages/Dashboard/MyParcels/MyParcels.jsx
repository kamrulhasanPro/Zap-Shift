import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";
import MySection from "../../../Components/MySection";
import { FiEdit } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import { MdPreview } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";
import HeadTitle from "../../../Components/HeadTitle";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // get api
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  // delete api
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/parcels/${id}`),
  });

  // delete toast and confirmation
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await mutateAsync(id);
          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          toast.error(error.code);
        }
      }
    });
  };

  // payment now
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      _id: parcel._id,
      parcelName: parcel.parcelName,
      description: parcel.senderInstruction,
      senderEmail: parcel.senderEmail,
      cost: parcel.cost,
    };
    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      console.log(res.data);
      window.location.assign(res.data.url);
    } catch (error) {
      toast.error(error.code);
    }
  };

  return (
    <MySection className={"!p-7"}>
      <HeadTitle>My Parcels ({parcels.length})</HeadTitle>
      <div className="overflow-x-auto rounded-box border border-base-content/5 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-100 text-secondary font-extrabold">
              <th></th>
              <th>Parcel</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr
                key={parcel._id}
                className={`${i % 2 !== 0 && "bg-gray-100"} text-nowrap`}
              >
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>

                {/* payment status */}
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <button className="btn btn-soft bg-green-100 text-green-500">
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-warning"
                    >
                      Pay Now
                    </button>
                  )}
                </td>

                {/* delivery status */}
                <td>{parcel.deliveryStatus}</td>

                {/* action */}
                <td>
                  <button className="btn btn-soft btn-info">
                    <MdPreview size={30} />
                  </button>
                  <button className="btn btn-soft btn-success mx-1.5">
                    <FiEdit size={24} />
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-soft btn-error"
                  >
                    <LuTrash2 size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <LoadingSpinner />}
      </div>
    </MySection>
  );
};

export default MyParcels;
