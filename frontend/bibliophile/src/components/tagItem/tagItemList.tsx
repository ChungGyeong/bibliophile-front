import React, { useEffect, useState } from "react";
import TagItem from "./tagItem";
import { translateCategoryToEnglish, translateCategoryToKorea } from "@/types/translator.ts";
import { TAGS } from "@/constants/constants.ts";
import { Swiper, SwiperSlide } from "swiper/react";

interface TagItemListProps {
  layoutType: "signSelect" | "bookSelect" | "mypageSelect" | "mySelect";
  tags: Set<string>;
  setTags: (selectedTags: Set<string>) => void;
}

const TagItemList: React.FC<TagItemListProps> = ({ layoutType, tags, setTags }) => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(tags);

  const handleTagClick = (koreanTag: string) => {
    setSelectedTags(prevSelected => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(translateCategoryToEnglish(koreanTag))) {
        updatedSelected.delete(translateCategoryToEnglish(koreanTag));
      } else {
        if (updatedSelected.size >= 3) {
          alert("최대 3개의 태그만 선택할 수 있습니다.");
          return prevSelected;
        }
        updatedSelected.add(translateCategoryToEnglish(koreanTag));
      }
      return updatedSelected;
    });
  };

  useEffect(() => {
    if (tags) setTags(selectedTags);
  }, [selectedTags]);

  const renderLayout = () => {
    switch (layoutType) {
      case "signSelect":
        return (
          <div className="w-full h-[150px] flex-shrink-0 justify-between border border-gray p-[10px] rounded-[5px]">
            {TAGS.map((tag, index) => {
              const koreanTag = translateCategoryToKorea(tag);
              return (
                <TagItem
                  key={index}
                  label={koreanTag}
                  selected={selectedTags.has(tag)}
                  onClick={() => handleTagClick(koreanTag)}
                />
              );
            })}
          </div>
        );
      case "bookSelect":
        return (
          <div>
            <div className="flex justify-between w-full items-center mb-[10px]">
              <p className="text-sm font-medium">태그 골라 보기</p>
              <p className="text-xs font-light">최대 3개까지 선택 가능</p>
            </div>
            <Swiper slidesPerView={4.2} className="h-11">
              {TAGS.map((tag, index) => {
                const koreanTag = translateCategoryToKorea(tag);
                return (
                  <SwiperSlide key={index}>
                    <TagItem
                      label={koreanTag}
                      selected={selectedTags.has(tag)}
                      onClick={() => handleTagClick(koreanTag)}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        );
      case "mypageSelect":
        return (
          <div className="w-full h-[180px] bg-light-yellow flex-shrink-0 p-[10px] rounded-[5px]">
            <p className="font-medium text-base leading-normal mx-[5px] mb-2">관심사</p>
            {TAGS.map((tag, index) => {
              const koreanTag = translateCategoryToKorea(tag);
              return (
                <TagItem
                  key={index}
                  label={koreanTag}
                  selected={selectedTags.has(tag)}
                  onClick={() => handleTagClick(koreanTag)}
                />
              );
            })}
          </div>
        );
      case "mySelect":
        return (
          <div className="w-full h-[100px] bg-light-yellow flex-shrink-0 p-[10px] rounded-[5px]">
            <p className="font-medium text-base leading-normal mx-[5px] mb-2">관심사</p>
            {Array.from(selectedTags).map((tag, index) => {
              const koreanTag = translateCategoryToKorea(tag);

              return <TagItem key={index} label={koreanTag} selected={selectedTags.has(tag)} />;
            })}
          </div>
        );
    }
  };

  return renderLayout();
};

export default TagItemList;
