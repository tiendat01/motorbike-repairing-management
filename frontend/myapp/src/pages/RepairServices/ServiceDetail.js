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
import { removeService } from "../../redux/actions/actionService";
import { serviceService } from "../../services/serviceService";
import currencyFormat from "../../utils/currencyFormat";
import ServiceUpdate from "./ServiceUpdate";

const ServiceDetail = () => {
  const services = useSelector((state) => state.service);
  const itemId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const service = services?.find((item) => item.id === parseInt(itemId.id));
  const [detailService, setDetailService] = useState(null);

  useEffect(() => {
    if (service) {
      setDetailService(service);
    } else {
      serviceService
        .getOne(itemId.id)
        .then(function (response) {
          setDetailService(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [itemId.id, service, services]);

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
    serviceService
      .remove(id)
      .then(function (response) {
        dispatch(removeService(id));
      })
      .then(function () {
        toast.success("Xóa dịch vụ thành công");
        navigate("/manage/services");
      })
      .catch(function (error) {
        toast.error("Xóa dịch vụ không thành công");
        console.log(error);
      });
  };

  return (
    <>
      {detailService && (
        <Box sx={{ width: "100%", my: 3, px: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link to='/manage/services' style={{ textDecoration: "none" }}>
                <Button
                  variant='text'
                  startIcon={
                    <ArrowBackIosNewIcon fontSize='small' color='action' />
                  }
                >
                  <Typography variant='body2'>Danh sách Dịch Vụ</Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ width: "100%", p: 2 }} elevation={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h4' sx={{ p: "15px 0" }}>
                      Thông tin chi tiết
                    </Typography>
                  </Grid>
                  <Grid item xs={12} marginBottom={1}>
                    <Divider />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item alignItems='left' xs={4}>
                          <Typography
                            variant='body1'
                            sx={{ fontWeight: "bold" }}
                          >
                            Mã Dịch Vụ
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailService?.code ? (
                              <>{detailService.code}</>
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
                            Tên Dịch Vụ
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailService?.name ? (
                              <>{detailService.name}</>
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
                            Mô Tả
                          </Typography>
                        </Grid>
                        <Grid item alignItems='left' xs={8}>
                          <Typography variant='body1'>
                            <>: </>
                            {detailService?.description ? (
                              <>{detailService.description}</>
                            ) : (
                              <>- - -</>
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
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
                            {detailService?.createdDate ? (
                              <>{detailService.createdDate}</>
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
                            {detailService?.updatedDate ? (
                              <>{detailService.updatedDate}</>
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
                            Giá Dịch Vụ
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
                            {detailService?.price ? (
                              <>{currencyFormat(detailService.price)}</>
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
                    handleRemove(event, detailService?.id);
                  },
                });
              }}
            >
              Xoá Dịch Vụ
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleOpen}
              sx={{ ml: "20px" }}
            >
              Sửa Dịch Vụ
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
                <ServiceUpdate
                  detailService={detailService}
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

export default ServiceDetail;
