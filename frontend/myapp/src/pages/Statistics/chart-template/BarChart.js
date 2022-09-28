import styled from "@emotion/styled";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const BarChart = ({
  className,
  isClean,
  title,
  yAxis,
  unit,
  categories,
  payload: { name, data },
}) => {
  const options = {
    chart: {
      type: "bar",
    },
    title: {
      text: title, // "Top các nhân viên sửa chữa theo đơn"
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      className: "x-axis",
      categories: categories,
      title: {
        text: null,
      },
    },
    yAxis: {
      className: "y-axis",
      min: 0,
      title: {
        text: yAxis, // props
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
      gridLineColor: isClean ? "#ffffff" : "#e6e6e6",
    },
    tooltip: {
      valueSuffix: unit,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: name,
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

const StyledBarChart = styled(BarChart)`
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

export default StyledBarChart;
