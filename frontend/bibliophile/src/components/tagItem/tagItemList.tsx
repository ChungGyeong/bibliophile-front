import React, { useState } from "react";
import TagItem from "./TagItem";

const TAGS: string[] = [
  "# 경제",
  "# 만화",
  "# 사회",
  "# 역사",
  "# 사랑",
  "# 예술",
  "# 소설",
  "# 여행",
  "# 언어",
  "# IT/과학",
];

const SERVERTAGS: string[] = ["# 경제", "# 만화", "# 사회"];

interface TagItemListProps {
  layoutType: "signSelect" | "mypageSelect" | "mySelect";
}

const TagItemList: React.FC<TagItemListProps> = ({ layoutType }) => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const handleTagClick = (tag: string) => {
    setSelectedTags(prevSelected => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(tag)) {
        updatedSelected.delete(tag);
      } else {
        if (updatedSelected.size >= 3) {
          alert("최대 3개의 태그만 선택할 수 있습니다.");
          return prevSelected;
        }
        updatedSelected.add(tag);
      }
      return updatedSelected;
    });
  };

  const renderLayout = () => {
    switch (layoutType) {
      case "signSelect":
        return (
          <div className="w-[300px] h-[150px] flex-shrink-0 border border-gray p-[10px] rounded-[5px]">
            {TAGS.map((tag, index) => (
              <TagItem
                key={index}
                label={tag}
                selected={selectedTags.has(tag)}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
        );
      case "mypageSelect":
        return (
          <div className="w-[300px] h-[180px] bg-light-yellow flex-shrink-0 p-[10px] rounded-[5px]">
            <p className="font-regular text-base leading-normal mx-[5px]">관심사</p>
            {TAGS.map((tag, index) => (
              <TagItem
                key={index}
                label={tag}
                selected={selectedTags.has(tag)}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
        );
      case "mySelect":
        return (
          <div className="w-[300px] h-[100px] bg-light-yellow flex-shrink-0 p-[10px] rounded-[5px]">
            <p className="font-regular text-base leading-normal mx-[5px]">관심사</p>
            {SERVERTAGS.map((tag, index) => (
              <TagItem key={index} label={tag} selected={true} disabled={true} />
            ))}
          </div>
        );
    }
  };

  return renderLayout();
};

export default TagItemList;
