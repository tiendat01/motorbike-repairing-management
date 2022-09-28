import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { drawerWidth } from "../../constants/const";
import { SET_MENU } from "../../redux/actions/actionSidebar";
import FilterLayout from "./FilterLayout";
import Sidebar from "./Sidebar";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "openRight",
})(({ theme, open, openRight }) => ({
  ...theme.typography.mainContent,
  ...(!open &&
    !openRight && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -(drawerWidth - 68),
      marginRight: -drawerWidth,
    }),
  ...(open &&
    openRight && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
      marginRight: 0,
    }),
  ...(open &&
    !openRight && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      marginRight: -drawerWidth,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
    }),
  ...(openRight &&
    !open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: -(drawerWidth - 68),
      marginRight: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
    }),
}));

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));

  const leftDrawerOpened = useSelector((state) => state.sidebar.opened);
  const rightDrawerOpened = useSelector((state) => state.sidebar.openedFilter);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />
      <Main theme={theme} open={leftDrawerOpened} openRight={rightDrawerOpened}>
        <Outlet />
      </Main>
      <FilterLayout rightDrawerOpened={rightDrawerOpened} />
    </Box>
  );
};

export default MainLayout;
