import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  InputAdornment,
  Paper,
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
import { startSetProduct } from "../../redux/actions/actionProduct";
import { productService } from "../../services/productService";
import { getComparator, stableSort } from "../../utils/sort";
import ProductItem from "./ProductItem";

const columns = [
  { id: "id", label: "STT", align: "center" },
  {
    id: "code",
    label: "Mã linh kiện",
    align: "center",
  },
  {
    id: "name",
    label: "Tên",
    align: "left",
  },
  {
    id: "category",
    label: "Loại danh mục",
    align: "left",
  },
  {
    id: "price",
    label: "Giá",
    align: "right",
  },
  {
    id: "quantity",
    label: "Số lượng",
    align: "right",
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
    setLoading,
    numSelectedArr,
    setSelected,
  } = props;

  const handleMultiDelete = (numSelectedArr) => {
    setLoading(true);
    productService
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

  const [confirmDialog, setConfirmDialog] = useState({
    isDelete: false,
    isOpen: false,
    title: "",
    subtitle: "",
  });

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
            Đã chọn {numSelected} linh kiện
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1" }}
            variant='h3'
            id='tableTitle'
            component='div'
          >
            Danh sách linh kiện
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title='Xóa Linh Kiện'>
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
            <Tooltip title='Lọc Linh Kiện'>
              <Button
                variant='outlined'
                color='primary'
                sx={{ mr: 2 }}
                endIcon={<FilterListIcon />}
                onClick={() => {
                  setShowCollapse(!showCollapse);
                }}
              >
                Lọc Linh Kiện
              </Button>
            </Tooltip>
            <Tooltip title='Thêm Linh Kiện'>
              <Link
                style={{ textDecoration: "none" }}
                to='/manage/products/create'
              >
                <Button
                  variant='contained'
                  color='success'
                  endIcon={<AddIcon />}
                >
                  Thêm Linh Kiện
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

const ProductList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [showCollapse, setShowCollapse] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!showCollapse && !loading) {
      productService
        .listInPage(page, rowsPerPage)
        .then(function (response) {
          dispatch(startSetProduct(response.data.listOfItems));
          setTotalProducts(response.data.totalItems);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [dispatch, page, rowsPerPage, showCollapse, loading]);

  useEffect(() => {
    if (showCollapse && !loading) {
      const searchParams = `keyword==${searchValue}`;
      productService
        .search(searchParams)
        .then(function (response) {
          dispatch(startSetProduct(response.data));
          setTotalProducts(response.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [searchValue, showCollapse, dispatch, loading]);

  const listProduct = useSelector((state) => state.product);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listProduct.map((item) => item.id);
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
    page > 0 ? Math.max(0, rowsPerPage - listProduct.length) : 0;

  useEffect(() => {
    if (emptyRows === rowsPerPage) setPage(0);
  }, [emptyRows, rowsPerPage]);

  if (loading) return <Loader />;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", my: 3 }} elevation={8}>
        <EnhancedTableToolbar
          numSelectedArr={selected}
          numSelected={selected.length}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showCollapse={showCollapse}
          setShowCollapse={setShowCollapse}
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
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={listProduct.length}
              />
              {listProduct?.length <= rowsPerPage ? (
                <TableBody>
                  {stableSort(listProduct, getComparator(order, orderBy)).map(
                    (row, index) => {
                      const isItemSelected = selected.indexOf(row.id) !== -1;
                      return (
                        <ProductItem
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
                  {stableSort(listProduct, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = selected.indexOf(row.id) !== -1;
                      return (
                        <ProductItem
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
          count={totalProducts}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ProductList;
