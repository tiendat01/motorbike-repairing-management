import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectRole } from "../../utils/selectRole";

const AdminLayout = () => {
  const user = useSelector((state) => state.auth.currentUser);

  if (selectRole(user?.roles) !== "Quản Lý") {
    return <Navigate to='/error' />;
  } else return <Outlet />;
};

export default AdminLayout;
