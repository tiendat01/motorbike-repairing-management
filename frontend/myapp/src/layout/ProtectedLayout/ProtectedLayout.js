import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const user = useSelector((state) => state.auth.currentUser);

  if (!user) {
    return <Navigate to='/login' />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedLayout;
