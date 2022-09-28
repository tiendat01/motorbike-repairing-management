import axios from "axios";
import { menuAPI } from "../constants/const";
import { GroupBy } from "../pages/Statistics/filter/GroupByFilter";

const token = JSON.parse(localStorage.getItem("user"))?.token;
const config = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const statisticsService = {
  revenueByDay: function (startDate, endDate) {
    return axios.get(
      `${menuAPI.statistics}/revenue/${GroupBy.DAY_FILTER}?startDate=${startDate}&endDate=${endDate}`,
      config
    );
  },
  revenueByMonth: function (startDate, endDate) {
    return axios.get(
      `${menuAPI.statistics}/revenue/${GroupBy.MONTH_FILTER}?startDate=${startDate}&endDate=${endDate}`,
      config
    );
  },
  topMechanicByDateRange: function (startDate, endDate, top) {
    return axios.get(
      `${menuAPI.statistics}/mechanic/top?startDate=${startDate}&endDate=${endDate}&top=${top}`,
      config
    );
  },
  calTicketMechanic: function(startDate, endDate) {
    return axios.get(
      `${menuAPI.statistics}/mechanic/tickets?startDate=${startDate}&endDate=${endDate}`,
      config);
  },
  topProduct: function(startDate, endDate, top) {
    return axios.get(
      `${menuAPI.statistics}/product/used?startDate=${startDate}&endDate=${endDate}&top=${top}`,
      config);
  },
  topService: function(startDate, endDate, top) {
    return axios.get(
      `${menuAPI.statistics}/service/used?startDate=${startDate}&endDate=${endDate}&top=${top}`,
      config);
  },


  topCustomer: function(top) {
    return axios.get(
      `${menuAPI.statistics}/customer/top?top=${top}`,
      config);
  },
  newCustomerByDate: function(startDate, endDate) {
    return axios.get(
      `${menuAPI.statistics}/customer/new/day?startDate=${startDate}&endDate=${endDate}`,
      config);
  },
  newCustomerByMonth: function(startDate, endDate) {
    return axios.get(
      `${menuAPI.statistics}/customer/new/month?startDate=${startDate}&endDate=${endDate}`,
      config);
  },
};
