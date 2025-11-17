import React from "react";
import uploadProfile from "../../assets/image-upload-icon.png";
import { Link } from "react-router";
import GoogleProvider from "../../Components/GoogleProvider";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // my register submit
  const handleRegister = (data) => {
    console.log(data);
    reset();
  };
  
  return (
    <>
      {/* title */}
      <div className="mb-5 space-y-1">
        <h1 className="text-2xl md:text-5xl font-extrabold font-inter">
          Create an Account
        </h1>
        <p className="font-medium">Register with ZapShift</p>
      </div>

      {/* register form */}
      <form onSubmit={handleSubmit(handleRegister)}>
        <img src={uploadProfile} alt="" />

        {/* Name */}
        <div className="flex flex-col mt-3">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="my_input"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required.</p>
          )}
        </div>

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
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}
        </div>

        {/* password */}
        <div className="flex flex-col mt-3">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="my_input"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be 6 character or longer.",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z]).+$/,
                message: "Password must be one Uppercase and one Lowercase",
              },
            })}
          />
          {errors.password?.type && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button className="btn btn-primary text-secondary btn-block mt-3">
          Register
        </button>
      </form>
      <div className="mt-4">
        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary">
            Login
          </Link>
        </p>
        <div className="divider text-secondary-content">OR</div>
        <GoogleProvider>Registration</GoogleProvider>
      </div>
    </>
  );
};

export default Register;
