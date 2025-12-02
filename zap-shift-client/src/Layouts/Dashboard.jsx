import React from "react";
import { CgMenuLeft } from "react-icons/cg";
import { Link, Outlet } from "react-router";
import Logo from "../Components/logo";
import { FaCreditCard, FaUsers } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";
import useRole from "../Hooks/useRole";
import { TbTruckDelivery } from "react-icons/tb";

const Dashboard = () => {
  const { role } = useRole();
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-200">
            <div className="navbar">
              {/* navbar */}
              <div className="flex-1">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  {/* Sidebar toggle icon */}
                  <CgMenuLeft />
                </label>{" "}
              </div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {" "}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />{" "}
                      </svg>
                      <span className="badge badge-sm indicator-item">8</span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
                  >
                    <div className="card-body">
                      <span className="text-lg font-bold">8 Items</span>
                      <span className="text-info">Subtotal: $999</span>
                      <div className="card-actions">
                        <button className="btn btn-primary btn-block">
                          View cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>

                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* Page content here */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 ">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li className="">
                <button>
                  <span className="is-drawer-close:hidden">
                    <Logo />
                  </span>
                </button>
              </li>
              <li>
                <Link
                  to={"/dashboard"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>

              {role === "Admin" && (
                <>
                  {/* Rider Approved */}
                  <li>
                    <Link
                      to={"approve-rider"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Approve User"
                    >
                      {/* rider bike icon */}
                      <RiEBikeFill className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        Approve Rider
                      </span>
                    </Link>
                  </li>

                  {/* user management */}
                  <li>
                    <Link
                      to={"user-management"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="User Manage"
                    >
                      {/* rider bike icon */}
                      <FaUsers className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        User Manage
                      </span>
                    </Link>
                  </li>

                  {/* Assign riders */}
                  <li>
                    <Link
                      to={"assign-riders"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assign Riders"
                    >
                      {/* rider bike icon */}

                      <TbTruckDelivery className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden">
                        Assign Riders
                      </span>
                    </Link>
                  </li>
                </>
              )}

              {/* payment history item */}
              <li>
                <Link
                  to={"payment-history"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Payment History"
                >
                  {/* credit card icon */}
                  <FaCreditCard className="my-1.5 inline-block size-4" />
                  <span className="is-drawer-close:hidden">
                    Payment History
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
