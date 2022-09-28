import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
// eslint-disable-next-line
import {storage} from "../../storage/firebase"
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { imgDefault } from "../../constants/const";
import { addProduct } from "../../redux/actions/actionProduct";
import { categoryService } from "../../services/categoryService";
import { modelService } from "../../services/modelService";
import { productService } from "../../services/productService";
import {getDownloadURL,ref,getStorage, uploadBytesResumable } from "firebase/storage";
import {v4} from 'uuid';



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

const ProductCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const [isUpload,setIsUpload] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);


  const [dataModel, setDataModel] = useState([]); //data model form API
  const [modelSubmit,setModelSubmit] = useState([]); //modelID to submit to api
  console.log("modelSubmit",modelSubmit);
  console.log("datamodel",dataModel);
  const [progress, setProgress] = useState(0);
  const onSubmit = (values) => {
    const dataRequest = {
      ...values,
      image:url,
      modelIdSet: values.modelIdSet,
    };
    console.log("dataRequest",dataRequest);
    console.log("values",values);
    productService
      .create(dataRequest)
      .then((response) => {
        dispatch(addProduct(response.data));
        console.log(response.data);
        toast.success("Thêm mới thành công");
        navigate(`/manage/products/${response.data.id}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Thêm mới thất bại");
      });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setModelSubmit(
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log("value",value);
  };

  useEffect(() => {
    categoryService.listAll().then((response) => {
      setDataCategory(response.data);
    });
  }, []);

  useEffect(() => {
    modelService.listAll().then((response) => {
      setDataModel(response.data);
    });
  }, []);

  const [imageUpload,setImageUpload]=useState(null); //file
  const [url, setUrl] = useState(null);  //link ảnh
  
  const imageChange = (e) => {
    setIsUpload(true);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${e.target.files[0].name + v4()}`);

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog);
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUrl(downloadURL);
      });
    }
  );
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState===2){
        setImageUpload(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Box sx={{ width: "100%", my: 3, px: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link to='/manage/products' style={{ textDecoration: "none" }}>
            <Button
              variant='text'
              startIcon={
                <ArrowBackIosNewIcon fontSize='small' color='action' />
              }
            >
              <Typography variant='body2'>Danh Sách Linh Kiện</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ width: "100%", p: 2 }} elevation={1}>
            <Grid container>
              <Grid item xs={12}>
                <Typography sx={{ p: "15px 0" }} variant='h4'>
                  Thêm Mới Linh Kiện
                </Typography>
              </Grid>
              <Grid item xs={12} marginBottom={1}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Paper sx={{ width: "100%", my: 3 }} elevation={3}>
                      <Box sx={{ p: 2 }}>
                      <Grid item xs={12} sx={{pb:2}}>
                        <Typography variant='h4' >
                          Thêm Ảnh Linh Kiện
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                        <Grid
                          container
                          alignItems='center'
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                          sx={{ p: 1 }}
                        >
                          <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <img
                              alt=""
                              style={imgDefault.style}
                              src={imageUpload}
                            />                        
                          </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          { isUpload &&(
                            <>
                            <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" value={progress} /> 
                            </Box>
                            <Box>
                            <Typography variant="body2" color="text.secondary">{progress}%</Typography>
                            </Box>
                            </>
                          )
                          }
                        </Box>
                        <Button variant="contained" component="label">
                          Chọn Ảnh
                          <input hidden accept="image/*" multiple type="file" onChange={imageChange} />
                        </Button>
                      </Box>
                      </Paper>
                    </Grid>

                    <Grid item xs={8}>
                      <Paper sx={{ width: "100%", my: 3 }} elevation={3}>
                        <Box sx={{ p: 2 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant='h4'>
                                Sửa Thông Tin Chi Tiết
                              </Typography>
                            </Grid>

                            <Grid item xs={12}>
                              <Divider />
                            </Grid>

                            <Grid
                              display={"flex"}
                              item
                              alignItems='center'
                              xs={3}
                            >
                              <Typography
                                variant='body1'
                                sx={{ fontWeight: "bold" }}
                              >
                                Tên Linh Kiện
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                variant='outlined'
                                size='small'
                                label='Tên Linh Kiện'
                                fullWidth
                                {...register("name", {
                                  required: "Tên linh kiện không được để trống",
                                  maxLength:100,
                                })}
                              ></TextField>
                              {errors.name && errors.name.type === "maxLength" && (
                                <FormHelperText error id='helper-text-name' >
                                  Tên linh kiện không dài quá 100 kí tự
                                </FormHelperText>
                              )}
                              {errors.name && (
                                <FormHelperText error id='helper-text-name'>
                                  {errors.name.message}
                                </FormHelperText>
                              )}
                            </Grid>

                            <Grid
                              display={"flex"}
                              item
                              alignItems='center'
                              xs={3}
                            >
                              <Typography
                                variant='body1'
                                sx={{ fontWeight: "bold" }}
                              >
                                Mô Tả
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                variant='outlined'
                                size='small'
                                label='Mô Tả'
                                fullWidth
                                {...register("description")}
                              ></TextField>
                            </Grid>

                            <Grid
                              display={"flex"}
                              item
                              alignItems='center'
                              xs={3}
                            >
                              <Typography
                                variant='body1'
                                sx={{ fontWeight: "bold" }}
                              >
                                Loại Danh Mục
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                            <FormControl fullWidth size='small'>
                              <InputLabel id="demo-multiple-checkbox-label">Loại danh mục</InputLabel>
                              <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                variant='outlined'
                                size='small'
                                label='Loại Danh Mục'
                                fullWidth
                                {...register("categoryId", {
                                  required: "Loại danh mục không được để trống",
                                })}
                                MenuProps={MenuProps}
                              >
                                 {dataCategory
                                  ?.filter((item) => dataCategory?.id !== item.id)
                                  .map((option) => (
                                    <MenuItem value={option.id} key={option.id}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                              </Select>
                              </FormControl>
                              {errors.categoryId && (
                                <FormHelperText
                                  error
                                  id='helper-text-categoryId'
                                >
                                  {errors.categoryId.message}
                                </FormHelperText>
                              )}
                            </Grid>

                            <Grid
                              display={"flex"}
                              item
                              alignItems='center'
                              xs={3}
                            >
                              <Typography
                                variant='body1'
                                sx={{ fontWeight: "bold" }}
                              >
                                Giá
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                size='small'
                                label='Giá'
                                fullWidth
                                variant='outlined'
                                {...register("price", {
                                  required: "Giá không được để trống",
                                  maxLength:10,
                                  pattern:/[1-9][0-9]*$/
                                })}
                              />
                              {errors.price && errors.price.type === "maxLength" && (
                                <FormHelperText error id='helper-text-name' >
                                  Giá không quá 10 kí tự
                                </FormHelperText>
                              )}
                              {errors.price && errors.price.type === "pattern" && (
                                <FormHelperText error id='helper-text-name' >
                                  Giá chỉ chứa số
                                </FormHelperText>
                              )}
                              {errors.price && (
                                <FormHelperText error id='helper-text-price'>
                                  {errors.price.message}
                                </FormHelperText>
                              )}
                            </Grid>

                            <Grid
                              display={"flex"}
                              item
                              alignItems='center'
                              xs={3}
                            >
                              <Typography
                                variant='body1'
                                sx={{ fontWeight: "bold" }}
                              >
                                Số Lượng
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                variant='outlined'
                                size='small'
                                label='Số Lượng'
                                fullWidth
                                {...register("quantity", {
                                  required: "Số lượng linh kiện không được để trống",
                                  pattern:/[1-9][0-9]*$/
                                })}
                              />
                              {errors.quantity && (
                                <FormHelperText error id='helper-text-quantity'>
                                  {errors.quantity.message}
                                </FormHelperText>
                              )}
                              {errors.quantity && errors.quantity.type === "pattern" && (
                                <FormHelperText error id='helper-text-name' >
                                  Số lượng chỉ chứa số
                                </FormHelperText>
                              )}
                            </Grid>

                            <Grid
                              display={"flex"}
                              item
                              alignItems='center'
                              xs={3}
                            >
                              <Typography
                                variant='body1'
                                sx={{ fontWeight: "bold" }}
                              >
                                Đơn Vị Tính
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                variant='outlined'
                                size='small'
                                label='Đơn Vị Tính'
                                fullWidth
                                {...register("unit",{
                                  required:"Đơn vị tính không được để trống"
                                })}
                              />
                              {errors.unit && errors.unit.type === "required" && (
                                <FormHelperText error id='helper-text-name' >
                                  {errors.unit.message}
                                </FormHelperText>
                              )}
                            </Grid>
                            <Grid
                              display={"flex"}
                              item
                              alignItems='center'
                              xs={3}
                            >
                              <Typography
                                variant='body1'
                                sx={{ fontWeight: "bold" }}
                              >
                                Kiểu Xe
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <FormControl fullWidth size='small'>
                              <InputLabel id="demo-multiple-checkbox-label">Kiểu xe</InputLabel>
                              <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                {...register('modelIdSet',{
                                  required:"Kiểu xe không được để trống",
                                })}
                                fullWidth
                                multiple
                                value={modelSubmit}
                                onChange={handleChange}
                                input={<OutlinedInput label="Kiểu xe" />}
                                renderValue={(selected) => (
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {(selected.map((modelId) => (
                                      dataModel?.find(e => e.id === modelId).modelName
                                      ))).join(', ')}
                                  </Box>
                                  )}
                                MenuProps={MenuProps}
                              >
                                {dataModel.map((model) => (
                                  <MenuItem key={model.id} value={model.id}>
                                    <Checkbox checked={modelSubmit.indexOf((model.id)) > -1} />
                                    <ListItemText primary={model.modelName} />
                                  </MenuItem>
                                ))}
                              </Select>
                              </FormControl>
                              {errors.modelIdSet && (
                                <FormHelperText
                                  error
                                  id='helper-text-modelIdSet'
                                >
                                  {errors.modelIdSet.message}
                                </FormHelperText>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                      <Button disabled={isUpload &&(!(progress === 100))} variant='contained' type='submit' >
                        Tạo Mới
                      </Button>
                      <Link to='/manage/products' style={{ textDecoration: "none" }}>
                        <Button
                          sx={{ ml: 2 }}
                          variant='outlined'
                        >
                          Hủy
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </form>
  );
};

export default ProductCreate;