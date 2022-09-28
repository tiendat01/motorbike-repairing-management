import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTicketEmployee } from "../../../../redux/actions/actionTicket";
import { employeeService } from "../../../../services/employeeService";

const TicketEmployee = ({ existData }) => {
  const [mechanicEmployeeList, setMechanicEmployeeList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (existData) {
      dispatch(addTicketEmployee(existData.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    if (e.target.value === "") {
      dispatch(addTicketEmployee(existData?.id));
    } else if (e.target.value === -1) {
      dispatch(addTicketEmployee(null));
    } else dispatch(addTicketEmployee(e.target.value));
  };

  useEffect(() => {
    employeeService
      .search("available==true;role:mechanic")
      .then(function (response) {
        setMechanicEmployeeList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth size='small'>
        <InputLabel shrink={true} id='select-employee'>
          Nhân viên sửa chữa
        </InputLabel>
        {existData ? (
          <Select
            labelId='select-employee'
            id='select-employee'
            defaultValue=''
            displayEmpty
            notched={true}
            label='Nhân viên sửa chữa'
            onChange={handleChange}
          >
            <MenuItem value={-1}>
              <em>Chọn nhân viên sửa chữa</em>
            </MenuItem>
            <MenuItem value=''>
              <em>{`${existData.code} - ${existData.name}`}</em>
            </MenuItem>
            {mechanicEmployeeList.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {`${item.code} - ${item.name}`}
                </MenuItem>
              );
            })}
          </Select>
        ) : (
          <Select
            labelId='select-employee'
            id='select-employee'
            defaultValue=''
            displayEmpty
            notched={true}
            label='Nhân Viên Sửa Chữa'
            onChange={handleChange}
          >
            <MenuItem value=''>
              <em>Chọn nhân viên sửa chữa</em>
            </MenuItem>
            {mechanicEmployeeList.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {`${item.code} - ${item.name}`}
                </MenuItem>
              );
            })}
          </Select>
        )}
      </FormControl>
    </Box>
  );
};

export default memo(TicketEmployee);
