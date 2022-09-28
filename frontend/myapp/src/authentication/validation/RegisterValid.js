import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

const RegisterValid = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={matchDownSM ? 0 : 2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Họ tên của bạn'
              margin='normal'
              type='text'
              {...register("name", { required: "Required" })}
              sx={{ ...theme.typography.customInput }}
            />
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor='outlined-adornment-email-register'>
            Tên đăng nhập
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-email-register'
            type='text'
            {...register("username", { required: "Required", maxLength: 50 })}
          />
          {errors.username && (
            <FormHelperText error id='standard-weight-helper-text--register'>
              {errors.username.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor='outlined-adornment-password-register'>
            Mật khẩu
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password-register'
            type={showPassword ? "text" : "password"}
            label='Password'
            {...register("password", {
              required: "Yêu cầu nhập mật khẩu",
              minLength: {
                value: 6,
                message: "Mật khẩu tối thiểu 6 ký tự",
              },
            })}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                  size='large'
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <FormHelperText
              error
              id='standard-weight-helper-text-password-register'
            >
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name='checked'
                  color='primary'
                />
              }
              label={
                <Typography variant='subtitle1'>
                  Đồng ý với &nbsp;
                  <Typography variant='subtitle1' component={Link} to='#'>
                    Điều khoản & Dịch vụ
                  </Typography>
                </Typography>
              }
            />
          </Grid>
        </Grid>
        {errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <>
            <Button
              disableElevation
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              color='secondary'
            >
              Đăng Ký
            </Button>
          </>
        </Box>
      </form>
    </>
  );
};

export default RegisterValid;
