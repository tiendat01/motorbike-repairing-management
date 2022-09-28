import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Avatar,
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
import { removeCustomer } from "../../redux/actions/actionCustomer";
import { customerService } from "../../services/customerService";
import { stringAvatar } from "../../utils/stringAvatar";
import CustomerUpdate from "./CustomerUpdate";
import TicketCustomer from "./TicketCustomer";

const CustomerDetail = () => {
  const customers = useSelector((state) => state.customer);
  const itemId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = customers?.find((item) => item.id === parseInt(itemId.id));
  const [detailCustomer, setDetailCustomer] = useState(null);

  useEffect(() => {
    if (customer) {
      setDetailCustomer(customer);
    } else {
      customerService
        .getOne(itemId.id)
        .then(function (response) {
          setDetailCustomer(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [itemId.id, customer, customers]);

  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isDelete: false,
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRemove = async (event, id) => {
    customerService
      .remove(id)
      .then(function (response) {
        dispatch(removeCustomer(id));
      })
      .then(function () {
        toast.success("Xóa khách hàng thành công");
        navigate("/manage/customers");
      })
      .catch(function (error) {
        toast.error("Xóa khách hàng không thành công");
        console.log(error);
      });
  };

  return (
    <>
      {detailCustomer && (
        <Box sx={{ width: "100%", my: 3, px: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link to='/manage/customers' style={{ textDecoration: "none" }}>
                <Button
                  variant='text'
                  startIcon={
                    <ArrowBackIosNewIcon fontSize='small' color='action' />
                  }
                >
                  <Typography variant='body2'>Danh sách khách hàng</Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ width: "100%", my: 3 }} elevation={1}>
                <Grid
                  container
                  alignItems='center'
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ p: 1 }}
                >
                  <Grid
                    item
                    xs={5}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {detailCustomer?.name && (
                      <Avatar
                        {...stringAvatar(detailCustomer.name)}
                        sx={{ width: 100, height: 100 }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={7}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant='h2' gutterBottom>
                          {detailCustomer?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid
                  container
                  alignItems='center'
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ p: 1 }}
                >
                  <Grid item xs={12}>
                    <Box sx={{ mt: 1 }}>
                      <Typography sx={{ pb: 1, fontWeight: "bold", ml: 1 }}>
                        Ghi chú:
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{ width: "100%", my: 3 }} elevation={1}>
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant='h5' sx={{ fontWeight: "bold" }}>
                        Thông Tin Chi Tiết
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>

                    <Grid item alignItems='center' xs={3}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Tên khách hàng
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={9}>
                      <Typography variant='body1'>
                        <>: </>
                        {detailCustomer?.name ? (
                          <>{detailCustomer.name}</>
                        ) : (
                          <>- - -</>
                        )}
                      </Typography>
                    </Grid>

                    <Grid item alignItems='center' xs={3}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Số điện thoại
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={9}>
                      <Typography variant='body1'>
                        <>: </>
                        {detailCustomer?.phone ? (
                          <>{detailCustomer.phone}</>
                        ) : (
                          <>- - -</>
                        )}
                      </Typography>
                    </Grid>

                    <Grid item alignItems='center' xs={3}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Địa chỉ
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={9}>
                      <>: </>
                      {detailCustomer?.address ? (
                        <>{detailCustomer.address}</>
                      ) : (
                        <>- - -</>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Divider sx={{ borderColor: "#dfe4e8" }} />

          <Grid item xs={12}>
            <Paper sx={{ width: "100%", p: 1 }} elevation={1}>
              <Grid container>
                <Grid item xs={12} sx={{ ml: 1 }}>
                  <Typography variant='h4' sx={{ p: "15px 0" }}>
                    Danh Sách Hóa Đơn Đã Tạo
                  </Typography>
                </Grid>
                <Grid item xs={12} marginBottom={1}>
                  <Divider />
                </Grid>
                <Grid item xs={12} marginBottom={1}>
                  <TicketCustomer detailCustomer={detailCustomer} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
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
                    handleRemove(event, detailCustomer?.id);
                  },
                });
              }}
            >
              Xoá Khách Hàng
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleOpen}
              sx={{ ml: "20px" }}
            >
              Sửa Thông Tin
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
                <CustomerUpdate
                  detailCustomer={detailCustomer}
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

export default CustomerDetail;
