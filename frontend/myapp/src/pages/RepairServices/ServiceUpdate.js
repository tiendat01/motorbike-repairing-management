import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  // ListItemText,
  // MenuItem,
  Paper,
  // Select,
  TextField,
  Typography,
} from "@mui/material";
// import Checkbox from "@mui/material/Checkbox";
import React, { useEffect} from 'react'
import { useDispatch } from "react-redux";
// import currencyFormat from "../../utils/currencyFormat";
import { useForm } from "react-hook-form";
import {serviceService} from  '../../services/serviceService';
import { toast } from "react-toastify";
import {updateService} from '../../redux/actions/actionService'


const ServiceUpdate = ({detailService,setOpen}) => {
  const dispatch = useDispatch();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (detailService) {
      reset({
        name: detailService?.name,
        price: detailService?.price,
        description:detailService?.description
      });
    }
  }, [detailService, reset]);

  const onSubmit = (values) => {
    const dataRequest = {
      ...values
    };
    serviceService
      .update(detailService.id, dataRequest)
      .then((response) => {
        setOpen(false);
        dispatch(updateService(detailService.id, response.data));
        toast.success("Cập nhật thành công");
        
      })
      .catch((error) => {
        console.log(error);
        toast.error("Cập nhật thất bại");
      });
  };

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ width: "100%", p:2 }} elevation={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant='h4' sx={{ p: "15px 0" }}>
                        Sửa Linh Kiện
                      </Typography>
                    </Grid>
                    <Grid item xs={12} marginBottom={1}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item alignItems='left' xs={3}>
                            <Typography
                              variant='body1'
                              sx={{ fontWeight: "bold" }}
                            >
                              Tên Dịch Vụ
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
                              maxLength:50,
                            })}
                          ></TextField>
                          {errors.name && errors.name.type === "maxLength" && (
                            <FormHelperText error id='helper-text-name' >
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
                            <Typography
                              variant='body1'
                              sx={{ fontWeight: "bold" }}
                            >
                              Mô Tả
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
              <Paper sx={{ width: "100%", p: 2 }} elevation={1}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='h4' sx={{ p: "15px 0" }}>
                      Giá Dịch Vụ
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
                          alignItems='center'
                          justifyContent='start'
                          display='flex'
                          xs={3}
                        >
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Giá Dịch Vụ
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          alignItems='left'
                          xs={9}
                        >
                          <TextField
                              variant='outlined'
                              size='small'
                              placeholder='Giá dịch vụ'
                              fullWidth
                              {...register("price", {
                                required: "Giá dịch vụ không được để trống",
                                pattern:/[1-9][0-9]*$/
                              })}
                            >
                              
                            </TextField>
                              {errors.price && errors.price.type === "pattern" && (
                              <FormHelperText error id='helper-text-name' >
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
              Lưu Thay Đổi
            </Button>
            <Button
              sx={{ ml: 2 }}
              variant='outlined'
              onClick={(event) => setOpen(false)}
            >
              Hủy
            </Button>
          </Grid>
        </Grid>
      </form>
  );
}

export default ServiceUpdate;