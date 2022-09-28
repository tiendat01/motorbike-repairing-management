import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import { drawerWidth } from "../../../constants/const";

export default function FilterLayout({ rightDrawerOpened }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            padding: 1,
          },
        }}
        variant='persistent'
        anchor='right'
        open={rightDrawerOpened}
      >
        <Divider />
      </Drawer>
    </Box>
  );
}
