import { ENG_CLASSIFICATION, KOR_CLASSIFICATION } from "@/constants/constants.ts";
import { ClassificationType } from "@/types/user.ts";

// export type ClassificationType =
//   | "SOCIETY"
//   | "FICTION"
//   | "SCIENCE"
//   | "ARTS"
//   | "LANGUAGE"
//   | "HISTORY";

const translationMap = Object.fromEntries(
  KOR_CLASSIFICATION.map((koreanTerm, index) => [koreanTerm, ENG_CLASSIFICATION[index]])
);

const reverseTranslationMap = Object.fromEntries(
  ENG_CLASSIFICATION.map((englishTerm, index) => [englishTerm, KOR_CLASSIFICATION[index]])
);

export const translateTagToKorea = (englishTerm: string) => {
  return reverseTranslationMap[englishTerm];
};

export const translateTagToEnglish = (koreanTerm: string) => {
  return translationMap[koreanTerm] as ClassificationType;
};
