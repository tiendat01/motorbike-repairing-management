import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicketService } from "../../../../../redux/actions/actionTicket";
import {
  removeServiceInTicket,
  startSetServiceInTicket,
} from "../../../../../redux/actions/actionTicketService";
import currencyFormat from "../../../../../utils/currencyFormat";
import SearchBar from "../SearchBar";

const EnhancedTableToolbar = () => {
  return (
    <TableRow>
      <TableCell colSpan={2} align='left'>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant='h4'
          id='tableTitle'
          component='div'
        >
          Dịch vụ & Nhân công
        </Typography>
      </TableCell>
      <TableCell colSpan={5} align='right'>
        <SearchBar type='SERVICE' />
      </TableCell>
    </TableRow>
  );
};

const TicketService = ({ existDataService, setTotalService }) => {
  const dispatch = useDispatch();
  const listService = useSelector((state) => state.ticketService);
  const totalCost = listService?.reduce((total, item) => {
    return total + item.price;
  }, 0);

  useEffect(() => {
    setTotalService(totalCost);
  }, [totalCost, setTotalService]);

  useEffect(() => {
    if (existDataService) {
      const selectedServices = existDataService.map((item) => {
        return {
          id: item?.service?.id,
          code: item?.service?.code,
          name: item?.service?.name,
          price: item?.stockPrice,
        };
      });
      dispatch(startSetServiceInTicket(selectedServices));
    }
  }, [dispatch, existDataService]);

  useEffect(() => {
    dispatch(
      addTicketService(
        listService.map((item) => {
          return { serviceId: item.id };
        })
      )
    );
  }, [dispatch, listService]);

  const emptyRows =
    listService.length < 3 ? Math.max(0, 3 - listService.length) : 0;

  return (
    <>
      <TableBody>
        <EnhancedTableToolbar />
        {listService.map((item, index) => {
          return (
            <TableRow
              hover
              sx={{ cursor: "pointer" }}
              tabIndex={-1}
              key={index}
            >
              <TableCell align='center'>{index + 1}</TableCell>
              <TableCell align='center'>{item.code}</TableCell>
              <TableCell align='left'>{item.name}</TableCell>
              <TableCell align='right'>{currencyFormat(item.price)}</TableCell>
              <TableCell align='center'>1</TableCell>
              <TableCell align='right'>{currencyFormat(item.price)}</TableCell>
              <TableCell align='center'>
                <IconButton
                  size='small'
                  onClick={() => {
                    dispatch(removeServiceInTicket(item.id));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 70 * emptyRows }}>
            <TableCell colSpan={12} />
          </TableRow>
        )}
        <TableRow>
          <TableCell colSpan={5} align='right'>
            <Typography variant='h5'>Tổng tiền dịch vụ</Typography>
          </TableCell>
          <TableCell align='right'>
            {totalCost > 0 && (
              <Typography variant='h4'>{currencyFormat(totalCost)}</Typography>
            )}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default memo(TicketService);
