import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateCustomer } from "../../redux/actions/actionCustomer";
import { customerService } from "../../services/customerService";

const CustomerUpdate = ({ detailCustomer, setOpen }) => {
  const dispatch = useDispatch();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (detailCustomer) {
      reset({
        name: detailCustomer?.name,
        phone: detailCustomer?.phone,
        address: detailCustomer?.address,
      });
    }
  }, [detailCustomer, reset]);

  const [errorPost, setErrorPost] = useState("");

  const onSubmit = (data) => {
    customerService
      .update(detailCustomer.id, data)
      .then((response) => {
        setOpen(false);
        dispatch(updateCustomer(detailCustomer.id, response.data));
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        if (error.response.data.message.includes("phone"))
          setErrorPost("Số điện thoại đã tồn tại");
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: "100%", my: 3, px: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", p: 2 }} elevation={1}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h4' sx={{ p: "5px 0" }}>
                    Sửa Thông Tin Khách Hàng
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
                          Tên khách hàng
                        </Typography>
                      </Grid>
                      <Grid item alignItems='left' xs={8}>
                        <TextField
                          placeholder='Tên khách hàng'
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
                          placeholder='Số điện thoại'
                          fullWidth
                          size='small'
                          variant='outlined'
                          {...register("phone", {
                            required: "Số điện thoại không được để trống",
                            pattern:
                              /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                            onChange: (e) => setErrorPost(""),
                          })}
                        ></TextField>
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
                        {errorPost.length > 0 && (
                          <FormHelperText error id='helper-text-name'>
                            {errorPost}
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
                          placeholder='Địa chỉ'
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
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid sx={{ pt: 2 }} item xs={12} display='flex' justifyContent='end'>
          <Button sx={{ mt: 3 }} variant='contained' type='submit'>
            Lưu Thay Đổi
          </Button>
          <Button
            sx={{ ml: 2, mt: 3 }}
            variant='outlined'
            onClick={(e) => setOpen(false)}
          >
            Hủy
          </Button>
        </Grid>
      </Box>
    </form>
  );
};

export default CustomerUpdate;
