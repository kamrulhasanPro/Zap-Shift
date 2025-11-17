import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import AuthLayout from "../Layouts/AuthLayout";

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
        path: "/*",
        Component: NotFoundPage,
      },
    ],
  },

  // auth Layout
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        
      },
      {
        path: '/register'
      },
    ]
  }
]);
