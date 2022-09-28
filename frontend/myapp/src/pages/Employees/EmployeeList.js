import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDialog from "../../common/ConfirmDialog";
import Loader from "../../layout/Loading/Loader";
import { startSetEmployee } from "../../redux/actions/actionEmployee";
import { employeeService } from "../../services/employeeService";
import { getComparator, stableSort } from "../../utils/sort";
import EmployeeItem from "./EmployeeItem";

const columns = [
  { id: "id", label: "STT", align: "center" },
  {
    id: "code",
    label: "Mã nhân viên",
    align: "center",
  },
  {
    id: "name",
    label: "Tên nhân viên",
    align: "center",
  },
  {
    id: "phone",
    label: "Số điện thoại",
    align: "center",
  },
  {
    id: "role",
    label: "Vai trò",
    align: "center",
  },
  {
    id: "workingStatus",
    label: "Trạng thái",
    align: "center",
  },
  {
    id: "available",
    label: "TT Thợ sửa",
    align: "center",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon={true}
              sx={{ fontWeight: "bold" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === "desc" ? "Sorted Descending" : "Sorted Ascending"}
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    searchValue,
    setSearchValue,
    showCollapse,
    setShowCollapse,
    roles,
    setRoles,
    setLoading,
    numSelectedArr,
    setSelected,
  } = props;

  const roleList = [
    { eng: "mechanic", vie: "Thợ sửa chữa" },
    { eng: "cashier", vie: "Thu ngân" },
    { eng: "moderator", vie: "Điều phối" },
    { eng: "admin", vie: "Quản lý" },
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [confirmDialog, setConfirmDialog] = useState({
    isDelete: false,
    isOpen: false,
    title: "",
    subtitle: "",
  });

  const handleMultiDelete = (numSelectedArr) => {
    setLoading(true);
    employeeService
      .deleteMulti(numSelectedArr)
      .then(function (response) {
        toast.success("Xóa thành công");
        setSelected([]);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Xóa thất bại");
        setLoading(false);
      });
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color='inherit'
            variant='h5'
            component='div'
          >
            Đã chọn {numSelected} nhân viên
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1" }}
            variant='h3'
            id='tableTitle'
            component='div'
          >
            Danh sách nhân viên
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title='Xóa Nhân Viên'>
            <Button
              onClick={(event) => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Bạn có muốn xóa không",
                  subtitle: "Thao tác này không thể thực hiện lại",
                  onConfirm: () => {
                    handleMultiDelete(numSelectedArr);
                  },
                });
              }}
              variant='contained'
              color='error'
              endIcon={<DeleteIcon />}
            >
              Xóa
            </Button>
          </Tooltip>
        ) : (
          <>
            <Tooltip title='Lọc Nhân Viên'>
              <Button
                variant='outlined'
                color='primary'
                sx={{ mr: 2 }}
                endIcon={<FilterListIcon />}
                onClick={() => {
                  setShowCollapse(!showCollapse);
                }}
              >
                Lọc Nhân Viên
              </Button>
            </Tooltip>
            <Tooltip title='Thêm Nhân Viên'>
              <Link
                to='/manage/employees/create'
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant='contained'
                  color='success'
                  endIcon={<AddIcon />}
                >
                  Thêm Nhân Viên
                </Button>
              </Link>
            </Tooltip>
          </>
        )}
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Toolbar>
      <Collapse in={showCollapse}>
        <Toolbar sx={{ justifyContent: "end" }}>
          <FormControl sx={{ m: 1, width: 250 }} size='small'>
            <InputLabel id='select-autowidth-label'>Vai trò</InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={roles}
              onChange={handleChange}
              input={<OutlinedInput label='Vai trò' />}
              renderValue={(selected) =>
                selected
                  .map((item) => {
                    const role = roleList.find((i) => i.eng === item);
                    return role.vie;
                  })
                  .join(", ")
              }
            >
              {roleList.map((item) => (
                <MenuItem key={item.eng} value={item.eng}>
                  <Checkbox checked={roles?.indexOf(item.eng) > -1} />
                  <ListItemText primary={item.vie} />
                </MenuItem>
              ))}
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
            sx={{ width: 250 }}
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

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EmployeeList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roles, setRoles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showCollapse, setShowCollapse] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!showCollapse && !loading) {
      employeeService
        .listInPage(page, rowsPerPage)
        .then(function (response) {
          dispatch(startSetEmployee(response.data.listOfItems));
          setTotalEmployees(response.data.totalItems);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [dispatch, page, rowsPerPage, showCollapse, loading]);

  useEffect(() => {
    if (showCollapse && !loading) {
      const searchParamsArr = [
        `roles:${roles?.join(",")}`,
        `keyword==${searchValue}`,
      ];
      if (roles.length <= 0) searchParamsArr.splice(0, 1);
      if (searchValue === "") searchParamsArr.pop(searchParamsArr[1]);
      const searchParams = searchParamsArr.join(";");
      employeeService
        .search(searchParams)
        .then(function (response) {
          dispatch(startSetEmployee(response.data));
          setTotalEmployees(response.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [roles, searchValue, showCollapse, dispatch, loading]);

  const listEmployee = useSelector((state) => state.employee);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listEmployee.map((item) => item.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClickCheckbox = useCallback(
    (event, id) => {
      const selectedIndex = selected.indexOf(id);
      if (selectedIndex === -1) {
        setSelected([...selected, id]);
      } else {
        setSelected(selected.filter((item) => item !== id));
      }
    },
    [selected]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows
  const emptyRows =
    page > 0 ? Math.max(0, rowsPerPage - listEmployee.length) : 0;

  useEffect(() => {
    if (emptyRows === rowsPerPage) setPage(0);
  }, [emptyRows, rowsPerPage]);

  if (loading) return <Loader />;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", my: 3 }} elevation={8}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          numSelectedArr={selected}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showCollapse={showCollapse}
          setShowCollapse={setShowCollapse}
          roles={roles}
          setRoles={setRoles}
          setLoading={setLoading}
          setSelected={setSelected}
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
            <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={listEmployee.length}
              />
              {listEmployee?.length <= rowsPerPage ? (
                <TableBody>
                  {stableSort(listEmployee, getComparator(order, orderBy)).map(
                    (row, index) => {
                      const isItemSelected = selected.indexOf(row.id) !== -1;
                      return (
                        <EmployeeItem
                          key={index}
                          index={page * rowsPerPage + (index + 1)}
                          item={row}
                          selected={isItemSelected}
                          callbackClickCheckbox={handleClickCheckbox}
                        />
                      );
                    }
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 54 * emptyRows }}>
                      <TableCell colSpan={12} />
                    </TableRow>
                  )}
                </TableBody>
              ) : (
                <TableBody>
                  {stableSort(listEmployee, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = selected.indexOf(row.id) !== -1;
                      return (
                        <EmployeeItem
                          key={index}
                          index={page * rowsPerPage + (index + 1)}
                          item={row}
                          selected={isItemSelected}
                          callbackClickCheckbox={handleClickCheckbox}
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
          count={totalEmployees}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EmployeeList;
