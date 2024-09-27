const getAgeRange = (birthday: string): string => {
  const birthDate = new Date(birthday);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  if (age < 20) return "10대";
  if (age < 30) return "20대";
  if (age < 40) return "30대";
  if (age < 50) return "40대";
  return "50대 이상";
};

export const getDefaultBook = (gender: string, birthday: string): string => {
  const ageRange = getAgeRange(birthday);

  return `${ageRange} ${gender === "MAN" ? "남성" : "여성"} 인기도서`;
};
