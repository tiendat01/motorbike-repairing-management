import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";

const DAY_FILTER = "day";
const MONTH_FILTER = "month";

export const GroupByFilter = ({ returnFilterType }) => {
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
            Nhóm theo
          </Typography>
          <Box>
            <Select
              sx={{ width: "150px", textAlign: "left" }}
              id='select-group-by'
              defaultValue={DAY_FILTER}
              onChange={(e) => returnFilterType(e.target.value)}
            >
              <MenuItem value={DAY_FILTER}>Ngày</MenuItem>
              <MenuItem value={MONTH_FILTER}>Tháng</MenuItem>
            </Select>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};

export const GroupBy = {
  DAY_FILTER,
  MONTH_FILTER,
};
