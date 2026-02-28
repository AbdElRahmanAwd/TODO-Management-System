import type { RouteObject } from "react-router-dom";
import Tasks from "../pages/Tasks";

export const privateRoutes: RouteObject[] = [
  { path: "tasks", element: <Tasks /> },
];
