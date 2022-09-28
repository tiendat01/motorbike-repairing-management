import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Collapse,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PopupState from "material-ui-popup-state";
import { bindPopover, bindTrigger } from "material-ui-popup-state/hooks";
import moment from "moment";
import React, { useState } from "react";
import "./dateFilter.scss";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export const DateFilter = ({ returnStartDate, returnEndDate }) => {
  const cur = new Date();
  const ONE_DAY_MILISECOND = 24 * 60 * 60 * 1000;

  const dateRanges = [
    {
      value: "yesterday",
      label: "Hôm qua",
      range: {
        start: new Date(cur - ONE_DAY_MILISECOND * 1),
        end: new Date(cur - ONE_DAY_MILISECOND * 1),
      },
    },
    {
      value: "today",
      label: "Hôm nay",
      range: { start: cur, end: cur },
    },
    {
      value: "day_last_7",
      label: "7 ngày qua",
      range: {
        start: new Date(cur - ONE_DAY_MILISECOND * 6),
        end: cur,
      },
    },
    {
      value: "day_last_30",
      label: "30 ngày qua",
      range: {
        start: new Date(cur - ONE_DAY_MILISECOND * 29),
        end: cur,
      },
    },
    {
      value: "last_month",
      label: "Tháng trước",
      range: {
        start: new Date(cur.getFullYear(), cur.getMonth() - 1, 1),
        end: new Date(cur - ONE_DAY_MILISECOND * cur.getDate()),
      },
    },
    {
      value: "this_month",
      label: "Tháng này",
      range: {
        start: new Date(cur.getFullYear(), cur.getMonth(), 1),
        end: cur,
      },
    },
    {
      value: "last_year",
      label: "Năm ngoái",
      range: {
        start: new Date(cur.getFullYear() - 1, 1 - 1, 1),
        end: new Date(cur.getFullYear() - 1, 12 - 1, 31),
      },
    },
    {
      value: "this_year",
      label: "Năm nay",
      range: {
        start: new Date(cur.getFullYear(), 1 - 1, 1),
        end: cur,
      },
    },
  ];

  const [start, setStart] = useState(new Date(cur - ONE_DAY_MILISECOND * 29));
  const [end, setEnd] = useState(cur);
  const [rangeState, setRangeState] = useState(dateRanges[3].range); // result after click submit button
  const [displayDate, setDisplayDate] = useState(dateRanges[3].range); // after click toggle button

  const [isShow, setIsShow] = useState(true);
  const [dateValue, setDateValue] = useState("Option");

  const handleShowTrue = () => {
    setIsShow((prev) => true);
  };
  const handleShowFalse = (e, idx) => {
    setIsShow((prev) => false);
    setRangeState(dateRanges[idx].range);
    setStart(dateRanges[idx].range.start);
    setEnd(dateRanges[idx].range.end);
  };
  const handleChange = (e, newValue) => {
    if (newValue !== null) setDateValue(newValue);
  };
  const handleSubmit = (popupState) => {
    setDisplayDate(rangeState);
    returnStartDate(rangeState.start);
    returnEndDate(rangeState.end);
    popupState.close();
  };

  const dateRangePicker = (
    <Box sx={{ mt: 2, display: "flex" }}>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Ngày bắt đầu'
            inputFormat='DD/MM/YYYY'
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
              setRangeState({ start: new Date(newValue), end: new Date(end) });
            }}
            maxDate={end}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ mx: 2, pt: 2 }}>-</Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Ngày kết thúc'
            inputFormat='DD/MM/YYYY'
            value={end}
            onChange={(newValue) => {
              setEnd(newValue);
              setRangeState({
                start: new Date(start),
                end: new Date(newValue),
              });
            }}
            minDate={start}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{ ...params.inputProps, placeholder: "dd/mm/aaaa" }}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth size='small' sx={{ width: "100%", my: 3, p: 0 }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant='body1'
            sx={{
              fontWeight: "normal",
              mr: "10px",
              textAlign: "center",
              lineHeight: "40px",
            }}
          >
            Khoảng Thời Gian
          </Typography>
          <Box>
            <PopupState variant='popover' popupId='big-popover'>
              {(popupState) => (
                <div>
                  <Button
                    fullWidth
                    variant='outlined'
                    {...bindTrigger(popupState)}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      color: "#000",
                      borderColor: "#9e9e9e",
                      backgroundColor: "#fafafa",
                      height: "40px",
                      lineHeight: "40px",
                      pl: "10px !important",
                    }}
                  >
                    {moment(displayDate.start).format("DD/MM/YYYY") +
                      " - " +
                      moment(displayDate.end).format("DD/MM/YYYY")}
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Box sx={{ m: 2 }}>
                      <Box>
                        <StyledToggleButtonGroup
                          value={dateValue}
                          exclusive
                          onChange={handleChange}
                          aria-label='text alignment'
                          orientation='vertical'
                          className='custom-grid'
                        >
                          {dateRanges.map((dateRange, idx) => {
                            return (
                              <ToggleButton
                                value={dateRange.value}
                                onClick={(e) => handleShowFalse(e, idx)}
                                key={idx}
                                sx={{ textAlign: "center" }}
                                className='custom-grid-item'
                              >
                                {dateRange.label}
                              </ToggleButton>
                            );
                          })}
                          <ToggleButton
                            value={"Option"}
                            onClick={handleShowTrue}
                            sx={{ width: "100%", border: "1px solid #000" }}
                            className='custom-grid-item'
                          >
                            Tuỳ Chọn
                          </ToggleButton>
                        </StyledToggleButtonGroup>
                      </Box>

                      <Box sx={{ display: "flex" }}>
                        <Collapse in={isShow}>{dateRangePicker}</Collapse>
                      </Box>

                      <Button
                        sx={{ mt: 2, width: "100%", textAlign: "center" }}
                        variant='contained'
                        onClick={() => {
                          handleSubmit(popupState);
                        }}
                      >
                        Lọc
                      </Button>
                    </Box>
                  </Popover>
                </div>
              )}
            </PopupState>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
