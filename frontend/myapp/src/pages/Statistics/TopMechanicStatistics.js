import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { DateFilter } from "./filter/DateFilter";
import moment from "moment";
import { statisticsService } from "../../services/statisticsService";
import StyledBarChart from "./chart-template/BarChart";
import { GroupByTop, Top } from "./filter/GroupByTop";
import TopMechanicTable from "./table/TopMechanicTable";

const callAPIMechanic = (startDate, endDate, top) => {
  return statisticsService.topMechanicByDateRange(
    moment(startDate).format("YYYY-MM-DD"),
    moment(endDate).format("YYYY-MM-DD"),
    top
  );
};

const TopMechanicStatistics = () => {
  const cur = new Date();
  const ONE_DAY_MILISECOND = 24 * 60 * 60 * 1000;
  const [top, setTop] = useState(Top.TOP_10);
  const [startDate, setStartDate] = useState(
    new Date(cur - ONE_DAY_MILISECOND * 29)
  );
  const [endDate, setEndDate] = useState(cur);

  const [categories, setCategories] = useState([]);
  const [payload, setPayload] = useState([]);

  const returnFilterTop = (top) => {
    setTop(top);
  };
  const returnStartDate = (startDate) => {
    setStartDate(startDate);
  };
  const returnEndDate = (endDate) => {
    setEndDate(endDate);
  };

  const title = "Thống kê thợ sửa có số phiếu sửa chữa hoàn thành nhiều nhất";

  useEffect(() => {
    let resultMechanic = null;
    if (top === Top.TOP_10) {
      resultMechanic = callAPIMechanic(startDate, endDate, 10);
    } else if (top === Top.TOP_3) {
      resultMechanic = callAPIMechanic(startDate, endDate, 3);
    } else if (top === Top.TOP_30) {
      resultMechanic = callAPIMechanic(startDate, endDate, 30);
    }

    resultMechanic
      .then((response) => {
        let listMechanicName = response.data.map((obj) => obj.mechanicName);
        setCategories(listMechanicName);
        let listNumTickets = response.data.map((obj) => obj.numTickets);
        setPayload({ name: "Số lượng phiếu sửa chữa", data: listNumTickets });
      })
      .catch((e) => console.log(e));
  }, [startDate, endDate, top]);

  return (
    <Box>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h3"
        id="tableTitle"
        component="div"
      >
        Thống kê phiếu sửa chữa
      </Typography>
      <Box
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
          <GroupByTop returnFilterTop={returnFilterTop} />
        </Box>
      </Box>
      <Box>
        <StyledBarChart
          isClean={false}
          title={title}
          yAxis="Phiếu sửa chữa hoàn thành (phiếu)"
          unit=" phiếu"
          categories={categories}
          payload={payload}
        />
      </Box>
      <Box>
        <TopMechanicTable startDate={startDate} endDate={endDate} />
      </Box>
    </Box>
  );
};

export default TopMechanicStatistics;
