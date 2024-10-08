import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadWordCloud } from "@/redux/userSlice.ts";

const WordCloud: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isWordCloudLoading, wordCloudImageUrl } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(loadWordCloud());
  }, []);

  return (
    <div className="h-full w-full">
      {isWordCloudLoading ? (
        <img src="/images/loading.gif" alt="로딩 중..." className="h-[100px] w-[100px]" />
      ) : (
        <img
          src={wordCloudImageUrl}
          alt="워드클라우드"
          className="w-full h-full m-auto object-contain"
        />
      )}
    </div>
  );
};

export default WordCloud;
