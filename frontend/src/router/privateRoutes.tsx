import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Tasks from "../pages/Tasks";

export const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [{ path: "tasks", element: <Tasks /> }],
  },
];
