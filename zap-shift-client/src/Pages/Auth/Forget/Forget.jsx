import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Forget = () => {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm();
  const handleForget = (data) => {
    resetPassword(data.email)
      .then(() => {
        toast.info("Please check your email and reset your password")
        resetField('email')
    })
      .catch((err) => toast.error(err.code));
  };

  return (
    <>
      {/* title */}
      <div className="mb-5 space-y-1">
        <h1 className="text-2xl md:text-5xl font-extrabold font-inter">
          Forgot Password
        </h1>
        <p className="font-medium">
          Enter your email address and we’ll send you a reset link.
        </p>
      </div>

      {/* register form */}
      <form onSubmit={handleSubmit(handleForget)}>
        {/* email */}
        <div className="flex flex-col mt-3">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="my_input"
            {...register("email", { required: "Email is required." })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button className="btn btn-primary text-secondary btn-block mt-3">
          Send
        </button>
      </form>
      <div className="mt-4">
        <p className="text-center">
          Remember your password?{" "}
          <Link to={"/login"} className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Forget;
