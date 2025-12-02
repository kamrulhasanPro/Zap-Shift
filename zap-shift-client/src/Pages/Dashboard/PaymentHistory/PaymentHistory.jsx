import React from "react";
import MySection from "../../../Components/MySection";
import HeadTitle from "../../../Components/HeadTitle";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payment = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user.email],
    queryFn: async () =>
      (await axiosSecure(`/payment-history?email=${user.email}`)).data,
  });

  return (
    <MySection>
      <HeadTitle>Payment History ({payment.length})</HeadTitle>
      <div className="overflow-x-auto rounded-box border border-base-content/5 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-100 text-secondary font-extrabold">
              <th>Parcel Name</th>
              <th>Transaction Id</th>
              <th>Tracking Id</th>
              <th>Payment Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payment.map((payment, i) => (
              <tr
                key={payment._id}
                className={`${i % 2 !== 0 && "bg-gray-100"} text-nowrap`}
              >
                <td>{payment.parcelName}</td>
                <td>{payment.transaction}</td>
                <td>{payment.trackingId}</td>

                {/* payment price, status */}
                <td>
                  <button className="btn btn-soft bg-green-100 text-green-500">
                    {`৳${payment.amount} (${payment.paymentStatus})`}
                  </button>
                </td>

                {/* action */}
                <td>
                  <button className="btn btn-soft btn-info">View</button>
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

export default PaymentHistory;
