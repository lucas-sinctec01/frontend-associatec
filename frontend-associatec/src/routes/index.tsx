import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { featuresRoutes } from "./features";

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: featuresRoutes,
    },
  ]);

  return routes;
};
