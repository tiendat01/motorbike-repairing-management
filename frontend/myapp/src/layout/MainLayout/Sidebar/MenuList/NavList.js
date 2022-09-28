import React from "react";
import { selectRole } from "../../../../utils/selectRole";
import { menuAdmin, menuCashier, menuMod } from "./menu";
import NavItem from "./NavItem";

const NavList = ({ user }) => {
  if (selectRole(user.roles) === "Quản Lý") {
    const navItems = menuAdmin.map((item) => {
      return <NavItem key={item.id} item={item} />;
    });
    return <>{navItems}</>;
  } else if (selectRole(user.roles) === "Điều Phối") {
    const navItems = menuMod.map((item) => {
      return <NavItem key={item.id} item={item} />;
    });
    return <>{navItems}</>;
  } else if (selectRole(user.roles) === "Thu Ngân") {
    const navItems = menuCashier.map((item) => {
      return <NavItem key={item.id} item={item} />;
    });
    return <>{navItems}</>;
  }
};

export default NavList;
