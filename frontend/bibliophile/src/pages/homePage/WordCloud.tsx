import React from "react";

const imgUrl =
  "https://mblogthumb-phinf.pstatic.net/MjAyMzAxMTdfNTQg/MDAxNjczOTQzMTMwNDM2.vQlkvsO8DwGR2BtaeVD7egtI0XaMIS9fyUEREOqMTAQg.4ogUAiGBPcolE6lu1UjSckUOTwc564SICzLHDDOUDoAg.PNG.science_zone/image.png?type=w800";

const WordCloud: React.FC = () => {
  return (
    <div>
      <img src={imgUrl} alt="워드클라우드" className="w-full h-full" />
    </div>
  );
};

export default WordCloud;
