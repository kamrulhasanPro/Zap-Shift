import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000",
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptors
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // response interceptors
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log(error);
        const statusError = error.status;
        if (statusError === 401 || statusError === 403) {
          logOutUser().then(() => {
            toast.error(error.response.data.message || "Not trust user.");
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.request.eject(resInterceptor);
    };
  }, [user.accessToken]);
  return axiosSecure;
};

export default useAxiosSecure;
