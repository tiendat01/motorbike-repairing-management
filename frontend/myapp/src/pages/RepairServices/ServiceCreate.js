import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { serviceService } from "../../services/serviceService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addService } from "../../redux/actions/actionService";

const ServiceCreate = ({ setOpenModal }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    serviceService
      .create(data)
      .then((response) => {
        dispatch(addService(response.data));
        toast.success("Thêm thành công");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Thêm thất bại");
      });
    setOpenModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ width: "100%", p: 2 }} elevation={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h4' sx={{ p: "15px 0" }}>
                  Thêm mới dịch vụ
                </Typography>
              </Grid>
              <Grid item xs={12} marginBottom={1}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item alignItems='left' xs={3}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Tên dịch vụ
                      </Typography>
                    </Grid>
                    <Grid item alignItems='left' xs={9}>
                      <TextField
                        variant='outlined'
                        size='small'
                        placeholder='Tên Dịch Vụ'
                        fullWidth
                        {...register("name", {
                          required: "Tên dịch vụ không được để trống",
                          maxLength: 50,
                        })}
                      ></TextField>
                      {errors.name && errors.name.type === "maxLength" && (
                        <FormHelperText error id='helper-text-name'>
                          Tên dịch vụ không dài quá 50 kí tự
                        </FormHelperText>
                      )}
                      {errors.name && (
                        <FormHelperText error id='helper-text-name'>
                          {errors.name.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item alignItems='left' xs={3}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Mô tả
                      </Typography>
                    </Grid>
                    <Grid item alignItems='left' xs={9}>
                      <TextField
                        variant='outlined'
                        size='small'
                        placeholder='Mô Tả'
                        fullWidth
                        {...register("description")}
                      ></TextField>
                      {errors.description && (
                        <FormHelperText error id='helper-text-name'>
                          {errors.description.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ width: "100%", p: 2 }} elevation={3}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='h4' sx={{ p: "15px 0" }}>
                  Giá dịch vụ
                </Typography>
              </Grid>
              <Grid item xs={12} marginBottom={1}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      alignItems='left'
                      justifyContent='start'
                      display='flex'
                      flexDirection={"column"}
                      xs={3}
                    >
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Giá dịch vụ
                      </Typography>
                    </Grid>
                    <Grid item alignItems='left' xs={9}>
                      <TextField
                        variant='outlined'
                        size='small'
                        placeholder='Giá dịch vụ'
                        fullWidth
                        {...register("price", {
                          required: "Giá dịch vụ không được để trống",
                          pattern: /[1-9][0-9]*$/,
                        })}
                      ></TextField>
                      {errors.price && errors.price.type === "pattern" && (
                        <FormHelperText error id='helper-text-name'>
                          Giá dịch vụ chỉ chứa số
                        </FormHelperText>
                      )}
                      {errors.price && (
                        <FormHelperText error id='helper-text-name'>
                          {errors.price.message}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} display='flex' justifyContent='end'>
          <Button variant='contained' type='submit'>
            Tạo mới
          </Button>
          <Button
            sx={{ ml: 2 }}
            variant='outlined'
            onClick={(event) => setOpenModal(false)}
          >
            Hủy
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ServiceCreate;
