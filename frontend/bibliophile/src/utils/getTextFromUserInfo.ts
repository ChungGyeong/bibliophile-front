import { AgeType } from "@/types/books.ts";

export const getAgeRange = (birthday: string): AgeType => {
  const birthDate = new Date(birthday);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  if (age < 20) return 10;
  if (age < 30) return 20;
  if (age < 40) return 30;
  if (age < 50) return 40;
  return 50;
};

export const getDefaultBook = (gender: string, birthday: string): string => {
  const ageRange = getAgeRange(birthday);

  return `${ageRange}대 ${gender === "MAN" ? "남성" : "여성"} 인기도서`;
};

export const getAgeAndGender = (value: string): [AgeType, "MAN" | "WOMAN"] => {
  if (value === "10대 남성 인기도서") return [10, "MAN"];
  if (value === "10대 여성 인기도서") return [10, "WOMAN"];
  if (value === "20대 남성 인기도서") return [20, "MAN"];
  if (value === "20대 여성 인기도서") return [20, "WOMAN"];
  if (value === "30대 남성 인기도서") return [30, "MAN"];
  if (value === "30대 여성 인기도서") return [30, "WOMAN"];
  if (value === "40대 남성 인기도서") return [40, "MAN"];
  if (value === "40대 여성 인기도서") return [40, "WOMAN"];
  if (value === "50대 남성 인기도서") return [50, "MAN"];
  return [50, "WOMAN"];
};
