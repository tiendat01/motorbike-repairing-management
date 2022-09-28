import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDialog from "../../common/ConfirmDialog";
import { imgDefault } from "../../constants/const";
import { removeProduct } from "../../redux/actions/actionProduct";
import { productService } from "../../services/productService";
import currencyFormat from "../../utils/currencyFormat";
import ProductUpdate from "./ProductUpdate";

const ProductDetail = () => {
  const products = useSelector((state) => state.product);
  const itemId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = products?.find((item) => item.id === parseInt(itemId.id));
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setDetailProduct(product);
    } else {
      productService
        .getOne(itemId.id)
        .then(function (response) {
          setDetailProduct(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [itemId.id, product, products]);

  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isDelete: false,
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRemove = (event, id) => {
    productService
      .remove(id)
      .then(function (response) {
        dispatch(removeProduct(id));
        console.log(response.data);
      })
      .then(function () {
        toast.success("Xóa linh kiện thành công");
        navigate("/manage/products");
      })
      .catch(function (error) {
        toast.error("Xóa linh kiện không thành công");
        console.log(error);
      });
  };

  return (
    <>
      {detailProduct && (
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
                  <Typography variant='body2'>Danh sách linh kiện</Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ width: "100%", p: 2 }} elevation={1}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='h4' sx={{ p: "15px 0" }}>
                      Thông tin chi tiết
                    </Typography>
                  </Grid>
                  <Grid item xs={12} marginBottom={1}>
                    <Divider />
                  </Grid>

                  <Grid item xs={5}>
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item alignItems='left' xs={4}>
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Mã SP
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailProduct?.code ? (
                              <>{detailProduct.code}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>

                        <Grid item alignItems='left' xs={4}>
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Tên SP
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailProduct?.name ? (
                              <>{detailProduct.name}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>

                        <Grid item alignItems='left' xs={4}>
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Đơn vị tính
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailProduct?.unit ? (
                              <>{detailProduct.unit}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>

                        <Grid item alignItems='left' xs={4}>
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Phân loại
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailProduct?.category ? (
                              <>{detailProduct.category.name}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={5}>
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item alignItems='left' xs={4}>
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Mô tả
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailProduct?.description ? (
                              <>{detailProduct.description}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>

                        <Grid item alignItems='left' xs={4}>
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Số lượng
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailProduct?.quantity ? (
                              <>{detailProduct.quantity}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>

                        <Grid item alignItems='left' xs={4}>
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Ngày tạo
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailProduct?.createdDate ? (
                              <>{detailProduct.createdDate}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>

                        <Grid item alignItems='left' xs={4}>
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Ngày sửa
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailProduct?.updatedDate ? (
                              <>{detailProduct.updatedDate}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={2} sx={{ display: "flex" }}>
                    <Paper elevation={5} sx={{ display: "flex" }}>
                      <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        padding={0.5}
                        sx={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)" }}
                      >
                        <img
                          alt={detailProduct?.name}
                          style={imgDefault.style}
                          src={detailProduct?.image || imgDefault.src}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ width: "100%", p: 2 }} elevation={1}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='h4' sx={{ p: "15px 0" }}>
                      Giá sản phẩm
                    </Typography>
                  </Grid>
                  <Grid item xs={12} marginBottom={1}>
                    <Divider />
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid
                          item
                          alignItems='center'
                          justifyContent='start'
                          display='flex'
                          xs={5}
                        >
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Giá nhập vào
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          alignItems='center'
                          justifyContent='start'
                          display='flex'
                          xs={7}
                        >
                          <Typography variant='h2'>
                            <>: </>
                            {detailProduct?.priceIn ? (
                              <>{detailProduct.priceIn}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          alignItems='center'
                          justifyContent='start'
                          display='flex'
                          xs={5}
                        >
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Giá bán ra
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          alignItems='center'
                          justifyContent='start'
                          display='flex'
                          xs={7}
                        >
                          <Typography variant='h2'>
                            <>: </>
                            {detailProduct?.price ? (
                              <>{currencyFormat(detailProduct.price)}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Divider sx={{ borderColor: "#dfe4e8" }} />
          <Box mt={3}>
            <Button
              variant='contained'
              color='error'
              onClick={(event) => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Bạn có muốn xóa không",
                  subtitle: "Thao tác này không thể thực hiện lại",
                  onConfirm: () => {
                    handleRemove(event, detailProduct?.id);
                  },
                });
              }}
            >
              Xoá Linh Kiện
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleOpen}
              sx={{ ml: "20px" }}
            >
              Sửa Linh Kiện
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Paper
                elevation={1}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  minWidth: 850,
                  p: 3,
                }}
              >
                <ProductUpdate
                  detailProduct={detailProduct}
                  setOpen={setOpen}
                />
              </Paper>
            </Modal>
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductDetail;
