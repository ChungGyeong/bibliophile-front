import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

type ChartOptions = {
  chart: {
    width: number;
    type: "pie";
  };
  labels: string[];
  responsive: {
    breakpoint: number;
    options: {
      chart: {
        width: number;
      };
      legend: {
        position: string;
      };
    };
  }[];
  dataLabels: {
    enabled: boolean;
    style: {
      fontSize: string;
      fontFamily: string;
      color: string;
      fontWeight: number;
    };
  };
};

const data = [
  { kdc: "0", count: 3 },
  { kdc: "1", count: 3 },
  { kdc: "2", count: 2 },
  { kdc: "3", count: 4 },
  { kdc: "4", count: 5 },
  { kdc: "5", count: 2 },
  { kdc: "6", count: 3 },
  { kdc: "7", count: 1 },
  { kdc: "8", count: 2 },
];

const initialOptions: ChartOptions = {
  chart: {
    width: 380,
    type: "pie",
  },
  labels: [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 290,
        },
        legend: {
          position: "right",
        },
      },
    },
  ],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: "8px",
      fontFamily: "Pretendard",
      color: "#000",
      fontWeight: 300,
    },
  },
};

const PieChart: React.FC = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [options, setOptions] = useState<ChartOptions>(initialOptions);

  useEffect(() => {
    const newSeries = data.map(item => item.count);
    const newLabels = data.map(item => {
      switch (item.kdc) {
        case "0":
          return "총류";
        case "1":
          return "철학";
        case "2":
          return "종교";
        case "3":
          return "사회과학";
        case "4":
          return "자연과학";
        case "5":
          return "기술과학";
        case "6":
          return "예술";
        case "7":
          return "언어";
        case "8":
          return "문학";
        case "9":
          return "역사";
        default:
          return `기타`;
      }
    });

    setSeries(newSeries);
    setOptions(prevOptions => ({
      ...prevOptions,
      labels: newLabels,
    }));
  }, []);

  return (
    <div className="w-full h-full">
      <div>
        <ReactApexChart options={options} series={series} type="pie" width={300} />
      </div>
    </div>
  );
};

export default PieChart;
