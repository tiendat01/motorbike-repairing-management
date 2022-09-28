import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { getComparator, stableSort } from "../../../utils/sort";
import { statisticsService } from "../../../services/statisticsService";
import { GroupByTop } from "../filter/GroupByTop";

const headCells = [
  {
    id: "stt",
    numeric: false,
    label: "STT",
  },
  {
    id: "customerName",
    numeric: false,
    label: "Tên khách hàng",
  },
  {
    id: "frequency",
    numeric: true,
    label: "Lượt đến sửa",
  },
  {
    id: "moneyPaid",
    numeric: true,
    label: "Tổng tiền chi trả",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold" }}
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
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        // ...{
        //   bgcolor: (theme) =>
        //     alpha(
        //       theme.palette.primary.main,
        //       theme.palette.action.activatedOpacity
        //     ),
        // },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%", textAlign: "center", fontSize: "18px" }}
        variant="h4"
        id="tableTitle"
        component="div"
      >
        Thống kê khách hàng tiềm năng
      </Typography>
    </Toolbar>
  );
};

export default function TopCustomerTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [topCustomerList, setTopCustomerList] = React.useState([]);
  const [top, setTop] = React.useState(10);

  React.useEffect(() => {
    statisticsService
      .topCustomer(top)
      .then((response) => {
        setTopCustomerList(response.data);
      })
      .catch((e) => console.log(e));
  }, [top]);

  const returnFilterTop = (top) => {
    setTop(top);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <GroupByTop style={{ mt: 2 }} returnFilterTop={returnFilterTop} />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", my: 2, mt: 1 }} elevation={8}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={topCustomerList.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(topCustomerList, getComparator(order, orderBy)).map(
                  (row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        <TableCell component="th" id={labelId}>
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">{row.customerName}</TableCell>
                        <TableCell align="right">{row.frequency}</TableCell>
                        <TableCell align="right">{row.moneyPaid}</TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
