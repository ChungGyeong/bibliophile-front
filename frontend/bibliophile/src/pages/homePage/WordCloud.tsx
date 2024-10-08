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
    <div>
      {isWordCloudLoading ? (
        <img src="/images/loading.gif" alt="로딩 중..." />
      ) : (
        <img src={wordCloudImageUrl} alt="워드클라우드" className="w-full h-full" />
      )}
    </div>
  );
};

export default WordCloud;
