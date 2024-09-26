import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const initialSeries = [
  {
    name: "독서시간",
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
  },
];

const initialOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: "top",
      },
    },
  },
  colors: ["#FFA644"],
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    position: "bottom",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  title: {
    text: "제목",
    floating: true,
    offsetY: 300,
    align: "center",
    style: {
      color: "#444",
    },
  },
  tooltip: {
    enabled: true,
    shared: false,
    followCursor: true,
    intersect: false,
    x: {
      show: true,
      format: "dd MMM",
      formatter: function (val: number | undefined) {
        if (val === undefined) return "";
        return `${val}월`;
      },
    },
    y: {
      formatter: function (val: number | undefined) {
        if (val === undefined) return "";
        return `${val}시간`;
      },
    },
  },
};

interface BarChartProps {}

const BarChart: React.FC<BarChartProps> = () => {
  const [series] = React.useState(initialSeries);
  const [options] = React.useState<ApexOptions>(initialOptions);

  return (
    <div className="flex justify-center w-full h-full">
      <div>
        <ReactApexChart options={options} series={series} type="bar" width={310} height={200} />
      </div>
    </div>
  );
};

export default BarChart;
