import React from "react";
import Login from "../authentication/views/Login";
import Register from "../authentication/views/Register";
import PublicLayout from "../layout/PublicLayout";

export const AuthRouter = {
  element: <PublicLayout />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ],
};
