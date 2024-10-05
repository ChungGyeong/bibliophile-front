import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ClassificationType } from '@/types/user';
import { translateTagToKorea } from '@/utils/translator';
import TagItem from "@/components/tagItem/tagItem.tsx";

interface TagItemListProps {
  layoutType: 'signSelect' | 'bookSelect' | 'mypageSelect' | 'mySelect';
  tags: ClassificationType[];
  setTags: (selectedTags: ClassificationType[]) => void;
}

const TAGS: ClassificationType[] = [
  "ECONOMICS", "COMICS", "SOCIETY", "LOVE", "FICTION",
  "TRAVEL", "IT_SCIENCE", "ARTS", "LANGUAGE", "HISTORY"
];

const TagItemList: React.FC<TagItemListProps> = ({ layoutType, tags, setTags }) => {
  const [selectedTags, setSelectedTags] = useState<ClassificationType[]>(tags);

  const handleClickTag = (tag: ClassificationType) => {
    setSelectedTags(prevSelected => {
      if (prevSelected.includes(tag)) {
        return prevSelected.filter(t => t !== tag);
      } else {
        if (prevSelected.length >= 3) {
          alert("최대 3개의 태그만 선택할 수 있습니다.");
          return prevSelected;
        }
        return [...prevSelected, tag];
      }
    });
  };

  const renderTags = () => {
    return TAGS.map((tag) => (
        <TagItem
            key={tag}
            label={translateTagToKorea(tag)}
            selected={selectedTags.includes(tag)}
            handleClickTag={() => handleClickTag(tag)}
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
                {TAGS.map((tag) => (
                    <SwiperSlide key={tag}>
                      <TagItem
                          label={translateTagToKorea(tag)}
                          selected={selectedTags.includes(tag)}
                          handleClickTag={() => handleClickTag(tag)}
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
              {selectedTags.map((tag) => (
                  <TagItem
                      key={tag}
                      label={tag}
                      selected={true}
                  />
              ))}
            </div>
        );
    }
  };


  useEffect(() => {
    setTags(selectedTags);
  }, [selectedTags]);

  return renderLayout();
};

export default TagItemList;