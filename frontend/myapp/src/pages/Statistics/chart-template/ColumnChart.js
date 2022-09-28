import styled from "@emotion/styled";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const ColumnChart = ({
  className, // to apply css styling
  isClean, // to specify whether to hide gridLineColor (vach chia)
  title,
  categories,
  payload: { name, data },
}) => {
  const options = {
    chart: {
      type: "column",
      marginRight: 10,
    },
    title: {
      text: title, // "Báo cáo thống kê doanh thu"
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      className: "x-axis",
      categories: categories, // array of strings
      crosshair: true,
    },
    yAxis: {
      className: "y-axis",
      title: {
        useHTML: true,
        text: "Tổng tiền",
      },
      gridLineColor: isClean ? "#ffffff" : "#e6e6e6",
    },
    tooltip: {
      headerFormat: '<span style="font-size: 10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color: {series.color}; padding: 0">{series.name}: </td>' +
        '<td style="padding: 0"><b>{point.y: .1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: name, // "Doanh thu"
        data: data, // array of numbers
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: className }} // need for CSS styling
      />
    </>
  );
};

const StyledColumnChart = styled(ColumnChart)`
  .highcharts-title {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    fill: red;
    font-weight: bold;
    font-size: 3em;
  }

  .highcharts-subtitle {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-style: italic;
    fill: #7cb5ec;
  }

  .highcharts-axis-title {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
  }

  .x-axis text {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }

  .y-axis text {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
`;

export default StyledColumnChart;
