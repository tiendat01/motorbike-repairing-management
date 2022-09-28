import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";

const TOP_3 = "3";
const TOP_10 = "10";
const TOP_30 = "30";

export const Top = {
  TOP_3,
  TOP_10,
  TOP_30,
};

export const GroupByTop = ({ returnFilterTop }) => {
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
            Top
          </Typography>
          <Box>
            <Select
              sx={{ width: "80px", textAlign: "left" }}
              id='select-group-by'
              defaultValue={TOP_10}
              onChange={(e) => returnFilterTop(e.target.value)}
            >
              <MenuItem value={TOP_3}>3</MenuItem>
              <MenuItem value={TOP_10}>10</MenuItem>
              <MenuItem value={TOP_30}>30</MenuItem>
            </Select>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
