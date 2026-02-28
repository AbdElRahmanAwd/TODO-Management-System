import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);
