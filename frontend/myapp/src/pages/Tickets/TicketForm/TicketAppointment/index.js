import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTicketAppointmentDate } from "../../../../redux/actions/actionTicket";
import { formatDateTime } from "../../../../utils/getCurrentDate";

const TicketAppointment = ({ existData }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");

  useEffect(() => {
    if (existData) {
      const dateFormat = formatDateTime(existData);
      setDate(dateFormat);
      dispatch(addTicketAppointmentDate(dateFormat));
    }
  }, [existData, dispatch]);

  return (
    <FormControl fullWidth size='small'>
      <TextField
        id='datetime-local'
        label='Ngày hẹn'
        type='datetime-local'
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          dispatch(addTicketAppointmentDate(e.target.value));
        }}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          style: {
            paddingTop: "10px",
            paddingBottom: "10px",
          },
        }}
      />
    </FormControl>
  );
};

export default memo(TicketAppointment);
