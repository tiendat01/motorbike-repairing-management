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
} from "@mui/material";
// eslint-disable-next-line
import {storage} from "../../storage/firebase"
import Checkbox from "@mui/material/Checkbox";
import LinearProgress from '@mui/material/LinearProgress';
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { imgDefault } from "../../constants/const";
import { updateProduct } from "../../redux/actions/actionProduct";
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

const ProductUpdate = ({ detailProduct, setOpen }) => {
  const dispatch = useDispatch();
  const [dataCategory, setDataCategory] = useState([]);
  const [dataModel, setDataModel] = useState([]);
  
  const {
    reset,
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (detailProduct) {
      reset({
        name: detailProduct?.name,
        description: detailProduct?.description,
        categoryId: detailProduct?.category.id,
        price: detailProduct?.price,
        quantity: detailProduct?.quantity,
        unit:detailProduct?.unit,
        image:detailProduct?.image,
        modelIdSet: detailProduct?.models.map((model) => model),
      });
    }
  }, [detailProduct, reset]);

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

  const [imageUpload,setImageUpload]=useState(detailProduct.image);
  const [url, setUrl] = useState(detailProduct.image);
  const [progress, setProgress] = useState(0);

  const onSubmit = (values) => {
    const dataRequest = {
      ...values,
      image:url,
      modelIdSet: values.modelIdSet.map((item) => item.id),
    };

    console.log(dataRequest);
    productService
      .update(detailProduct.id, dataRequest)
      .then((response) => {
        setOpen(false);
        dispatch(updateProduct(detailProduct.id, response.data));
        console.log(response.data);
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Cập nhật thất bại");
      });
  };

  const [isUpload,setIsUpload] = useState(false);

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
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper sx={{ width: "100%", my: 3 }} elevation={3}>
          <Box sx={{ p: 2 }}>
          <Grid item xs={12} sx={{pb:2}}>
            <Typography variant='h4' >
              Cập Nhật Ảnh Linh Kiện
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
                  alt={detailProduct?.image}
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
            <Button disabled={false} variant="contained" component="label" >
              Chọn ảnh
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
                  <Typography variant='h4'>Sửa Thông Tin Chi Tiết</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid display={"flex"} item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Tên linh kiện
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <TextField
                    variant='outlined'
                    size='small'
                    placeholder='Tên Linh Kiện'
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

                <Grid display={"flex"} item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Mô tả
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <TextField
                    variant='outlined'
                    size='small'
                    placeholder='Mô Tả'
                    fullWidth
                    {...register("description")}
                  ></TextField>
                </Grid>

                <Grid display={"flex"} item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Loại danh mục
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Select
                    defaultValue={detailProduct?.category.id}
                    variant='outlined'
                    size='small'
                    placeholder='Loại Danh Mục'
                    fullWidth
                    {...register("categoryId", {
                      required: "Danh mục không được để trống",
                    })}
                  >
                    <MenuItem
                      value={detailProduct?.category.id}
                      key={detailProduct?.category.id}
                    >
                      {detailProduct?.category.name}
                    </MenuItem>
                    {dataCategory
                      ?.filter((item) => detailProduct?.category.id !== item.id)
                      .map((option) => (
                        <MenuItem value={option.id} key={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.categoryId && (
                    <FormHelperText error id='helper-text-categoryId'>
                      {errors.categoryId.message}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid display={"flex"} item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Giá
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <TextField
                    size='small'
                    placeholder='Giá'
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

                <Grid display={"flex"} item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Số lượng
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <TextField
                    variant='outlined'
                    size='small'
                    placeholder='Số Lượng'
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
                    Đơn vị tính
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <TextField
                    variant='outlined'
                    size='small'
                    placeholder='Đơn Vị Tính'
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

                <Grid display={"flex"} item alignItems='center' xs={3}>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    Kiểu xe
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={9}>
                  <Controller
                    name='modelIdSet'
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Kiểu xe không được để trống" }}
                    render={({ field }) => {
                      return (
                        <Select
                          size="small"
                          fullWidth
                          multiple
                          {...field}
                          MenuProps={MenuProps}
                          renderValue={(selected) => {
                            return selected
                              .map((item) => item.modelName)
                              .join(", ");
                          }}
                        >
                          {dataModel.map((option) => (
                            <MenuItem key={option.id} value={option}>
                              <Checkbox
                                checked={
                                  field.value
                                    .map((item) => item.id)
                                    .indexOf(option.id) > -1
                                }
                              />
                              <ListItemText primary={option.modelName} />
                            </MenuItem>
                          ))}
                        </Select>
                      );
                    }}
                  />
                  {errors.modelIdSet && (
                    <FormHelperText error id='helper-text-modelIdSet'>
                      {errors.modelIdSet.message}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='end'>
          <Button disabled={isUpload &&(!(progress === 100))} variant='contained' type='submit'>
            Lưu thay đổi
          </Button>
          <Button
            sx={{ ml: 2 }}
            variant='outlined'
            onClick={(e) => setOpen(false)}
          >
            Hủy
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductUpdate;
