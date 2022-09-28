import { TableCell, TableRow, Typography } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import currencyFormat from "../../../utils/currencyFormat";
import { statusTicketColor } from "../../../utils/statusTicketColor";

const TicketItem = (props) => {
  const { index, item } = props;
  const navigate = useNavigate();
  const handleNavigateToDetailPage = () => {
    navigate(`/manage/tickets/${item.id}`);
  };

  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      tabIndex={-1}
      key={item.id}
      onClick={handleNavigateToDetailPage}
    >
      <TableCell align='center'>{index}</TableCell>
      <TableCell align='center'>{item?.code}</TableCell>
      <TableCell align='center'>
        <Typography variant='h4'>{item.motorbike?.licensePlates}</Typography>
      </TableCell>
      <TableCell align='center'>
        <>{item.customer?.name}</>
        <br />
        <>{item.customer?.phone}</>
      </TableCell>
      <TableCell align='center'>
        <>{item.repairingEmployee?.name}</>
        <br />
        <>{item.repairingEmployee?.phone}</>
      </TableCell>
      <TableCell align='right'>
        {currencyFormat(item.totalPrice - item.discount)}
      </TableCell>
      <TableCell align='center'>{statusTicketColor(item.status)}</TableCell>
    </TableRow>
  );
};

export default memo(TicketItem);
