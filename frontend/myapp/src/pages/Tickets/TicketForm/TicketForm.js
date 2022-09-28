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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetTicket } from "../../../redux/actions/actionTicket";
import { resetProductInTicket } from "../../../redux/actions/actionTicketProduct";
import { addTickets } from "../../../redux/actions/actionTickets";
import { resetServiceInTicket } from "../../../redux/actions/actionTicketService";
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

const TicketForm = () => {
  const ticketState = useSelector((state) => state.ticket);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [unit, setUnit] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    dispatch(resetProductInTicket());
    dispatch(resetServiceInTicket());
    dispatch(resetTicket());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (unit === 0.01) {
      if (discount > 100) setDiscount(100);
      setFinalPrice((totalProduct + totalService) * (1 - unit * discount));
    } else if (unit === 1) {
      setFinalPrice(totalProduct + totalService - discount);
    }
  }, [unit, totalProduct, totalService, discount]);

  const handleCreateTicket = (values) => {
    if (ticketState.motorbikeId === undefined || ticketState.motorbikeId < 0) {
      toast.warning("Xe Không Được Để Trống");
    } else {
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
        status: 0,
      };
      ticketService
        .create(ticketObject)
        .then(function (response) {
          dispatch(addTickets(response.data));
          dispatch(resetProductInTicket());
          dispatch(resetServiceInTicket());
          dispatch(resetTicket());
          toast.success("Tạo phiếu thành công");
          navigate("/manage/tickets");
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Tạo phiếu không thành công");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateTicket)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TicketCustomer />
        </Grid>
        <Grid item xs={6}>
          <TicketMotorbike />
        </Grid>
        <Grid item xs={6}>
          <TicketEmployee />
        </Grid>
        <Grid item xs={6}>
          <TicketAppointment />
        </Grid>
        <Grid item xs={12}>
          <TicketProductService
            setTotalProduct={setTotalProduct}
            setTotalService={setTotalService}
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
        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            color='primary'
          >
            Tạo Mới
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TicketForm;
