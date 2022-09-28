import PropTypes from "prop-types";
import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MENU_OPEN } from "../../../../redux/actions/actionSidebar";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const NavItem = ({ item }) => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size='1.5rem' />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: sidebar.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: sidebar.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize='inherit'
    />
  );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }
  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };

  const handleExpandItem = (id) => {
    dispatch({ type: MENU_OPEN, id });
  };

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ListItemButton
        {...listItemProps}
        sx={{
          mb: 0.5,
          alignItems: "flex-start",
          backgroundColor: "inherit",
          py: 1.25,
          pl: "16px",
        }}
        selected={sidebar.isOpen.findIndex((id) => id === item.id) > -1}
        onClick={() => handleExpandItem(item.id)}
      >
        <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
          {itemIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={
                sidebar.isOpen.findIndex((id) => id === item.id) > -1
                  ? "h5"
                  : "body1"
              }
              color='inherit'
              sx={{ opacity: sidebar.opened ? 1 : 0 }}
            >
              {item.title}
            </Typography>
          }
        />
      </ListItemButton>
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
};

export default NavItem;