import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import StyledColumnChart from "./chart-template/ColumnChart";
import { DateFilter } from "./filter/DateFilter";
import { GroupBy, GroupByFilter } from "./filter/GroupByFilter";
import moment from "moment";
import { statisticsService } from "../../services/statisticsService";
import { listOfDateRange, listOfMonthRange } from "../../utils/dateTimeRangeList";
import RevenueTable from "./table/RevenueTable";


const RevenueStatistics = () => {
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

  const title = "Báo cáo thống kê doanh thu";

  useEffect(() => {
    if (groupBy === GroupBy.DAY_FILTER) {
      statisticsService
        .revenueByDay(
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD")
        )
        .then((response) => {
          setCategories(listOfDateRange(startDate, endDate));
          setPayload({ name: "Doanh thu", data: response.data });
        })
        .catch((e) => console.log(e));
    } else if (groupBy === GroupBy.MONTH_FILTER) {
      statisticsService
        .revenueByMonth(
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD")
        )
        .then((response) => {
          setCategories(listOfMonthRange(startDate, endDate));
          setPayload({ name: "Doanh thu", data: response.data });
        })
        .catch((e) => console.log(e));
    }
  }, [startDate, endDate, groupBy]);

  return (
    <>
    <Typography
        sx={{ flex: "1 1 100%", }}
        variant='h3'
        id='tableTitle'
        component='div'
      >
        Thông tin doanh thu
      </Typography>
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
      <Box>
        <StyledColumnChart
          isClean={false}
          title={title}
          categories={categories}
          payload={payload}
        />
      </Box>
      <Box>
        <RevenueTable startDate={startDate} endDate={endDate} />
      </Box>
    </>
  );
};

export default RevenueStatistics;
