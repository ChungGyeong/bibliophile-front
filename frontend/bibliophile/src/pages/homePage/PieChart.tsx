import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { loadMyBookStatistics } from "@/redux/myBookStatisticsSlice";
import loadingGif from "/public/images/loading.gif";

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
        show: boolean;
        fontSize: string;
        position: string;
      };
    };
  }[];
  dataLabels: {
    enabled: boolean;
    dropShadow: {
      enabled: boolean;
    };
    style: {
      fontSize: string;
      fontFamily: string;
      color: string;
      fontWeight: number;
      textShadow: string;
    };
  };
  plotOptions: {
    pie: {
      dataLabels: {
        offset: number;
        style: {
          fontSize: string;
          fontWeight: number;
          textShadow: string;
        };
      };
    };
  };
};

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
          width: 300,
        },
        legend: {
          show: true,
          fontSize: "12px",
          position: "right",
        },
      },
    },
  ],
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
    style: {
      fontSize: "8px",
      fontFamily: "Pretendard",
      color: "#000",
      fontWeight: 200,
      textShadow: "none",
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -7,
        style: {
          fontSize: "10px",
          fontWeight: 400,
          textShadow: "none",
        },
      },
    },
  },
};

const PieChart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { statisticList, loading, error } = useSelector(
    (state: RootState) => state.myBookStatistics
  );
  const [series, setSeries] = useState<number[]>([]);
  const [options, setOptions] = useState<ChartOptions>(initialOptions);

  useEffect(() => {
    dispatch(loadMyBookStatistics());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !error && statisticList.length > 0) {
      const sortedData = [...statisticList].sort((a, b) => b.count - a.count);
      const topFiveData = sortedData.slice(0, 5);

      const newSeries = topFiveData.map(item => item.count);
      const newLabels = topFiveData.map(item => {
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
    }
  }, [statisticList, loading, error]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  if (series.length === 0) {
    return <div>읽은 책이 없어 통계를 낼 수 없습니다.</div>;
  }

  return (
    <div className="flex justify-center w-full h-full">
      <div>
        <ReactApexChart options={options} series={series} type="pie" width={300} />
      </div>
    </div>
  );
};

export default PieChart;
