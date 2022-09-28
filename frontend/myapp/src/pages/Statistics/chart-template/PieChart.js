import styled from "@emotion/styled";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const PieChart = ({ className, title, data }) => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: title,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage: .1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: ["#7ded90", "#95ceff", "#615c5c"], // now is fixed with 3, should be passed as props
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage: .1f} %",
        },
      },
    },
    series: [
      {
        name: "Trạng thái",
        colorByPoint: true,
        data: data,
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: className }}
      />
    </>
  );
};

const StyledPieChart = styled(PieChart)`
  .highcharts-title {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    fill: red;
    font-weight: bold;
    font-size: 3em;
  }
`;

export default StyledPieChart;
