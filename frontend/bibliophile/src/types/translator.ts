const categoryTranslationMap: Record<string, string> = {
  GENERAL_WORKS: "# 경제",
  PHILOSOPHY: "# 만화",
  RELIGION: "# 사회",
  SOCIAL_SCIENCES: "# 역사",
  NATURAL_SCIENCES: "# 사랑",
  TECHNOLOGY: "# 예술",
  ARTS: "# 소설",
  LANGUAGE: "# 여행",
  LITERATURE: "# 언어",
  HISTORY: "# IT/과학",
};

const reverseTranslationMap: Record<string, string> = {
  "# 경제": "GENERAL_WORKS",
  "# 만화": "PHILOSOPHY",
  "# 사회": "RELIGION",
  "# 역사": "SOCIAL_SCIENCES",
  "# 사랑": "NATURAL_SCIENCES",
  "# 예술": "TECHNOLOGY",
  "# 소설": "ARTS",
  "# 여행": "LANGUAGE",
  "# 언어": "LITERATURE",
  "# IT/과학": "HISTORY",
};

export const translateCategoryToKorea = (category: string): string => {
  return categoryTranslationMap[category];
};

export const translateCategoryToEnglish = (category: string): string => {
  return reverseTranslationMap[category];
};
