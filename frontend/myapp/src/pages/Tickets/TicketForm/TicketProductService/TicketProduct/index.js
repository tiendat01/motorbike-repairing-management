import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTicketProduct } from "../../../../../redux/actions/actionTicket";
import {
  removeProductInTicket,
  startSetProductInTicket,
  updateProductQuantityInTicket,
} from "../../../../../redux/actions/actionTicketProduct";
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
          Phụ tùng & Linh kiện
        </Typography>
      </TableCell>
      <TableCell colSpan={5} align='right'>
        <SearchBar type='PRODUCT' />
      </TableCell>
    </TableRow>
  );
};

const TicketProduct = ({ existDataProduct, setTotalProduct }) => {
  const dispatch = useDispatch();
  const listSelectedProduct = useSelector((state) => state.ticketProduct);
  const totalCost = listSelectedProduct?.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    setTotalProduct(totalCost);
  }, [totalCost, setTotalProduct]);

  useEffect(() => {
    if (existDataProduct) {
      const selectedProducts = existDataProduct.map((item) => {
        return {
          id: item?.product?.id,
          code: item?.product?.code,
          name: item?.product?.name,
          image: item?.product?.image,
          price: item?.stockPrice,
          quantity: item?.quantity,
          quantityInInventory: item?.product?.quantity,
          category: item?.product?.category,
        };
      });
      dispatch(startSetProductInTicket(selectedProducts));
    }
  }, [dispatch, existDataProduct]);

  useEffect(() => {
    dispatch(
      addTicketProduct(
        listSelectedProduct.map((item) => {
          return { productId: item.id, quantity: item.quantity };
        })
      )
    );
  }, [dispatch, listSelectedProduct]);

  const emptyRows =
    listSelectedProduct.length < 3
      ? Math.max(0, 3 - listSelectedProduct.length)
      : 0;

  return (
    <>
      <TableBody>
        <EnhancedTableToolbar />
        {listSelectedProduct.map((item, index) => {
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
              <TableCell align='center'>
                <Box display='flex' justifyContent='center'>
                  <IconButton
                    size='small'
                    onClick={() => {
                      if (item.quantity > 1) {
                        dispatch(
                          updateProductQuantityInTicket(
                            item.id,
                            item.quantity - 1
                          )
                        );
                      }
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Box display='flex' alignItems='center' sx={{ p: 1 }}>
                    {item.quantity}
                  </Box>
                  <IconButton
                    size='small'
                    onClick={() => {
                      if (item.quantity < item.quantityInInventory) {
                        dispatch(
                          updateProductQuantityInTicket(
                            item.id,
                            item.quantity + 1
                          )
                        );
                      } else {
                        toast.warning("Quá số lượng còn trong kho");
                      }
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align='right'>
                {currencyFormat(item.price * item.quantity)}
              </TableCell>
              <TableCell align='center'>
                <IconButton
                  size='small'
                  onClick={() => {
                    dispatch(removeProductInTicket(item.id));
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
            <Typography variant='h5'>Tổng tiền linh kiện</Typography>
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

export default memo(TicketProduct);
