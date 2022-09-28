import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/actionAuth";
import { authService } from "../../services/authService";
import { selectRole } from "../../utils/selectRole";

const LoginValid = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginFail, setLoginFail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (values) => {
    return authService
      .loginMethod(values)
      .then(function (response) {
        dispatch(login(response.data));
        localStorage.setItem("user", JSON.stringify(response.data));
        if (selectRole(response.data.roles) === "Quản Lý") {
          navigate("/");
        } else {
          navigate("/manage/tickets");
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoginFail(true);
      });
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor='username-email-login'>Tên đăng nhập</InputLabel>
          <OutlinedInput
            id='username-email-login'
            type='text'
            {...register("username", { required: "Required", maxLength: 50 })}
            label='Email Address / Username'
            error={!!errors?.username}
          />
          {errors.username && (
            <FormHelperText error id='standard-weight-helper-text-email-login'>
              Vui lòng nhập tài khoản
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor='password-login'>Mật khẩu</InputLabel>
          <OutlinedInput
            id='password-login'
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Yêu cầu nhập mật khẩu",
              minLength: {
                value: 4,
                message: "Mật khẩu tối thiểu 4 ký tự",
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
            label='Password'
            inputProps={{}}
          />
          {errors.password && (
            <FormHelperText
              error
              id='standard-weight-helper-text-password-login'
            >
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-start'
          spacing={1}
        >
          {loginFail && (
            <FormHelperText error>Sai tài khoản hoặc mật khẩu</FormHelperText>
          )}
          {/* <Typography
            variant='body1'
            color='primary'
            sx={{ textDecoration: "none", cursor: "pointer" }}
          >
            Quên mật khẩu?
          </Typography> */}
        </Stack>
        {errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            disableElevation
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            color='primary'
          >
            Đăng Nhập
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginValid;
