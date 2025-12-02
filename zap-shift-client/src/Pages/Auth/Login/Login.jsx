import React from "react";
import GoogleProvider from "../../../Components/GoogleProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    loginUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        toast.success("Login Success");
        reset();
        navigate(state || "/");
      })
      .catch((err) => toast.error(err.code));
  };

  return (
    <>
      {/* title */}
      <div className="mb-5 space-y-1">
        <h1 className="text-2xl md:text-5xl font-extrabold font-inter">
          Welcome Back
        </h1>
        <p className="font-medium">Login with ZapShift</p>
      </div>

      {/* register form */}
      <form onSubmit={handleSubmit(handleRegister)}>
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
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z]).+$/,
                message: "Password must be one Uppercase and one Lowercase.",
              },
              minLength: {
                value: 6,
                message: "Password must 6 character or longer.",
              },
            })}
          />
          {errors.password?.type && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
          <Link to={'/forget'} className="font-inter underline inline-block mt-2 text-gray-600 hover:text-black">Forget Password?</Link>
        <button className="btn btn-primary text-secondary btn-block mt-3">
          Login
        </button>
      </form>
      <div className="mt-4">
        <p className="text-center">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-primary">
            Register
          </Link>
        </p>
        <div className="divider text-secondary-content">OR</div>
        <GoogleProvider>Login</GoogleProvider>
      </div>
    </>
  );
};

export default Login;
