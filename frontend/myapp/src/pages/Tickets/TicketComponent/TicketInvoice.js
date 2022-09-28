import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PrintIcon from "@mui/icons-material/Print";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import LogoSection from "../../../layout/MainLayout/LogoSection";
import currencyFormat from "../../../utils/currencyFormat";
import {
  getCurrentDate,
  getCurrentMonth,
  getCurrentYear,
} from "../../../utils/getCurrentDate";
import TicketStatusStepper from "./TicketStatusStepper";

const columns = [
  { id: "id", label: "STT", align: "center" },
  {
    id: "code",
    label: "Mã sản phẩm",
    align: "center",
  },
  {
    id: "name",
    label: "Tên sản phẩm",
    align: "left",
  },
  {
    id: "price",
    label: "Đơn giá",
    align: "right",
  },
  {
    id: "quantity",
    label: "Số lượng",
    align: "center",
  },
  {
    id: "amount",
    label: "Thành tiền",
    align: "right",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const TicketInvoice = ({ detailInfor }) => {
  const componentRef = useRef();

  const totalCostProduct = detailInfor?.products?.reduce((total, item) => {
    return total + item.stockPrice * item.quantity;
  }, 0);

  const totalCostService = detailInfor?.services?.reduce((total, item) => {
    return total + item.stockPrice;
  }, 0);

  return (
    <Grid container columnSpacing={3}>
      <Grid item xs={9}>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <Link to='/manage/tickets' style={{ textDecoration: "none" }}>
              <Button
                variant='text'
                startIcon={
                  <ArrowBackIosNewIcon fontSize='small' color='action' />
                }
              >
                <Typography variant='body2'>Danh sách phiếu sửa</Typography>
              </Button>
            </Link>
          </div>
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <ReactToPrint
              trigger={() => (
                <Stack direction='row' sx={{ mb: 1 }} spacing={2}>
                  <Button variant='contained' startIcon={<PrintIcon />}>
                    Xuất Hóa Đơn
                  </Button>
                </Stack>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
        <div ref={componentRef}>
          <Paper sx={{ width: "100%", p: 2 }} elevation={5}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box component='span' sx={{ flexGrow: 1 }}>
                  <LogoSection />
                </Box>
              </Grid>
              <Grid
                item
                xs={8}
                display='flex'
                alignItems='center'
                justifyContent='end'
              >
                <Typography
                  sx={{
                    letterSpacing: 1,
                    fontWeight: 500,
                    fontStyle: "italic",
                  }}
                >
                  {`Hà Nội, ngày ${getCurrentDate()} tháng ${getCurrentMonth()} năm ${getCurrentYear()}`}
                </Typography>
              </Grid>

              <Grid item xs={12} align='center'>
                <Typography variant='h2' sx={{ textTransform: "uppercase" }}>
                  Báo Giá Sửa Chữa
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    my: 1,
                    p: 2,
                    border: "1px solid #333",
                    borderRadius: 1.25,
                  }}
                >
                  <Grid container rowSpacing={1.25}>
                    <Grid item alignItems='center' xs={2}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Mã phiếu:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={4}>
                      <Typography variant='body1'>{detailInfor?.id}</Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={2}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        NV sửa chữa:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={4}>
                      {detailInfor?.repairingEmployee && (
                        <Typography variant='body1'>
                          {`${detailInfor?.repairingEmployee?.code} - ${detailInfor?.repairingEmployee?.name}`}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item alignItems='center' xs={2}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Ngày lập:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={4}>
                      <Typography variant='body1'>
                        {detailInfor?.createdDate}
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={2}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Số điện thoại:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={4}>
                      <Typography variant='body1'>
                        {detailInfor?.repairingEmployee?.phone}
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={2}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Ngày hẹn:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={4}>
                      <Typography variant='body1'>
                        {detailInfor?.appointmentDate}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    width: "100%",
                    my: 1,
                    p: 2,
                    border: "1px solid #333",
                    borderRadius: 1.25,
                  }}
                >
                  <Grid container rowSpacing={1.25}>
                    <Grid item alignItems='center' xs={5}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Mã khách hàng:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={7}>
                      <Typography variant='body1'>
                        {detailInfor?.customer?.id}
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={5}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Tên khách hàng:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={7}>
                      <Typography variant='body1'>
                        {detailInfor?.customer?.name}
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={5}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Số điện thoại:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={7}>
                      <Typography variant='body1'>
                        {detailInfor?.customer?.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    width: "100%",
                    my: 1,
                    p: 2,
                    border: "1px solid #333",
                    borderRadius: 1.25,
                  }}
                >
                  <Grid container rowSpacing={1.25}>
                    <Grid item alignItems='center' xs={5}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Biển số xe:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={7}>
                      <Typography variant='body1'>
                        {detailInfor?.motorbike?.licensePlates}
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={5}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Hãng xe:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={7}>
                      <Typography variant='body1'>
                        {detailInfor?.motorbike?.model?.modelName}
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={5}>
                      <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                        Kiểu xe:
                      </Typography>
                    </Grid>
                    <Grid item alignItems='center' xs={7}>
                      <Typography variant='body1'>
                        {detailInfor?.motorbike?.model?.brand?.brandName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 3,
                width: "100%",
                border: "1px solid #333",
                borderRadius: 1.25,
              }}
            >
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                  <EnhancedTableHead />
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} align='left'>
                        <Typography variant='body1'>
                          Phụ tùng & Linh kiện
                        </Typography>
                      </TableCell>
                      <TableCell colSpan={3}></TableCell>
                    </TableRow>
                    {detailInfor?.products?.map((item, index) => {
                      return (
                        <TableRow
                          hover
                          sx={{ cursor: "pointer" }}
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align='center'>{index + 1}</TableCell>
                          <TableCell align='center'>
                            {item?.product?.code}
                          </TableCell>
                          <TableCell align='left'>
                            {item?.product?.name}
                          </TableCell>
                          <TableCell align='right'>
                            {currencyFormat(item?.stockPrice)}
                          </TableCell>
                          <TableCell align='center'>{item?.quantity}</TableCell>
                          <TableCell align='right'>
                            {currencyFormat(item?.stockPrice * item?.quantity)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={5} align='right'>
                        <Typography variant='h5'>
                          Tổng tiền linh kiện
                        </Typography>
                      </TableCell>
                      <TableCell align='right'>
                        {totalCostProduct > 0 && (
                          <Typography variant='h4'>
                            {currencyFormat(totalCostProduct)}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={3} align='left'>
                        <Typography variant='body1'>
                          Dịch vụ & Nhân công
                        </Typography>
                      </TableCell>
                      <TableCell colSpan={3}></TableCell>
                    </TableRow>
                    {detailInfor?.services?.map((item, index) => {
                      return (
                        <TableRow
                          hover
                          sx={{ cursor: "pointer" }}
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align='center'>{index + 1}</TableCell>
                          <TableCell align='center'>
                            {item?.service?.code}
                          </TableCell>
                          <TableCell align='left'>
                            {item?.service?.name}
                          </TableCell>
                          <TableCell align='right'>
                            {currencyFormat(item?.stockPrice)}
                          </TableCell>
                          <TableCell align='center'>1</TableCell>
                          <TableCell align='right'>
                            {currencyFormat(item?.stockPrice)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={5} align='right'>
                        <Typography variant='h5'>Tổng tiền dịch vụ</Typography>
                      </TableCell>
                      <TableCell align='right'>
                        {totalCostService > 0 && (
                          <Typography variant='h4'>
                            {currencyFormat(totalCostService)}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  p: 2,
                  mt: 3,
                  width: "60%",
                  border: "1px solid #333",
                  borderRadius: 1.25,
                }}
              >
                <Typography variant='body2'>
                  1. Phụ tùng thay thế là phụ tùng chính hãng mới 100% thì sẽ
                  được bảo hành theo tiêu chuẩn của hãng.
                </Typography>
                <Typography variant='body2'>
                  2. Nếu có phát sinh công dịch vụ và phụ tùng trong quá trình
                  sửa chữa, chúng tôi sẽ thông báo đến quý khách hàng ngay lập
                  tức. Công việc sửa chữa chỉ được tiếp tục khi có xác nhận của
                  quý khách hàng.
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  mt: 3,
                  ml: 2,
                  width: "40%",
                  border: "1px solid #333",
                  borderRadius: 1.25,
                }}
              >
                <Grid container rowSpacing={1.5}>
                  <Grid item xs={6}>
                    <Typography variant='h4'>Tổng cộng</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h4' align='right'>
                      {currencyFormat(detailInfor?.totalPrice)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h4'>Chiết khấu</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h4' align='right'>
                      {currencyFormat(detailInfor?.discount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h4'>Khách hàng TT</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h4' align='right'>
                      {currencyFormat(
                        detailInfor?.totalPrice - detailInfor?.discount
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </div>
      </Grid>
      <Grid item xs={3}>
        <Stack direction='row' sx={{ mb: 1 }} spacing={2}>
          <Button style={{ backgroundColor: 'transparent',cursor:'default' }} disableRipple fullWidth disableElevation variant='outlined'>
            Lịch Sử Chỉnh Sửa
          </Button>
        </Stack>
        <Paper sx={{ width: "100%", p: 2 }} elevation={5}>
          <TicketStatusStepper ticketId={detailInfor.id} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TicketInvoice;
