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
        toast.success("Th??m m???i th??nh c??ng");
        navigate(`/manage/products/${response.data.id}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Th??m m???i th???t b???i");
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
  const [url, setUrl] = useState(null);  //link ???nh
  
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
              <Typography variant='body2'>Danh S??ch Linh Ki???n</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ width: "100%", p: 2 }} elevation={1}>
            <Grid container>
              <Grid item xs={12}>
                <Typography sx={{ p: "15px 0" }} variant='h4'>
                  Th??m M???i Linh Ki???n
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
                          Th??m ???nh Linh Ki???n
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
                          Ch???n ???nh
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
                                S???a Th??ng Tin Chi Ti???t
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
                                T??n Linh Ki???n
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                variant='outlined'
                                size='small'
                                label='T??n Linh Ki???n'
                                fullWidth
                                {...register("name", {
                                  required: "T??n linh ki???n kh??ng ???????c ????? tr???ng",
                                  maxLength:100,
                                })}
                              ></TextField>
                              {errors.name && errors.name.type === "maxLength" && (
                                <FormHelperText error id='helper-text-name' >
                                  T??n linh ki???n kh??ng d??i qu?? 100 k?? t???
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
                                M?? T???
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                variant='outlined'
                                size='small'
                                label='M?? T???'
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
                                Lo???i Danh M???c
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                            <FormControl fullWidth size='small'>
                              <InputLabel id="demo-multiple-checkbox-label">Lo???i danh m???c</InputLabel>
                              <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                variant='outlined'
                                size='small'
                                label='Lo???i Danh M???c'
                                fullWidth
                                {...register("categoryId", {
                                  required: "Lo???i danh m???c kh??ng ???????c ????? tr???ng",
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
                                Gi??
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                size='small'
                                label='Gi??'
                                fullWidth
                                variant='outlined'
                                {...register("price", {
                                  required: "Gi?? kh??ng ???????c ????? tr???ng",
                                  maxLength:10,
                                  pattern:/[1-9][0-9]*$/
                                })}
                              />
                              {errors.price && errors.price.type === "maxLength" && (
                                <FormHelperText error id='helper-text-name' >
                                  Gi?? kh??ng qu?? 10 k?? t???
                                </FormHelperText>
                              )}
                              {errors.price && errors.price.type === "pattern" && (
                                <FormHelperText error id='helper-text-name' >
                                  Gi?? ch??? ch???a s???
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
                                S??? L?????ng
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                variant='outlined'
                                size='small'
                                label='S??? L?????ng'
                                fullWidth
                                {...register("quantity", {
                                  required: "S??? l?????ng linh ki???n kh??ng ???????c ????? tr???ng",
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
                                  S??? l?????ng ch??? ch???a s???
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
                                ????n V??? T??nh
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <TextField
                                variant='outlined'
                                size='small'
                                label='????n V??? T??nh'
                                fullWidth
                                {...register("unit",{
                                  required:"????n v??? t??nh kh??ng ???????c ????? tr???ng"
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
                                Ki???u Xe
                              </Typography>
                            </Grid>
                            <Grid item alignItems='center' xs={9}>
                              <FormControl fullWidth size='small'>
                              <InputLabel id="demo-multiple-checkbox-label">Ki???u xe</InputLabel>
                              <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                {...register('modelIdSet',{
                                  required:"Ki???u xe kh??ng ???????c ????? tr???ng",
                                })}
                                fullWidth
                                multiple
                                value={modelSubmit}
                                onChange={handleChange}
                                input={<OutlinedInput label="Ki???u xe" />}
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
                        T???o M???i
                      </Button>
                      <Link to='/manage/products' style={{ textDecoration: "none" }}>
                        <Button
                          sx={{ ml: 2 }}
                          variant='outlined'
                        >
                          H???y
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