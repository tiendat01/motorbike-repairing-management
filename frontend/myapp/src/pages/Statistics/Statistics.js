import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { MenuItem, Select, Typography, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledColumnChart from "./chart-template/ColumnChart";
import moment from "moment";
import { statisticsService } from "../../services/statisticsService";
import { listOfDateRange } from "../../utils/dateTimeRangeList";
import currencyFormat from "../../utils/currencyFormat";
import { useEffect } from "react";
import { useState } from "react";
import StyledBarChart from "./chart-template/BarChart";
import { ticketService } from "../../services/ticketService";

const MyPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Statistics = () => {
  const ONE_DAY_MILISECOND = 24 * 60 * 60 * 1000;
  const choices = [
    {
      value: "by_time",
      label: "Báo cáo doanh thu theo thời gian",
      link: "/manage/statistics/revenue",
    },
  ];

  const navigate = useNavigate();
  const [choice, setChoice] = React.useState("");

  const endDate = new Date();
  const startDate = new Date(endDate - ONE_DAY_MILISECOND * 6);
  const searchParams = `date>=${moment(startDate).format(
    "YYYY-MM-DD"
  )};date<=${moment(endDate).format("YYYY-MM-DD")};status==${4}`;

  const categories = listOfDateRange(startDate, endDate);
  const [payload, setPayload] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const [categoriesMechanic, setCategoriesMechanic] = useState([]);
  const [payloadMechanic, setPayloadMechanic] = useState([]);

  const [totalTickets, setTotalTickets] = useState(0);

  useEffect(() => {
    statisticsService
      .revenueByDay(
        moment(startDate).format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD")
      )
      .then((response) => {
        setPayload({ name: "Doanh thu", data: response.data });
        setTotalPrice(
          response.data.reduce((partialSum, a) => partialSum + a, 0)
        );
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    statisticsService
      .topMechanicByDateRange(
        moment(startDate).format("YYYY-MM-DD"),
        moment(endDate).format("YYYY-MM-DD"),
        5
      )
      .then((response) => {
        setCategoriesMechanic(
          response.data.slice(0, 3).map((obj) => obj.mechanicName)
        );
        setPayloadMechanic({
          name: "Phiếu sửa chữa",
          data: response.data.slice(0, 3).map((obj) => obj.numTickets),
        });
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    ticketService
    .searchInPage(searchParams,1,1)
    .then(response => {
      setTotalTickets(response.data.totalItems);
    })
    .catch(e => console.log(e));
  }, []);

  const handleChange = (e) => {
    setChoice(e.target.value);
  };
  const handleClickChoice = (e, idx) => {
    navigate(choices[idx].link);
  };

  const handleClickMechanic = (e) => {
    navigate("/manage/statistics/ticket_mechanic");
  };
  const handleClickProductService = (e) => {
    navigate("/manage/statistics/product_service");
  };
  const handleClickCustomer = (e) => {
    navigate("/manage/statistics/customer");
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", textAlign: "left", mb: 2 }}>
        <Typography sx={{ flex: "1 1 100%" }} variant="h3" component="div">
          Báo cáo thống kê của cửa hàng
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MyPaper>
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    Doanh thu sửa chữa
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h4" component="div">
                    {currencyFormat(totalPrice)}
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                7 ngày qua
              </Typography>
            </Box>
            <Divider variant="middle" sx={{my: 2}} />

            <Box>
              <StyledColumnChart
                isClean={true}
                title={""}
                categories={categories}
                payload={payload}
              />
            </Box>

            <Box>
              <FormControl fullWidth>
                <Select
                  value={choice}
                  onChange={handleChange}
                  sx={{ my: 1 }}
                  displayEmpty
                  renderValue={(value) => value === "" && "Chọn loại báo cáo"}
                >
                  {choices.map((choice, idx) => {
                    return (
                      <MenuItem
                        value={choice.value}
                        onClick={(e) => handleClickChoice(e, idx)}
                      >
                        {choice.label}
                      </MenuItem>
                    );
                  })}
                  <MenuItem disabled value="Deadlock">
                    Đang hoàn thiện thêm các bộ lọc...
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </MyPaper>
        </Grid>

        <Grid item xs={6}>
          <MyPaper>
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    Phiếu sửa chữa theo thợ
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h4" component="div" sx={{color: "#0089FF",}}>
                    {totalTickets}
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                7 ngày qua
              </Typography>
            </Box>
            <Divider variant="middle" sx={{my: 2}} />
            <Box>
              {categoriesMechanic.length && (
                <StyledBarChart
                  isClean={true}
                  title={""}
                  categories={categoriesMechanic}
                  payload={payloadMechanic}
                />
              )}
            </Box>
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
              <Button fullWidth variant="contained" onClick={handleClickMechanic}>Chi tiết</Button>
            </Box>
          </MyPaper>
        </Grid>

        <Grid item xs={4}>
            <MyPaper>
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    Thống kê linh kiện, dịch vụ đã dùng
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Theo thời gian, tần suất sử dụng
              </Typography>
            </Box>
            <Divider variant="middle" />
            
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
              <Button fullWidth variant="contained" onClick={handleClickProductService}>Chi tiết</Button>
            </Box>
            </MyPaper>
        </Grid>

        <Grid item xs={4}>
        <MyPaper>
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    Thống kê khách hàng
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Khách hàng tiềm năng, khách hàng mới
              </Typography>
            </Box>
            <Divider variant="middle" />
            
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
              <Button fullWidth variant="contained" onClick={handleClickCustomer}>Chi tiết</Button>
            </Box>
            </MyPaper>
        </Grid>

        <Grid item xs={4}>
        <MyPaper>
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    Thống kê phương tiện đến sửa
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Theo thời gian
              </Typography>
            </Box>
            <Divider variant="middle" />
            
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
              <Button fullWidth variant="contained" onClick={handleClickProductService} disabled>Tính năng đang hoàn thiện</Button>
            </Box>
            </MyPaper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Statistics;
