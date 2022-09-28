import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { memo } from "react";
import TicketProduct from "./TicketProduct";
import TicketService from "./TicketService";

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
  {
    id: "option",
    label: "",
    align: "center",
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

const TicketProductService = (props) => {
  const {
    existDataProduct,
    existDataService,
    setTotalService,
    setTotalProduct,
  } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", my: 3 }} elevation={1}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead />
            <TicketProduct
              existDataProduct={existDataProduct}
              setTotalProduct={setTotalProduct}
            />
            <TicketService
              existDataService={existDataService}
              setTotalService={setTotalService}
            />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default memo(TicketProductService);
