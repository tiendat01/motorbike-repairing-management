// Pie Chart and Table

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { statisticsService } from "../../../services/statisticsService";
import moment from "moment";
import { getComparator, stableSort } from "../../../utils/sort";
import currencyFormat from "../../../utils/currencyFormat";
import StyledPieChart from "../chart-template/PieChart";

const columns = [
  { id: "stt", label: "STT", align: "center" },
  { id: "mechanicName", label: "Tên nhân viên sửa chữa", align: "left" },
  {
    id: "totalValue",
    label: "Tổng giá trị phiếu đã hoàn thành",
    align: "center",
  },
  { id: "completed", label: "Số phiếu hoàn thành", align: "left" },
  {
    id: "onProcess",
    label: "Số phiếu trong quá trình sửa chữa",
    align: "center",
  },
  { id: "canceled", label: "Số phiếu bị huỷ", align: "center" },
  { id: "numTickets", label: "Tổng số phiếu đã nhận", align: "center" },
];

function EnhancedTableHead({
  totalValue,
  completed,
  onProcess,
  canceled,
  total,
  order,
  orderBy,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sx={{ fontWeight: "bold" }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell colSpan={2} align="left" sx={{ fontWeight: "bold" }}>
          Tổng
        </TableCell>
        <TableCell colSpan={1} align="center" sx={{ fontWeight: "bold" }}>
          {totalValue}
        </TableCell>
        <TableCell colSpan={1} align="center" sx={{ fontWeight: "bold" }}>
          {completed}
        </TableCell>
        <TableCell colSpan={1} align="center" sx={{ fontWeight: "bold" }}>
          {onProcess}
        </TableCell>
        <TableCell colSpan={1} align="center" sx={{ fontWeight: "bold" }}>
          {canceled}
        </TableCell>
        <TableCell colSpan={1} align="center" sx={{ fontWeight: "bold" }}>
          {total}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const TopMechanicTable = ({ startDate, endDate }) => {
  const [mechanicList, setMechanicList] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [onProcess, setOnProcess] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("total");
  const [pieData, setPieData] = useState([]);

  const pieTitle = "Thống kê tình trạng đơn sửa chữa";

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log(property, order);
  };

  useEffect(() => {
    statisticsService
      .calTicketMechanic(
        moment(startDate).format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD")
      )
      .then((response) => {
        setMechanicList(response.data);
        // by hand ?
        let completed = 0;
        for (let item of response.data) completed += item.completed;
        setCompleted(completed);

        let onProcess = 0;
        for (let item of response.data) onProcess += item.onProcess;
        setOnProcess(onProcess);

        let canceled = 0;
        for (let item of response.data) canceled += item.canceled;
        setCanceled(canceled);

        let total = 0;
        for (let item of response.data) total += item.numTickets;
        setTotal(total);

        let totalValue = 0;
        for (let item of response.data) totalValue += item.totalValue;
        setTotalValue(totalValue);

        setPieData([
          {
            name: "Hoàn thành",
            y: Number((Math.round((completed / total) * 100) / 100).toFixed(2)),
            selected: true,
          },
          {
            name: "Trong quá trình",
            y: Number((Math.round((onProcess / total) * 100) / 100).toFixed(2)),
          },
          {
            name: "Bị huỷ",
            y: Number((Math.round((canceled / total) * 100) / 100).toFixed(2)),
          },
        ]);
      })
      .catch((e) => console.log(e));
  }, [startDate, endDate]);

  return (
    <Box sx={{ width: "100%" }}>
      
      <Box sx={{ mt: 3 }}>
        <StyledPieChart title={pieTitle} data={pieData} />
      </Box>

      {mechanicList && (
        <Paper sx={{ width: "100%", my: 3 }} elevation={8}>
          <TableContainer>
            {/* <PerfectScrollbar
              component="div"
              style={{
                height: "calc(100vh - 380px)",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <Table ...
            </PerfectScrollbar> */}

              <Table
                stickyHeader
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={mechanicList.length}
                  totalValue={currencyFormat(totalValue)}
                  completed={completed}
                  onProcess={onProcess}
                  canceled={canceled}
                  total={total}
                />
                <TableBody>
                  {stableSort(mechanicList, getComparator(order, orderBy))
                    .slice(0)
                    .map((row, index) => {
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">
                            {row.mechanicName}
                          </TableCell>
                          <TableCell align="center">
                            {currencyFormat(row.totalValue)}
                          </TableCell>
                          <TableCell align="center">{row.completed}</TableCell>
                          <TableCell align="center">{row.onProcess}</TableCell>
                          <TableCell align="center">{row.canceled}</TableCell>
                          <TableCell align="center">{row.numTickets}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default TopMechanicTable;
