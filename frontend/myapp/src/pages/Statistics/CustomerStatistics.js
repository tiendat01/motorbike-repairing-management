import { Box, Typography } from "@mui/material";
import TopCustomerTable from "./table/TopCustomerTable";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import StyledColumnChart from "./chart-template/ColumnChart";
import { DateFilter } from "./filter/DateFilter";
import { GroupBy, GroupByFilter } from "./filter/GroupByFilter";
import moment from "moment";
import { statisticsService } from "../../services/statisticsService";
import {
  listOfDateRange,
  listOfMonthRange,
} from "../../utils/dateTimeRangeList";
import StyledLineChart from "./chart-template/LineChart";

const CustomerStatistics = () => {
  const cur = new Date();
  const ONE_DAY_MILISECOND = 24 * 60 * 60 * 1000;
  const [groupBy, setGroupBy] = useState(GroupBy.DAY_FILTER);
  const [startDate, setStartDate] = useState(
    new Date(cur - ONE_DAY_MILISECOND * 29)
  );
  const [endDate, setEndDate] = useState(cur);

  const [categories, setCategories] = useState(
    listOfDateRange(startDate, endDate)
  );
  const [payload, setPayload] = useState([]);

  const returnFilterType = (filterType) => {
    setGroupBy(filterType);
  };

  const returnStartDate = (startDate) => {
    setStartDate(startDate);
  };
  const returnEndDate = (endDate) => {
    setEndDate(endDate);
  };

  const title = "Thống kê khách hàng mới theo ngày/tháng";

  useEffect(() => {
    if (groupBy === GroupBy.DAY_FILTER) {
      statisticsService
        .newCustomerByDate(
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD")
        )
        .then((response) => {
          setCategories(listOfDateRange(startDate, endDate));
          setPayload({ name: "Lượng khách mới", data: response.data });
        })
        .catch((e) => console.log(e));
    } else if (groupBy === GroupBy.MONTH_FILTER) {
      statisticsService
        .newCustomerByMonth(
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD")
        )
        .then((response) => {
          setCategories(listOfMonthRange(startDate, endDate));
          setPayload({ name: "Lượng khách mới", data: response.data });
        })
        .catch((e) => console.log(e));
    }
  }, [startDate, endDate, groupBy]);

  return (
    <Box>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant='h3'
        id='tableTitle'
        component='div'
      >
        Thống kê khách hàng đến sửa xe
      </Typography>

      <Box>
        <TopCustomerTable />
      </Box>

      <Divider sx={{ my: 3 }} variant="middle" />

      <Box>
        <Box
          fullWidth
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ mr: "40px" }}>
            <DateFilter
              returnStartDate={returnStartDate}
              returnEndDate={returnEndDate}
            />
          </Box>
          <Box>
            <GroupByFilter returnFilterType={returnFilterType} />
          </Box>
        </Box>

        <StyledLineChart title={title} categories={categories} payload={payload} />

      </Box>
    </Box>
  );
};

export default CustomerStatistics;
