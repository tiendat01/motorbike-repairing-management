import React from "react";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import Logo from "../../layout/MainLayout/LogoSection/Logo";
import RegisterValid from "../validation/RegisterValid";

const Register = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='flex-end'
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Grid
                container
                spacing={2}
                alignItems='center'
                justifyContent='center'
              >
                <Grid item sx={{ mb: 3 }}>
                  <Link to='#'>
                    <Logo />
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction={matchDownSM ? "column-reverse" : "row"}
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Grid item>
                      <Stack
                        alignItems='center'
                        justifyContent='center'
                        spacing={1}
                      >
                        <Typography
                          color={theme.palette.secondary.main}
                          gutterBottom
                          variant={matchDownSM ? "h3" : "h2"}
                        >
                          Đăng Ký
                        </Typography>
                        <Typography
                          variant='caption'
                          fontSize='16px'
                          textAlign={matchDownSM ? "center" : "inherit"}
                        >
                          Nhập thông tin đăng nhập của bạn để tiếp tục
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <RegisterValid />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    item
                    container
                    direction='column'
                    alignItems='center'
                    xs={12}
                  >
                    <Typography
                      component={Link}
                      to='/login'
                      variant='subtitle1'
                      sx={{ textDecoration: "none" }}
                    >
                      Bạn đã có tài khoản?
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
