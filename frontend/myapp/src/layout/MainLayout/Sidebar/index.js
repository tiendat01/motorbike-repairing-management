import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import { BrowserView } from "react-device-detect";
import { useSelector } from "react-redux";
import { drawerWidth } from "../../../constants/const";
import LogoSection from "../LogoSection/index";
import ToggleSidebar from "../ToggleSidebar";
import NavList from "./MenuList/NavList";
import ProfileSection from "./Profile";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(7)} + 4px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 4px)`,
  },
  overflowX: "hidden",
});

const Sidebar = ({ drawerOpen, drawerToggle }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const drawer = (
    <>
      {drawerOpen ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <LogoSection />
        </Box>
      ) : (
        <Box sx={{ mt: 2, height: "50px" }}></Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Divider />
      </Box>
      <Box>
        <ProfileSection user={user} drawerOpen={drawerOpen} />
      </Box>
      <BrowserView>
        <NavList user={user} />
      </BrowserView>
      <Box sx={{ marginTop: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ToggleSidebar
            drawerOpen={drawerOpen}
            handleLeftDrawerToggle={drawerToggle}
          />
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Box
        component='nav'
        sx={{ flexShrink: { md: 0 }, width: matchUpMd ? 250 : "auto" }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='permanent'
          anchor='left'
          open={drawerOpen}
          onClose={drawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              flexShrink: 0,
              whiteSpace: "nowrap",
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              boxSizing: "border-box",
              ...(drawerOpen && {
                ...openedMixin(theme),
              }),
              ...(!drawerOpen && {
                ...closedMixin(theme),
              }),
            },
          }}
          ModalProps={{ keepMounted: true }}
          color='inherit'
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
};

export default Sidebar;
