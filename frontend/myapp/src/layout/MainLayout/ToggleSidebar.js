import { useTheme } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar, ButtonBase } from "@mui/material";
import React from "react";

const ToggleSidebar = ({ drawerOpen, handleLeftDrawerToggle }) => {
  const theme = useTheme();
  return (
    <ButtonBase sx={{ overflow: "hidden", width: "100%" }}>
      <Avatar
        variant='square'
        sx={{
          flexShrink: 0,
          width: "100%",
          transition: "all .3s ease-in-out",
          background: theme.palette.secondary.dark,
          color: theme.palette.secondary.light,
        }}
        onClick={handleLeftDrawerToggle}
        color='inherit'
      >
        {drawerOpen ? (
          <ChevronLeftIcon stroke={1.5} size='1.25rem' />
        ) : (
          <ChevronRightIcon stroke={1.5} size='1.25rem' />
        )}
      </Avatar>
    </ButtonBase>
  );
};

export default ToggleSidebar;
