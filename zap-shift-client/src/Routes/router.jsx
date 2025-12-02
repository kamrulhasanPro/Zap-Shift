import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Forget from "../Pages/Auth/Forget/Forget";
import AddParcel from "../Pages/AddParcel/AddParcel";
import PrivetRoute from "./PrivetRoute";
import Dashboard from "../Layouts/Dashboard";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Success from "../Pages/Dashboard/Payment/Success";
import Error from "../Pages/Dashboard/Payment/Error";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import Rider from "../Pages/Rider/Rider";
import ApproveRider from "../Pages/Dashboard/ApproveRider/ApproveRider";
import UserManagement from "../Pages/Dashboard/UserMangement/UserManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/pricing",
        element: (
          <PrivetRoute>
            <AddParcel />
          </PrivetRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "rider",
        element: (
          <PrivetRoute>
            <Rider />
          </PrivetRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "/*",
        Component: NotFoundPage,
      },
    ],
  },

  // auth Layout
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forget",
        Component: Forget,
      },
    ],
  },

  // dashboard layout
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    // errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        Component: MyParcels,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "approve-rider",
        element: (
          <AdminRoute>
            <ApproveRider />
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment_success",
        Component: Success,
      },
      {
        path: "payment_error",
        Component: Error,
      },
    ],
  },
]);
