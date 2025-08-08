import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Landing from "./Landing.jsx";
import "./styles/index.css";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/app", element: <App /> },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
