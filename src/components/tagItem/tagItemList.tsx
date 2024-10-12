import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ClassificationType } from "@/types/user";
import TagItem from "@/components/tagItem/tagItem.tsx";
import { KOR_CLASSIFICATION } from "@/constants/constants.ts";

interface TagItemListProps {
  layoutType: "signSelect" | "bookSelect" | "mypageSelect" | "mySelect";
  tags: ClassificationType[];
  setTags: (tags: ClassificationType[]) => void;
}

const TagItemList: React.FC<TagItemListProps> = React.memo(({ layoutType, tags, setTags }) => {
  const handleTagClick = (tag: ClassificationType) => {
    if (tags.includes(tag)) {
      let newTags = tags.filter(t => t !== tag);
      if (layoutType !== "bookSelect" && newTags.length < 1)
        alert("관심사는 1개 이상 선택해주세요!");
      else setTags([...newTags]);
    } else if (tags.length < 3) {
      setTags([...tags, tag]);
    } else alert("관심사는 3개 이하로 선택해주세요!");
  };

  const renderTags = () => {
    return KOR_CLASSIFICATION.map(tag => (
      <TagItem
        key={tag}
        label={tag}
        selected={tags.includes(tag as ClassificationType)}
        handleClickTag={() => handleTagClick(tag as ClassificationType)}
      />
    ));
  };

  const renderLayout = () => {
    switch (layoutType) {
      case "signSelect":
        return (
          <div className="w-full h-[150px] flex-shrink-0 justify-between border border-gray p-[10px] rounded-[5px]">
            {renderTags()}
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
              {KOR_CLASSIFICATION.map(tag => (
                <SwiperSlide key={tag}>
                  <TagItem
                    label={tag}
                    selected={tags.includes(tag as ClassificationType)}
                    handleClickTag={() => handleTagClick(tag as ClassificationType)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      case "mypageSelect":
        return (
          <div className="w-full h-[180px] bg-light-yellow flex-shrink-0 p-[10px] rounded-[5px]">
            <p className="font-medium text-base leading-normal mx-[5px] mb-2">관심사</p>
            {renderTags()}
          </div>
        );
      case "mySelect":
        return (
          <div className="w-full h-[100px] bg-light-yellow flex-shrink-0 p-[10px] rounded-[5px]">
            <p className="font-medium text-base leading-normal mx-[5px] mb-2">관심사</p>
            {tags.map(tag => (
              <TagItem key={tag} label={tag} selected={true} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return renderLayout();
});

export default TagItemList;
