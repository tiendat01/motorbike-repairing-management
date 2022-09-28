import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/style.scss";
import AppRouter from "./routers/AppRouter";
import themes from "./themes";

const App = () => {
  const sidebar = useSelector((state) => state.sidebar);
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(sidebar)}>
          <CssBaseline>
            <AppRouter />
            <ToastContainer
              position='top-right'
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </CssBaseline>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
};

export default App;
