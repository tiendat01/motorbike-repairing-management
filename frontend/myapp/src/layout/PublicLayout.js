import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectRole } from "../utils/selectRole";

const PublicLayout = () => {
  const user = useSelector((state) => state.auth.currentUser);

  if (!user) return <Outlet />;
  else {
    if (selectRole(user?.roles) === "Quản Lý") return <Navigate to='/' />;
    else return <Navigate to='/manage/tickets' />;
  }
};

export default PublicLayout;
