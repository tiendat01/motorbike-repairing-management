import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../layout/Loading/Loader";
import { updateTickets } from "../../../redux/actions/actionTickets";
import { ticketService } from "../../../services/ticketService";
import currencyFormat from "../../../utils/currencyFormat";
import TicketAppointment from "./TicketAppointment";
import TicketCustomer from "./TicketCustomerMotorbike/TicketCustomer";
import TicketMotorbike from "./TicketCustomerMotorbike/TicketMotorbike";
import TicketEmployee from "./TicketEmployee.js/index.js";
import TicketProductService from "./TicketProductService";

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TicketFormUpdate = () => {
  const ticketState = useSelector((state) => state.ticket);
  const tickets = useSelector((state) => state.tickets); // list all ticket in redux
  const itemId = useParams();
  const ticketDetail = tickets?.find((item) => item.id === parseInt(itemId.id));
  const [detailTicket, setDetailTicket] = useState(null);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [unit, setUnit] = useState(1);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      if (ticketDetail) {
        setDetailTicket(ticketDetail);
      } else {
        ticketService
          .getOne(itemId.id)
          .then(function (response) {
            setDetailTicket(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, [itemId.id, ticketDetail, loading]);

  useEffect(() => {
    if (unit === 0.01) {
      if (discount > 100) setDiscount(100);
      setFinalPrice((totalProduct + totalService) * (1 - unit * discount));
    } else if (unit === 1) {
      setFinalPrice(totalProduct + totalService - discount);
    }
  }, [unit, totalProduct, totalService, discount]);

  useEffect(() => {
    if (!loading) setDiscount(detailTicket?.discount);
  }, [detailTicket, loading]);

  const onSubmit = (values) => {
    setLoading(true);
    const ticketObject = {
      appointmentDate: ticketState.appointmentDate,
      customerId: ticketState.customerId,
      description: values.description,
      discount: totalProduct + totalService - finalPrice,
      motorbikeId: ticketState.motorbikeId,
      note: values.note,
      productRequestSet: ticketState.productRequestSet,
      repairingEmployeeId: ticketState.repairingEmployeeId,
      serviceRequestSet: ticketState.serviceRequestSet,
      status: 1,
    };
    ticketService
      .update(detailTicket?.id, ticketObject)
      .then(function (response) {
        dispatch(updateTickets(detailTicket?.id, response.data));
      })
      .then(function () {
        setLoading(false);
        setUnit(1);
        toast.success("Cập nhật thành công");
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setUnit(1);
        toast.error("Cập nhật không thành công");
      });
  };

  if (loading) return <Loader />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {detailTicket && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TicketCustomer existData={detailTicket.customer} />
              </Grid>
              <Grid item xs={6}>
                <TicketMotorbike existData={detailTicket.motorbike} />
              </Grid>
              <Grid item xs={6}>
                <TicketEmployee existData={detailTicket.repairingEmployee} />
              </Grid>
              <Grid item xs={6}>
                <TicketAppointment existData={detailTicket.appointmentDate} />
              </Grid>
              <Grid item xs={12}>
                <TicketProductService
                  setTotalProduct={setTotalProduct}
                  setTotalService={setTotalService}
                  existDataProduct={detailTicket.products}
                  existDataService={detailTicket.services}
                />
              </Grid>

              <Grid item xs={4}>
                <Paper sx={{ p: 2, height: "100%" }} elevation={5}>
                  <TextField
                    fullWidth
                    multiline
                    InputProps={{
                      style: {
                        height: 103.625,
                      },
                    }}
                    inputProps={{
                      style: {
                        height: "80%",
                      },
                    }}
                    defaultValue={detailTicket?.description}
                    label='Mô tả tình trạng xe'
                    id='description'
                    {...register("description")}
                  />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2, height: "100%" }} elevation={5}>
                  <TextField
                    fullWidth
                    multiline
                    InputProps={{
                      style: {
                        height: 103.625,
                      },
                    }}
                    inputProps={{
                      style: {
                        height: "80%",
                      },
                    }}
                    defaultValue={detailTicket?.note}
                    label='Yêu cầu của khách'
                    id='note'
                    {...register("note")}
                  />
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper sx={{ p: 2, height: "100%" }} elevation={5}>
                  <Grid container rowSpacing={1.5}>
                    <Grid item xs={6}>
                      <Typography variant='h4'>Tổng cộng</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h4'>
                        {currencyFormat(totalProduct + totalService)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} display='flex' alignItems='center'>
                      <Typography variant='h4'>Chiết khấu</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display='flex'>
                        <Box>
                          {unit === 1 ? (
                            <TextField
                              value={discount}
                              name='number-format-input'
                              onChange={(event) => {
                                setDiscount(event.target.value);
                              }}
                              InputProps={{
                                inputComponent: NumberFormatCustom,
                              }}
                              inputProps={{
                                style: { padding: 10 },
                              }}
                              variant='outlined'
                            />
                          ) : (
                            <TextField
                              value={discount}
                              name='number-percentage-input'
                              onChange={(event) => {
                                setDiscount(event.target.value);
                              }}
                              inputProps={{
                                style: { padding: 10 },
                                min: 0,
                                max: 100,
                              }}
                              variant='outlined'
                            />
                          )}
                        </Box>
                        <Box sx={{ ml: 1 }}>
                          <Select
                            defaultValue={1}
                            size='small'
                            variant='outlined'
                            onChange={(e) => setUnit(e.target.value)}
                          >
                            <MenuItem value={0.01}>%</MenuItem>
                            <MenuItem value={1}>VNĐ</MenuItem>
                          </Select>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h4'>Khách hàng TT</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h4'>
                        {currencyFormat(finalPrice)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </>
        )}
        <Box display='flex' justifyContent='end'>
          <Button
            disableElevation
            size='large'
            variant='outlined'
            color='primary'
            sx={{ mr: 2 }}
            onClick={() => {
              navigate(`/manage/tickets/${detailTicket?.id}`);
            }}
          >
            Quay Lại
          </Button>
          <Button
            disableElevation
            size='large'
            type='submit'
            variant='contained'
            color='primary'
          >
            Lưu
          </Button>
        </Box>
      </form>
    </>
  );
};

export default TicketFormUpdate;
