import React from "react";
import uploadProfile from "../../../assets/image-upload-icon.png";
import { Link, useNavigate } from "react-router";
import GoogleProvider from "../../../Components/GoogleProvider";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { axiosPublic } from "../../../api/axiosPublic";

const Register = () => {
  const { registerUser, logOutUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // my register submit
  const handleRegister = (data) => {
    console.log(data);
    const profileImg = data.photo[0];
    console.log(profileImg);

    registerUser(data.email, data.password)
      .then((res) => {
        // convert file that formData
        const formData = new FormData();
        formData.append("image", profileImg);

        // upload profile for get url
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMAGE_HOST
            }`,
            formData
          )

          .then((result) => {
            console.log(result.data);
            if (result.data) {
              // get profile url
              const photoURL = result.data.data.display_url;
              const user = res.user;

              if (user) {
                // store user in the database for role base authorization
                const userInfo = {
                  email: data.email,
                  displayName: data.name,
                  photoURL,
                  createdAt: new Date()
                };
                console.log("userInfo", userInfo);
                axiosPublic
                  .post("/register-user", userInfo)
                  .then((response) => {
                    if (response.data.insertedId) {
                      console.log("User success fully added in the database.");
                    }
                  });

                // update name and profile
                updateProfile(user, { displayName: data.name, photoURL }).then(
                  () => {
                    // initial logout and reset form
                    logOutUser().then();
                    toast.success("Successfully register. please login");
                    // reset();
                    navigate("/login");
                  }
                );
              }
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error(err.code));
  };
  console.log(errors);
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
        {/* Profile */}
        <div className="flex flex-col mt-3">
          <label htmlFor="photo" className="font-medium">
            <img src={uploadProfile} alt="" />
          </label>

          <input
            id="photo"
            type="file"
            accept="image/*"
            className="file-input mt-2"
            {...register("photo", { required: true })}
          />

          {errors.photo?.type === "required" && (
            <p className="text-red-500">Profile is required.</p>
          )}
        </div>

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
