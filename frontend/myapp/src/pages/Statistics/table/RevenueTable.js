import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { ticketService } from "../../../services/ticketService";
import currencyFormat from "../../../utils/currencyFormat";

const columns = [
  { id: "id", label: "STT", align: "center" },
  { id: "updatedDate", label: "Ngày thanh toán", align: "center" },
  { id: "paymentMethod", label: "Phương thức thanh toán", align: "left" },
  { id: "code", label: "Mã phiếu", align: "center" },
  { id: "licensePlates", label: "Biển số xe", align: "center" },
  { id: "customer", label: "Khách hàng", align: "left" },
  { id: "cashier", label: "Nhân viên thu ngân", align: "left" },
  { id: "price", label: "Giá tiền", align: "right" },
];

function EnhancedTableHead({ totalPrice }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sx={{ fontWeight: "bold" }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ top: 60 }} colSpan={3} align='left'>
          <Typography variant='body1' sx={{ fontWeight: "bold" }}>
            Tổng tiền
          </Typography>
        </TableCell>
        <TableCell
          style={{ top: 60 }}
          colSpan={5}
          align='right'
          sx={{ fontWeight: "bold" }}
        >
          {currencyFormat(totalPrice)}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const RevenueTable = ({ startDate, endDate }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ticketList, setTicketList] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const searchParams = `date>=${moment(startDate).format(
    "YYYY-MM-DD"
  )};date<=${moment(endDate).format("YYYY-MM-DD")};status==${4}`;

  useEffect(() => {
    ticketService
      .searchInPage(searchParams, page, rowsPerPage)
      .then((response) => {
        setTicketList(response.data.listOfItems);
        setTotalTickets(response.data.totalItems);
        // by hand => slow
        let sum = 0;
        for (let item of response.data.listOfItems) {
          sum += item.totalPrice - item.discount;
        }
        setTotalPrice(sum);
      })
      .catch((e) => console.log(e));
  }, [page, rowsPerPage, searchParams]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - ticketList.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      {ticketList && (
        <Paper sx={{ width: "100%", my: 3 }} elevation={8}>
          <TableContainer>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
            >
              <EnhancedTableHead
                totalPrice={totalPrice}
                rowCount={ticketList.length}
              />
              <TableBody>
                {
                  // list in reverse order
                  ticketList
                    .slice(0)
                    .reverse()
                    .map((row, index) => {
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell align='center'>
                            {page * rowsPerPage + (index + 1)}
                          </TableCell>
                          <TableCell align='center'>
                            {row.updatedDate}
                          </TableCell>
                          <TableCell align='left'>
                            {row.paymentMethod}
                          </TableCell>
                          <TableCell align='center'>{row.code}</TableCell>
                          <TableCell align='center'>
                            {row.motorbike?.licensePlates}
                          </TableCell>
                          <TableCell align='left'>
                            {row.customer?.name}
                          </TableCell>
                          <TableCell align='left'>{row.cashierName}</TableCell>
                          <TableCell align='right'>
                            {currencyFormat(row.totalPrice - row.discount)}
                          </TableCell>
                        </TableRow>
                      );
                    })
                }
                {emptyRows > 0 && (
                  <TableRow style={{ height: 54 * emptyRows }}>
                    <TableCell colSpan={12} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            labelRowsPerPage='Hiển thị'
            labelDisplayedRows={function defaultLabelDisplayedRows({
              from,
              to,
              count,
            }) {
              return `Từ ${from} đến ${to} trên tổng ${
                count !== -1 ? count : `Nhiều hơn ${to}`
              }`;
            }}
            rowsPerPageOptions={[10, 15, 20]}
            component='div'
            count={totalTickets}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default RevenueTable;
