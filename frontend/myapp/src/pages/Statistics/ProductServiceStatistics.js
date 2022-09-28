import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { statisticsService } from "../../services/statisticsService";
import StyledBarChart from "./chart-template/BarChart";
import { DateFilter } from "./filter/DateFilter";
import { GroupByTop, Top } from "./filter/GroupByTop";
import CombineTable from "./table/ProductServiceTable";

const callProductAPI = (startDate, endDate, top) => {
  return statisticsService.topProduct(
    moment(startDate).format("YYYY-MM-DD"),
    moment(endDate).format("YYYY-MM-DD"),
    top
  );
};

const callServiceAPI = (startDate, endDate, top) => {
  return statisticsService.topService(
    moment(startDate).format("YYYY-MM-DD"),
    moment(endDate).format("YYYY-MM-DD"),
    top
  );
};

const ProductServiceStatistics = () => {
  const cur = new Date();
  const ONE_DAY_MILISECOND = 24 * 60 * 60 * 1000;
  const [top, setTop] = useState(Top.TOP_10);
  const [startDate, setStartDate] = useState(
    new Date(cur - ONE_DAY_MILISECOND * 29)
  );
  const [endDate, setEndDate] = useState(cur);

  const [categoriesProduct, setCategoriesProduct] = useState([]);
  const [payloadProduct, setPayloadProduct] = useState([]);

  const [categoriesService, setCategoriesService] = useState([]);
  const [payloadService, setPayloadService] = useState([]);

  const returnFilterTop = (top) => {
    setTop(top);
  };
  const returnStartDate = (startDate) => {
    setStartDate(startDate);
  };
  const returnEndDate = (endDate) => {
    setEndDate(endDate);
  };

  useEffect(() => {
    let resultProduct = null,
      resultService = null;
    if (top === Top.TOP_10) {
      resultProduct = callProductAPI(startDate, endDate, 10);
      resultService = callServiceAPI(startDate, endDate, 10);
    } else if (top === Top.TOP_3) {
      resultProduct = callProductAPI(startDate, endDate, 3);
      resultService = callServiceAPI(startDate, endDate, 3);
    } else if (top === Top.TOP_30) {
      resultProduct = callProductAPI(startDate, endDate, 50);
      resultService = callServiceAPI(startDate, endDate, 50);
    }

    resultProduct
      .then((response) => {
        let listName = response.data.map((obj) => obj.productName);
        setCategoriesProduct(listName);
        let listQuantity = response.data.map((obj) => obj.usedQuantity);
        setPayloadProduct({
          name: "Số lượng linh kiện đã dùng",
          data: listQuantity,
        });
      })
      .catch((e) => console.log(e));

    resultService
      .then((response) => {
        let listName = response.data.map((obj) => obj.serviceName);
        setCategoriesService(listName);
        let listFrequency = response.data.map((obj) => obj.usedFrequency);
        setPayloadService({
          name: "Phiếu sửa chữa sử dụng dịch vụ",
          data: listFrequency,
        });
      })
      .catch((e) => console.log(e));
  }, [startDate, endDate, top]);

  return (
    <Box>
      <Typography
        sx={{ flex: "1 1 100%", }}
        variant="h3"
        id="tableTitle"
        component="div"
      >
        Thống kê linh kiện sản phẩm dịch vụ
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
      <Box sx={{ mt: 3 }}>
        <StyledBarChart
          isClean={false}
          title='Thống kê sản phẩm linh kiện'
          yAxis='Linh kiện (số lượng)'
          unit=' cái/chiếc/hộp'
          categories={categoriesProduct}
          payload={payloadProduct}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <StyledBarChart
          isClean={false}
          title='Thống kê dịch vụ sử dụng'
          yAxis='Dịch vụ (số phiếu sử dụng)'
          unit=' phiếu'
          categories={categoriesService}
          payload={payloadService}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <CombineTable startDateParam={startDate} endDateParam={endDate} />
      </Box>
    </Box>
  );
};

export default ProductServiceStatistics;
