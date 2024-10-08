import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { loadTimerList } from "@/redux/timerSlice";
import { AppDispatch, RootState } from "@/redux/store.ts";

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
      show: true, // Y축에 값이 표시되도록 활성화
      formatter: (value: number) => {
        return `${value} 시간`; // 소수점 2자리까지 표시
      },
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
        return `${val.toFixed(2)} 시간`;
      },
    },
  },
};

const BarChart: React.FC = () => {
  const [series, setSeries] = useState([{ name: "독서시간", data: [] as number[] }]);
  const [options] = useState<ApexOptions>(initialOptions);
  const dispatch: AppDispatch = useDispatch();

  const { data } = useSelector((state: RootState) => state.timer);

  useEffect(() => {
    dispatch(loadTimerList());
  }, [dispatch]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const chartData = data.map(item => {
        const [hours, minutes] = item.readingTime.split(":").map(Number);
        return hours + minutes / 60;
      });
      setSeries([{ name: "독서시간", data: chartData }]);
    }
  }, [data]);

  const screenWidth = window.innerWidth;
  const chartWidth = screenWidth * 0.77;

  return (
    <div className="flex justify-center w-full h-full">
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          width={chartWidth}
          height={200}
        />
      </div>
    </div>
  );
};

export default BarChart;
