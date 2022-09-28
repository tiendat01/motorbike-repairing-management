import { Checkbox, Chip, TableCell, TableRow } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { selectAllRoles, selectRole } from "../../utils/selectRole";

const EmployeeItem = (props) => {
  const { index, item, selected, callbackClickCheckbox } = props;
  const navigate = useNavigate();

  const handleNavigateToDetailPage = (event) => {
    navigate(`/manage/employees/${item.id}`);
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
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {item.name}
      </TableCell>
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {item.phone}
      </TableCell>
      <TableCell align='center' onClick={handleNavigateToDetailPage}>
        {selectAllRoles(item.roles)}
      </TableCell>
      {item.workingStatus ? (
        <TableCell align='center' onClick={handleNavigateToDetailPage}>
          <Chip label='Đi làm' color='success' style={{ width: "80px" }} />
        </TableCell>
      ) : (
        <TableCell align='center' onClick={handleNavigateToDetailPage}>
          <Chip label='Nghỉ' color='error' style={{ width: "80px" }} />
        </TableCell>
      )}
      {selectRole(item.roles) === "Thợ Sửa Chữa" ? (
        item.available ? (
          <TableCell align='center' onClick={handleNavigateToDetailPage}>
            <Chip label='Rảnh' color='success' style={{ width: "100px" }} />
          </TableCell>
        ) : (
          <TableCell align='center' onClick={handleNavigateToDetailPage}>
            <Chip
              label='Đang sửa xe'
              color='error'
              style={{ width: "100px" }}
            />
          </TableCell>
        )
      ) : (
        <TableCell
          align='center'
          onClick={handleNavigateToDetailPage}
        ></TableCell>
      )}
    </TableRow>
  );
};

export default memo(EmployeeItem);
