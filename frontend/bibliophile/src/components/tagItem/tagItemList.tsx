import React, { useEffect, useState } from "react";
import TagItem from "./tagItem";
import { translateCategoryToEnglish, translateCategoryToKorea } from "@/types/translator.ts";

const TAGS = [
  "GENERAL_WORKS",
  "PHILOSOPHY",
  "RELIGION",
  "SOCIAL_SCIENCES",
  "NATURAL_SCIENCES",
  "TECHNOLOGY",
  "ARTS",
  "LANGUAGE",
  "LITERATURE",
  "HISTORY",
];

interface TagItemListProps {
  layoutType: "signSelect" | "mypageSelect" | "mySelect";
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
