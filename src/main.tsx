import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import JobsPage from "./page/job/JobsPage";
import ApplyPage from "./ApplyPage";
import AdminPage from "./AdminPage";
import JobDetailsPage from "./page/job/component/details/components/JobDetailsPage";
import AboutPage from "./page/about/AboutPage";
import ContactPage from "./page/contact/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <JobsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "apply", element: <ApplyPage /> },
      { path: "admin", element: <AdminPage /> },
      {path:'contact', element:<ContactPage/>},
      {
        path: "jobs/:id",
        element: <JobDetailsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
