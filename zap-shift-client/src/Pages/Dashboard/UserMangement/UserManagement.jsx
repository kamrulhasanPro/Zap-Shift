import React, { useState } from "react";
import MySection from "../../../Components/MySection";
import HeadTitle from "../../../Components/HeadTitle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../api/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { LuTrash2 } from "react-icons/lu";
import { FiEdit, FiShieldOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchValue],
    queryFn: async () =>
      (await axiosSecure(`/users?search=${searchValue}`)).data,
  });

  // admin set or remove function
  const handleAdmin = async (id, status) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `Your are decision for ${
          status === "Admin" ? "mark Admin" : "remove admin"
        }!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${
          status === "Admin" ? "Mark Admin" : "Remove Admin"
        }!`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await axiosSecure.patch(`/users/${id}`, {
            status: status,
          });
          if (result.data.modifiedCount) {
            refetch();
            queryClient.invalidateQueries("role");
            Swal.fire({
              title: `${status === "Admin" ? "Marked" : "Removed"}!`,
              text: `Completed Admin ${
                status === "Admin" ? "marked" : "removed"
              }.`,
              icon: "success",
            });
          }
        }
      });
    } catch (error) {
      toast.error(error.code);
    }
  };

  return (
    <MySection>
      {/* head and search */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <HeadTitle>User Manage</HeadTitle>
        <label className="input my_input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
      </div>

      {/* users */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-gray-100 text-secondary font-extrabold">
              <th>#</th>
              <th>User Info</th>
              <th>Crated Time</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user._id}
                className={`${i % 2 !== 0 && "bg-gray-100"} text-nowrap`}
              >
                <th>{i + 1}</th>

                {/* user info */}
                <td>
                  <div className="flex gap-2 items-center">
                    <figure className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        src={user.photoURL}
                        alt="profile"
                        className="object-center object-cover w-full h-full"
                      />
                    </figure>
                    <div>
                      <p className="font-bold text-secondary">
                        {user.displayName}
                      </p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </div>
                </td>

                {/* created at */}

                <td>{new Date(user.createdAt).toLocaleString()}</td>

                {/* user role */}
                <td>
                  <p
                    className={`btn btn-soft ${
                      user.role === "User"
                        ? "bg-indigo-100 text-indigo-500"
                        : "bg-green-100 text-green-500"
                    }`}
                  >
                    {user.role}
                  </p>
                </td>

                {/* admin action */}
                <td>
                  {user.role === "Admin" ? (
                    <button
                      onClick={() => handleAdmin(user._id, "User")}
                      className="btn bg-red-300 text-white text-2xl"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdmin(user._id, "Admin")}
                      className="btn bg-green-300 text-white text-2xl"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>

                {/* action */}
                <td>
                  {/* <button className="btn btn-soft btn-info">
                    <MdPreview size={30} />
                  </button> */}
                  <button className="btn btn-soft btn-success mx-1.5">
                    <FiEdit size={24} />
                  </button>
                  <button
                    // onClick={() => handleDelete(parcel._id)}
                    className="btn btn-soft btn-error"
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

export default UserManagement;
