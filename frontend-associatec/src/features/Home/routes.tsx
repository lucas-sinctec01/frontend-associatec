import Home from "./pages/Home";
// Rotas da feature Home
import React from "react";
import type { RouteObject } from "react-router-dom";

export const homeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />
  },
  // Páginas serão inseridas aqui
];
