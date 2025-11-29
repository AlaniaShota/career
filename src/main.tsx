import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import JobsPage from "./job/JobsPage";
import ApplyPage from "./ApplyPage";
import AdminPage from "./AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <JobsPage /> },
      { path: "apply", element: <ApplyPage /> },
      { path: "admin", element: <AdminPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
