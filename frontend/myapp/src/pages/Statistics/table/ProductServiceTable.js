import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { statisticsService } from "../../../services/statisticsService";

const columnsProduct = [
  { id: "productId", label: "STT", align: "left" },
  { id: "productName", label: "Tên sản phẩm", align: "left" },
  { id: "usedQuantity", label: "Số lượng", align: "center" },
];

function EnhancedTableHeadProduct() {
  return (
    <TableHead>
      <TableRow>
        {columnsProduct.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sx={{ fontWeight: "bold" }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const columnsService = [
  { id: "serviceId", label: "STT", align: "left" },
  { id: "serviceName", label: "Tên dịch vụ", align: "left" },
  { id: "usedFrequency", label: "Số phiếu sử dụng", align: "center" },
];

function EnhancedTableHeadService() {
  return (
    <TableHead>
      <TableRow>
        {columnsService.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sx={{ fontWeight: "bold" }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const CombineTable = ({ startDateParam, endDateParam }) => {
  const [listProduct, setListProduct] = useState([]);
  const [listService, setListService] = useState([]);

  const startDate = moment(startDateParam).format("YYYY-MM-DD");
  const endDate = moment(endDateParam).format("YYYY-MM-DD");

  const [pageP, setPageP] = useState(0);
  const [rowsPerPageP, setRowsPerPageP] = useState(10);
  const [pageS, setPageS] = useState(0);
  const [rowsPerPageS, setRowsPerPageS] = useState(10);

  const handleChangePageP = (event, newPage) => {
    setPageP(newPage);
  };

  const handleChangeRowsPerPageP = (event) => {
    setRowsPerPageP(parseInt(event.target.value, 10));
    setPageP(0);
  };

  const handleChangePageS = (event, newPage) => {
    setPageS(newPage);
  };

  const handleChangeRowsPerPageS = (event) => {
    setRowsPerPageS(parseInt(event.target.value, 10));
    setPageS(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRowsS =
    pageS > 0
      ? Math.max(0, (1 + pageS) * rowsPerPageS - listService.length)
      : 0;

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRowsP =
    pageP > 0
      ? Math.max(0, (1 + pageP) * rowsPerPageP - listProduct.length)
      : 0;

  useEffect(() => {
    statisticsService
      .topProduct(startDate, endDate, 10000)
      .then((response) => {
        setListProduct(response.data);
      })
      .catch((e) => console.log(e));

    statisticsService
      .topService(startDate, endDate, 10000)
      .then((response) => {
        setListService(response.data);
      })
      .catch((e) => console.log(e));
  }, [startDate, endDate]);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          {listProduct && (
            <Paper sx={{ width: "100%", my: 3 }} elevation={8}>
              <TableContainer>
                <PerfectScrollbar
                  component='div'
                  style={{
                    height: "calc(100vh - 380px)",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                  }}
                >
                  <Table
                    stickyHeader
                    sx={{ minWidth: 375 }}
                    aria-labelledby='tableTitle'
                  >
                    <EnhancedTableHeadProduct rowCount={listProduct.length} />
                    <TableBody>
                      {listProduct
                        .slice(
                          pageP * rowsPerPageP,
                          pageP * rowsPerPageP + rowsPerPageP
                        )
                        .map((row, index) => {
                          return (
                            <TableRow hover tabIndex={-1} key={row.id}>
                              <TableCell align='left'>
                                {pageP * rowsPerPageP + index + 1}
                              </TableCell>
                              <TableCell align='left'>
                                {row.productName}
                              </TableCell>
                              <TableCell align='center'>
                                {row.usedQuantity}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRowsP > 0 && (
                        <TableRow style={{ height: 54 * emptyRowsP }}>
                          <TableCell colSpan={12} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </PerfectScrollbar>
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
                rowsPerPageOptions={[5, 10, 20]}
                component='div'
                count={listProduct.length}
                rowsPerPage={rowsPerPageP}
                page={pageP}
                onPageChange={handleChangePageP}
                onRowsPerPageChange={handleChangeRowsPerPageP}
              />
            </Paper>
          )}
        </Grid>

        <Grid item xs={5}>
          {listService && (
            <Paper sx={{ width: "100%", my: 3 }} elevation={8}>
              <TableContainer>
                <PerfectScrollbar
                  component='div'
                  style={{
                    height: "calc(100vh - 380px)",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                  }}
                >
                  <Table
                    stickyHeader
                    sx={{ minWidth: 375 }}
                    aria-labelledby='tableTitle'
                  >
                    <EnhancedTableHeadService rowCount={listService.length} />
                    <TableBody>
                      {listService
                        .slice(
                          pageS * rowsPerPageS,
                          pageS * rowsPerPageS + rowsPerPageS
                        )
                        .map((row, index) => {
                          return (
                            <TableRow hover tabIndex={-1} key={row.id}>
                              <TableCell align='left'>
                                {pageS * rowsPerPageS + index + 1}
                              </TableCell>
                              <TableCell align='left'>
                                {row.serviceName}
                              </TableCell>
                              <TableCell align='center'>
                                {row.usedFrequency}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRowsS > 0 && (
                        <TableRow style={{ height: 54 * emptyRowsS }}>
                          <TableCell colSpan={12} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </PerfectScrollbar>
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
                rowsPerPageOptions={[5, 10, 20]}
                component='div'
                count={listService.length}
                rowsPerPage={rowsPerPageS}
                page={pageS}
                onPageChange={handleChangePageS}
                onRowsPerPageChange={handleChangeRowsPerPageS}
              />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CombineTable;
