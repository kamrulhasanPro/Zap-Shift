import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import MySection from "../../../Components/MySection";
import useAxiosSecure from "../../../api/useAxiosSecure";
import { toast } from "react-toastify";

const Success = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [searchParam] = useSearchParams();
  const session_id = searchParam.get("session_id");
  console.log(session_id);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const effectCalled = useRef(false);

  useEffect(() => {
    if (!effectCalled.current && session_id) {
      effectCalled.current = true;
      try {
        axiosSecure
          .patch(`/success_payment?session_id=${session_id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.message) {
              setPaymentInfo(res?.data?.checkPayment);
            } else {
              setPaymentInfo(res.data.paymentInfo);
            }
          });
      } catch (error) {
        toast.error(error.code);
      }
    }
  }, [session_id, axiosSecure]);

  return (
    <MySection className={"flex flex-col items-center justify-center"}>
      <figure>
        <img
          className="w-40"
          src={
            "https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png"
          }
          alt=""
        />
      </figure>
      <p className="text-2xl font-semibold mb-2 text-green-500">
        Payment {paymentInfo?._id ? "Already Complete" : "success"}
      </p>
      <p>Payment Email: {paymentInfo?.customerEmail}</p>
      <p>Transaction: {paymentInfo?.transaction}</p>
      <p>Tracking Id: {paymentInfo?.trackingId}</p>
      <button
        onClick={() => navigate("/dashboard")}
        className="my_btn"
      >
        Go Dashboard
      </button>
    </MySection>
  );
};

export default Success;
