import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { loadMyBookList } from "@/redux/myBookSlice";
import FoxHouse from "./FoxHouse";
import BookCardReadingItem from "@/components/bookCard/BookCardReadingItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StreakCalendar from "./StreakCalendar";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import WordCloud from "./WordCloud";

const settings = (setCurrentSlide: (slideIndex: number) => void) => ({
  centerMode: true,
  centerPadding: "24px",
  slidesToShow: 1,
  infinite: true,
  speed: 500,
  arrows: true,
  beforeChange: (_current: number, next: number) => setCurrentSlide(next),
});

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { bookList = [], loading, error } = useSelector((state: RootState) => state.myBook);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleClick = () => {
    navigate("/mybook/reading");
  };

  useEffect(() => {
    dispatch(loadMyBookList({ status: "READING" }));
  }, [dispatch]);

  return (
    <div>
      <div className="mt-4">
        <FoxHouse foxId={1} level={2} foxType="BABY" foxStatus="GOOD" feedCount={8} exp={70} />

        <div className="my-[50px]">
          <div className="flex items-center justify-between my-2">
            <p className="text-black text-xl font-medium font-semibold">읽고 있는 책</p>
            <p onClick={handleClick} className="text-black text-sm font-light">
              더보기
            </p>
          </div>
          <div>
            {loading ? (
              <div className="h-[140px] flex justify-center items-center"></div>
            ) : error ? (
              <div className="h-[140px] flex justify-center items-center">ERROR: {error}</div>
            ) : (
              <Slider {...settings(setCurrentSlide)}>
                {bookList.length > 0 ? (
                  bookList.map((book, idx) => (
                    <div key={idx}>
                      <div className="mx-2">
                        <BookCardReadingItem
                          myBookId={book.myBookId}
                          thumbnail={book.thumbnail}
                          title={book.title}
                          authors={book.authors}
                          publisher={book.publisher}
                          createdDate={book.createdDate}
                          readingPage={book.readingPage}
                          totalPage={book.totalPage}
                          readingPercent={book.readingPercent}
                          isActive={idx === currentSlide}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div>현재 읽고 있는 책이 없습니다.</div>
                )}
              </Slider>
            )}
          </div>
        </div>

        <div className="my-[50px] ">
          <p className="text-black text-xl font-medium font-semibold">독서 캘린더</p>
          <div className="flex justify-center w-full">
            <StreakCalendar />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-gray-green -mx-[5.5%] pb-[70px] -mb-[100px] mt-5 rounded-t-[10px]">
        <p className="text-black text-xl font-medium font-semibold self-start m-5">통계</p>
        <div className="w-5/6 h-[240px] shadow-custom bg-white rounded-lg p-3 mb-5">
          <p className="text-black text-lg font-normal mb-2">분야별통계</p>
          <div className="flex justify-center items-center w-5/6 h-4/5 mx-auto my-auto">
            <PieChart />
          </div>
        </div>
        <div className="w-5/6 h-[240px] shadow-custom bg-white rounded-lg p-3">
          <p className="text-black text-lg font-normal">워드 클라우드</p>
          <div className="flex justify-center items-center w-5/6 h-4/5 mx-auto">
            <WordCloud />
          </div>
        </div>

        <div className="w-5/6 h-[240px] shadow-custom bg-white rounded-lg p-3 my-5">
          <p className="text-black text-lg font-normal">월간 독서 시간</p>
          <div className="flex justify-center">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
