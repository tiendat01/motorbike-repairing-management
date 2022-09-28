import moment from "moment";

const listOfDateRange = (start, end) => {
  let loop = new Date(start);
  let endDate = new Date(end);
  let dateRange = [];

  while (loop <= endDate) {
    dateRange.push(moment(loop).format("DD/MM"));
    loop = new Date(loop.setDate(loop.getDate() + 1));
  }
  return dateRange;
};

const listOfMonthRange = (start, end) => {
  let monthRange = [];
  let loop = new Date(start);
  loop.setDate(1);
  let endDate = new Date(end.getFullYear(), end.getMonth() + 1, 0);
  while (loop <= endDate) {
    monthRange.push(moment(loop).format("MM/YYYY"));
    loop.setMonth(loop.getMonth() + 1);
  }
  return monthRange;
};

export { listOfDateRange, listOfMonthRange };
