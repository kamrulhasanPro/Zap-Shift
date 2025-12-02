import React from "react";
import MySection from "../../../Components/MySection";
import HeadTitle from "../../../Components/HeadTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../api/useAxiosSecure";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();

  // get rider
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => (await axiosSecure("/riders")).data,
  });

  // patch rider
  const handleStatus = async (id, data) => {
    const res = await axiosSecure.patch(`/rider-status/${id}`, data);
    if (res.data.modifiedCount) {
      refetch();
    }
  };

  // delete rider
  const handleDelete = async (rider) => {
    const email = { email: rider.email };
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
          const res = await axiosSecure.delete(`/riders/${rider._id}`, {
            data: email,
          });
          if (res.data.deletedCount) {
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

  // approved
  const handleApproved = (rider) => {
    handleStatus(rider._id, {
      status: "Approved",
      email: rider.email,
      workStatus: "available",
      update: {
        $set: { role: "Rider" },
      },
    });
  };

  // rejected
  const handleRejected = (rider) => {
    handleStatus(rider._id, {
      status: "Rejected",
      email: rider.email,
      workStatus: "unavailable",
      update: {
        $set: { role: "User" },
      },
    });
  };

  return (
    <MySection>
      <HeadTitle>Approve Rider ({riders.length})</HeadTitle>
      <div className="overflow-x-auto rounded-box border border-base-content/5 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-100 text-secondary font-extrabold">
              <th></th>
              <th>Rider Info</th>
              <th>Address</th>
              <th>Bike Info</th>
              <th>Request Time</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, i) => (
              <tr
                key={rider._id}
                className={`${i % 2 !== 0 && "bg-gray-100"} text-nowrap`}
              >
                <th>{i + 1}</th>
                {/* rider info */}
                <td>
                  <p className="font-semibold text-secondary">{rider.name}</p>
                  <p className="text-sm">email: {rider.email}</p>
                  <p className="text-sm">license: {rider.license}</p>
                  <p className="text-sm">Nid: {rider.nidNumber}</p>
                </td>

                {/* address */}
                <td>
                  <p>{rider.phoneNumber}</p>
                  <p>
                    {rider.region}, {rider.district}, Bangladesh
                  </p>
                </td>

                {/* bike info */}
                <td>
                  <p>Modal: {rider.bikeModal}</p>
                  <p>Register: {rider.bikeRegister}</p>
                </td>

                {/* request time */}
                <td>{new Date(rider.createdAt).toLocaleString()}</td>

                {/* rider status */}
                <td>
                  <button
                    className={`btn btn-soft ${
                      rider.status === "Approved"
                        ? "text-green-500 bg-green-100"
                        : "text-red-500 bg-red-100"
                    }`}
                  >
                    {rider.status}
                  </button>
                </td>

                {/* work status */}
                <td>{rider.workStatus}</td>

                {/* action */}
                <td>
                  {/* approve */}
                  <button
                    onClick={() => handleApproved(rider)}
                    className="btn btn-soft btn-success"
                    title="Approved"
                  >
                    <IoPersonAdd size={24} />
                  </button>

                  {/* reject */}
                  <button
                    onClick={() => handleRejected(rider)}
                    className="btn btn-soft btn-accent mx-1.5"
                    title="Rejected"
                  >
                    <IoPersonRemove size={24} />
                  </button>

                  {/* delete */}
                  <button
                    onClick={() => handleDelete(rider)}
                    className="btn btn-soft btn-error"
                    title="Deleted"
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

export default ApproveRider;
