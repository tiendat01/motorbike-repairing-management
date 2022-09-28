import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "@emotion/styled";

const LineChart = ({
  className, // to apply css styling
  title,
  categories,
  payload: { name, data },
}) => {
  const options = {
    title: {
      text: title,
    },

    subtitle: {
      text: 'Theo khoảng thời gian',
    },

    yAxis: {
      className: "y-axis",
      title: {
        text: "Số lượng khách mới",
      },
    },

    xAxis: {
      className: "x-axis",
      accessibility: {
        rangeDescription: "Khoảng thời gian",
      },
      categories: categories,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    // plotOptions: {
    //   series: {
    //     label: {
    //       connectorAllowed: false,
    //     },
    //     pointStart: 2010,
    //   },
    // },
    credits: {
      enabled: false,
    },

    series: [
      {
        name: name,
        data: data,
      },
      
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
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

const StyledLineChart = styled(LineChart)`
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

export default StyledLineChart;
