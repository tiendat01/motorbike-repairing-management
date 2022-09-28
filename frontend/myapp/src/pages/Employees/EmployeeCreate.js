import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { employeeService } from "../../services/employeeService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const convertRolesFromSubmitToDisplay = (role) => {
  if (role === "admin") return "Quản Lý";
  if (role === "cashier") return "Thu Ngân";
  if (role === "moderator") return "Điều Phối";
  if (role === "mechanic") return "Thợ Sửa";
};
const convertRolesFromDisplayToSubmit = (role) => {
  if (role === "Quản Lý") return "admin";
  if (role === "Thu Ngân") return "cashier";
  if (role === "Điều Phối") return "moderator";
  if (role === "Thợ Sửa") return "mechanic";
};
const roleDisplay = ["Quản Lý", "Điều Phối", "Thu Ngân", "Thợ Sửa"];

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [roleNameDisplay, setRoleNameDisplay] = useState([]);
  const [roleNameSubmit, setRoleNameSubmit] = useState([]);
  const [messageError, setMessageError] = useState({
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoleNameDisplay(
      typeof convertRolesFromSubmitToDisplay(value) === "string"
        ? convertRolesFromSubmitToDisplay(value).split(",")
        : value.map((role) => convertRolesFromSubmitToDisplay(role))
    );
    setRoleNameSubmit(typeof value === "string" ? value.split(",") : value);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    employeeService
      .create(data)
      .then((response) => {
        toast.success("Thêm thành công");
        navigate("/manage/employees");
      })
      .catch((error) => {
        console.log(error.response);
        if (
          error.response.data.code === 409 &&
          error.response.data.message.includes("username")
        ) {
          setMessageError({
            type: "username",
            message: "Tên đăng nhập đã tồn tại",
          });
        } else if (
          error.response.data.code === 409 &&
          error.response.data.message.includes("phone")
        ) {
          setMessageError({
            type: "phone",
            message: "Số điện thoại đã tồn tại",
          });
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: "100%", my: 3, px: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Link to='/manage/employees' style={{ textDecoration: "none" }}>
              <Button
                variant='text'
                startIcon={
                  <ArrowBackIosNewIcon fontSize='small' color='action' />
                }
              >
                <Typography variant='body2'>Danh Sách Nhân Viên</Typography>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", p: 2 }} elevation={1}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h4' sx={{ p: "5px 0" }}>
                    Tạo Thông Tin Nhân Viên
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item alignItems='left' xs={4}>
                        <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                          Tên nhân viên
                        </Typography>
                      </Grid>
                      <Grid item alignItems='left' xs={8}>
                        <TextField
                          label='Tên nhân viên'
                          fullWidth
                          size='small'
                          variant='outlined'
                          {...register("name", {
                            required: "Tên không được để trống",
                            maxLength: 50,
                          })}
                        ></TextField>
                        {errors.name && errors.name.type === "maxLength" && (
                          <FormHelperText error id='helper-text-name'>
                            Tên không dài quá 50 kí tự
                          </FormHelperText>
                        )}
                        {errors.name && (
                          <FormHelperText error id='helper-text-name'>
                            {errors.name.message}
                          </FormHelperText>
                        )}
                      </Grid>

                      <Grid item alignItems='left' xs={4}>
                        <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                          Số điện thoại
                        </Typography>
                      </Grid>
                      <Grid item alignItems='left' xs={8}>
                        <TextField
                          label='Số điện thoại'
                          fullWidth
                          size='small'
                          variant='outlined'
                          {...register("phone", {
                            required: "Số điện thoại không được để trống",
                            pattern:
                              /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                            onChange: (e) => setMessageError({}),
                          })}
                        ></TextField>
                        {messageError?.type === "phone" && (
                          <FormHelperText error id='error-phone'>
                            {messageError.message}
                          </FormHelperText>
                        )}
                        {errors.phone && errors.phone.type === "pattern" && (
                          <FormHelperText error id='helper-text-name'>
                            Số điện thoại không hợp lệ
                          </FormHelperText>
                        )}
                        {errors.phone && (
                          <FormHelperText error id='helper-text-name'>
                            {errors.phone.message}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item alignItems='left' xs={4}>
                        <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                          Địa chỉ
                        </Typography>
                      </Grid>
                      <Grid item alignItems='left' xs={8}>
                        <TextField
                          label='Địa chỉ'
                          fullWidth
                          size='small'
                          variant='outlined'
                          {...register("address", {
                            maxLength: 100,
                          })}
                        ></TextField>
                        {errors.address && errors.address.type === "maxLength" && (
                          <FormHelperText error id='helper-text-name'>
                            Địa chỉ không dài quá 100 kí tự
                          </FormHelperText>
                        )}
                        {errors.address && (
                          <FormHelperText error id='helper-text-name'>
                            {errors.address.message}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item alignItems='left' xs={4}>
                        <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                          Vai trò
                        </Typography>
                      </Grid>
                      <Grid item alignItems='left' xs={8}>
                        <FormControl fullWidth size='small'>
                          <InputLabel id='demo-multiple-checkbox-label'>
                            Vai trò
                          </InputLabel>
                          <Select
                            labelId='demo-multiple-checkbox-label'
                            id='demo-multiple-checkbox'
                            {...register("roles", {
                              required: "Vai trò không được để trống",
                            })}
                            fullWidth
                            multiple
                            value={roleNameSubmit}
                            onChange={handleChange}
                            input={<OutlinedInput label='Vai trò' />}
                            renderValue={() => roleNameDisplay.join(", ")}
                            MenuProps={MenuProps}
                          >
                            {roleDisplay.map((role) => (
                              <MenuItem
                                key={role}
                                value={convertRolesFromDisplayToSubmit(role)}
                              >
                                <Checkbox
                                  checked={roleNameDisplay.indexOf(role) > -1}
                                />
                                <ListItemText primary={role} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {(roleNameSubmit.includes("admin") ||
                        roleNameSubmit.includes("moderator") ||
                        roleNameSubmit.includes("cashier")) && (
                        <>
                          <Grid item alignItems='left' xs={4}>
                            <Typography
                              variant='body1'
                              sx={{ fontWeight: "bold" }}
                            >
                              Tên Đăng Nhập
                            </Typography>
                          </Grid>
                          <Grid item alignItems='left' xs={8}>
                            <TextField
                              label='Tên Đăng Nhập'
                              fullWidth
                              size='small'
                              variant='outlined'
                              {...register("username", {
                                required: "Tên đăng nhập không được để trống",
                                value: null,
                                maxLength: 50,
                                minLength: 3,
                                shouldUnregister: true,
                                onChange: (e) => setMessageError({}),
                              })}
                            ></TextField>
                            {messageError?.type === "username" && (
                              <FormHelperText error id='error-username'>
                                {messageError.message}
                              </FormHelperText>
                            )}
                            {errors.username &&
                              errors.username.type === "minLength" && (
                                <FormHelperText error id='helper-text-name'>
                                  Tên đăng nhập chứa tối thiểu 3 kí tự
                                </FormHelperText>
                              )}
                            {errors.username &&
                              errors.username.type === "maxLength" && (
                                <FormHelperText error id='helper-text-name' S>
                                  Tên đăng nhập chứa tối đa 50 kí tự
                                </FormHelperText>
                              )}
                            {errors.username && (
                              <FormHelperText error id='helper-text-name'>
                                {errors.username.message}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid item alignItems='left' xs={4}>
                            <Typography
                              variant='body1'
                              sx={{ fontWeight: "bold" }}
                            >
                              Mật Khẩu
                            </Typography>
                          </Grid>
                          <Grid item alignItems='left' xs={8}>
                            <TextField
                              label='Mật Khẩu'
                              fullWidth
                              size='small'
                              variant='outlined'
                              {...register("password", {
                                required: "Mật khẩu không được để trống",
                                value: null,
                                minLength: 4,
                                maxLength: 50,
                                shouldUnregister: true,
                              })}
                              type='password'
                            ></TextField>
                            {errors.password &&
                              errors.password.type === "maxLength" && (
                                <FormHelperText error id='helper-text-name'>
                                  Mật khẩu không dài quá 50 kí tự
                                </FormHelperText>
                              )}
                            {errors.password &&
                              errors.password.type === "minLength" && (
                                <FormHelperText error id='helper-text-name'>
                                  Mật khẩu chứa tối thiểu 4 kí tự
                                </FormHelperText>
                              )}
                            {errors.password && (
                              <FormHelperText error id='helper-text-name'>
                                {errors.password.message}
                              </FormHelperText>
                            )}
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='end'>
          <Button
            color='primary'
            variant='contained'
            sx={{ mt: "20px" }}
            type='submit'
          >
            Tạo Mới
          </Button>
          <Link to='/manage/employees' style={{ textDecoration: "none" }}>
            <Button sx={{ ml: 2, mt: "20px" }} variant='outlined'>
              Hủy
            </Button>
          </Link>
        </Grid>
      </Box>
    </form>
  );
};

export default EmployeeCreate;
