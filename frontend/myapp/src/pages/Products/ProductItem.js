import { Checkbox, TableCell, TableRow } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import currencyFormat from "../../utils/currencyFormat";

const ProductItem = (props) => {
  const { index, item, selected, callbackClickCheckbox } = props;
  const navigate = useNavigate();
  const handleNavigateToDetailPage = () => {
    navigate(`/manage/products/${item.id}`);
  };

  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      role='checkbox'
      checked={selected}
      tabIndex={-1}
      key={item.id}
      selected={selected}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          color='primary'
          checked={selected}
          onClick={(event) => {
            callbackClickCheckbox(event, item.id);
          }}
        />
      </TableCell>
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {index}
      </TableCell>
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {item.code}
      </TableCell>
      <TableCell align='left' onClick={handleNavigateToDetailPage}>
        {item.name}
      </TableCell>
      <TableCell align='left' onClick={handleNavigateToDetailPage}>
        {item.category.name}
      </TableCell>
      <TableCell align='right' onClick={handleNavigateToDetailPage}>
        {currencyFormat(item.price)}
      </TableCell>
      <TableCell align='right' onClick={handleNavigateToDetailPage}>
        {item.quantity}
      </TableCell>
    </TableRow>
  );
};

export default memo(ProductItem);
