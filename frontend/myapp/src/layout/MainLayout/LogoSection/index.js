import { ButtonBase } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectRole } from "../../../utils/selectRole";
import Logo from "./Logo";

const LogoSection = () => {
  const user = useSelector((state) => state.auth.currentUser);
  if (selectRole(user?.roles) === "Quản Lý") {
    return (
      <ButtonBase disableRipple component={Link} to='/'>
        <Logo />
      </ButtonBase>
    );
  } else {
    return (
      <ButtonBase disableRipple component={Link} to='/manage/tickets'>
        <Logo />
      </ButtonBase>
    );
  }
};

export default LogoSection;
