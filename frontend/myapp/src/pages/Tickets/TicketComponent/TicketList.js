import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import Loader from "../../../layout/Loading/Loader";
import { ticketService } from "../../../services/ticketService";
import { DateFilter } from "../../Statistics/filter/DateFilter";
import TicketItem from "./TicketItem";

const columns = [
  { id: "id", label: "STT", align: "center" },
  {
    id: "code",
    label: "Mã phiếu",
    align: "center",
  },
  {
    id: "licensePlates",
    label: "Biển số xe",
    align: "center",
  },
  {
    id: "customer",
    label: "Khách hàng",
    align: "center",
  },
  {
    id: "repairingEmployee",
    label: "NV Sửa chữa",
    align: "center",
  },
  {
    id: "price",
    label: "Giá",
    align: "right",
  },
  {
    id: "status",
    label: "Trạng thái",
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

const EnhancedTableToolbar = (props) => {
  const {
    setStartDate,
    setEndDate,
    status,
    setStatus,
    searchValue,
    setSearchValue,
    showCollapse,
    setShowCollapse,
  } = props;
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1" }}
          variant='h3'
          id='tableTitle'
          component='div'
        >
          Danh sách phiếu sửa xe
        </Typography>

        <Tooltip title='Lọc Phiếu'>
          <Button
            variant='outlined'
            color='primary'
            sx={{ mr: 2 }}
            endIcon={<FilterListIcon />}
            onClick={() => {
              setShowCollapse(!showCollapse);
            }}
          >
            Lọc Phiếu
          </Button>
        </Tooltip>
        <Tooltip title='Thêm Phiếu Sửa Xe'>
          <Link to='/manage/tickets/create' style={{ textDecoration: "none" }}>
            <Button variant='contained' color='success' endIcon={<AddIcon />}>
              Tạo Phiếu
            </Button>
          </Link>
        </Tooltip>
      </Toolbar>
      <Collapse in={showCollapse}>
        <Toolbar>
          <DateFilter
            returnStartDate={setStartDate}
            returnEndDate={setEndDate}
          />
          <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
            <InputLabel id='select-autowidth-label'>Trạng thái</InputLabel>
            <Select
              labelId='select-autowidth-label'
              id='select-autowidth'
              label='Trạng thái'
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <MenuItem value={-1}>Đã Hủy</MenuItem>
              <MenuItem value={0}>Khởi Tạo</MenuItem>
              <MenuItem value={1}>Chờ Khách Duyệt</MenuItem>
              <MenuItem value={2}>Đang Sửa</MenuItem>
              <MenuItem value={3}>Chờ Thanh Toán</MenuItem>
              <MenuItem value={4}>Hoàn Thành</MenuItem>
              <MenuItem value={5}>Tất Cả Trạng thái</MenuItem>
            </Select>
          </FormControl>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder='Tìm kiếm ...'
            size='small'
            sx={{ width: 360 }}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          ></TextField>
        </Toolbar>
      </Collapse>
    </>
  );
};

const TicketList = () => {
  const [page, setPage] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketList, setTicketList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const cur = new Date();
  const [start, setStartDate] = useState(
    new Date(cur - 24 * 60 * 60 * 1000 * 29)
  );
  const [end, setEndDate] = useState(cur);
  const [status, setStatus] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [showCollapse, setShowCollapse] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!showCollapse) {
      ticketService
        .listInPage(page, rowsPerPage)
        .then(function (response) {
          setTicketList(response.data.listOfItems);
          setTotalTickets(response.data.totalItems);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [page, rowsPerPage, showCollapse]);

  useEffect(() => {
    if (showCollapse) {
      const searchParamsArr = [
        `date>=${moment(start).format("YYYY-MM-DD")}`,
        `date<=${moment(end).format("YYYY-MM-DD")}`,
        `status==${status}`,
        `keyword==${searchValue}`,
      ];
      if (status === 5) searchParamsArr.splice(2, 1);
      if (searchValue === "") searchParamsArr.pop(searchParamsArr[3]);
      const searchParams = searchParamsArr.join(";");

      ticketService
        .search(searchParams)
        .then(function (response) {
          setTicketList(response.data);
          setTotalTickets(response.data.length);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [start, end, status, searchValue, showCollapse]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - ticketList.length) : 0;

  if (loading) return <Loader />;
  return (
    <Box sx={{ width: "100%" }}>
      {ticketList && (
        <Paper sx={{ width: "100%", my: 3 }} elevation={8}>
          <EnhancedTableToolbar
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            status={status}
            setStatus={setStatus}
            setTicketList={setTicketList}
            setTotalTickets={setTotalTickets}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            showCollapse={showCollapse}
            setShowCollapse={setShowCollapse}
          />
          <TableContainer>
            <PerfectScrollbar
              component='div'
              style={{
                height: "calc(100vh - 280px)",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <Table
                stickyHeader
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
              >
                <EnhancedTableHead rowCount={ticketList.length} />
                {ticketList?.length <= rowsPerPage ? (
                  <TableBody>
                    {ticketList.map((row, index) => {
                      return (
                        <TicketItem
                          key={index}
                          index={page * rowsPerPage + (index + 1)}
                          item={row}
                        />
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 54 * emptyRows }}>
                        <TableCell colSpan={12} />
                      </TableRow>
                    )}
                  </TableBody>
                ) : (
                  <TableBody>
                    {ticketList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TicketItem
                            key={index}
                            index={page * rowsPerPage + (index + 1)}
                            item={row}
                          />
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 54 * emptyRows }}>
                        <TableCell colSpan={12} />
                      </TableRow>
                    )}
                  </TableBody>
                )}
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

export default TicketList;
