import React, { useRef, useState } from "react";
import MySection from "../../../Components/MySection";
import HeadTitle from "../../../Components/HeadTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../api/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { toast } from "react-toastify";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const refModal = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);

  // get all pending pickup parcels
  const {
    data: pendingParcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => (await axiosSecure("/pending-parcels")).data,
  });

  // available raider
  const { data: riders = [] } = useQuery({
    queryKey: ["raiders", selectedParcel?.senderPickup, "available"],
    enabled: !!selectedParcel,
    queryFn: async () =>
      (
        await axiosSecure(
          `/riders?status=Approved&workStatus=available&district=${selectedParcel?.senderPickup}`
        )
      ).data,
  });

  const onAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    refModal.current.show();
  };

  // add assign
  const handleAssign = async (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
    };

    const result = await axiosSecure.patch(
      `/parcel/${selectedParcel._id}`,
      riderAssignInfo
    );
    if (result.data.modifiedCount) {
      refetch();
      toast.success(`Assign ${rider.name} rider.`);
    }
  };

  return (
    <MySection>
      <HeadTitle>Assign Riders ({pendingParcels.length})</HeadTitle>
      <div className="overflow-x-auto rounded-box border border-base-content/5 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-100 text-secondary font-extrabold">
              <th></th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Address</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingParcels.map((parcel, i) => (
              <tr
                key={parcel._id}
                className={`${i % 2 !== 0 && "bg-gray-100"} text-nowrap`}
              >
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>

                {/* Address */}
                <td>
                  {parcel.senderRegion}, {parcel.senderPickup}, Bangladesh
                </td>

                {/* delivery status */}
                <td>{parcel.deliveryStatus}</td>

                {/* action */}
                <td>
                  <button
                    onClick={() => onAssignRiderModal(parcel)}
                    className="btn btn-primary text-secondary"
                  >
                    Find Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <LoadingSpinner />}
      </div>

      {/* modal */}
      <dialog ref={refModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="overflow-x-auto rounded-box border border-base-content/5 mt-5">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-gray-100 text-secondary font-extrabold">
                  <th></th>
                  <th>Rider Info</th>
                  <th>Address</th>
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
                      <p className="font-semibold text-secondary">
                        {rider.name}
                      </p>
                      <p className="text-sm">email: {rider.email}</p>
                    </td>

                    {/* address */}
                    <td>
                      <p>{rider.phoneNumber}</p>
                      <p>
                        {rider.region}, {rider.district}, Bangladesh
                      </p>
                    </td>

                    {/* action */}
                    <td>
                      <button
                        onClick={() => handleAssign(rider)}
                        className="btn btn-primary text-secondary"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isLoading && <LoadingSpinner />}
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </MySection>
  );
};

export default AssignRiders;
