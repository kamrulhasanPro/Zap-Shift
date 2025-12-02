import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "../api/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => (await axiosSecure(`/user/${user?.email}/role`)).data,
  });
  return { role, isLoading };
};

export default useRole;
