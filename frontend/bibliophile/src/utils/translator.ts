import {ENG_CLASSIFICATION, KOR_CLASSIFICATION} from "@/constants/constants.ts";

const reverseTranslationMap = Object.fromEntries(
    ENG_CLASSIFICATION.map((englishTerm, index) => [englishTerm, KOR_CLASSIFICATION[index]])
);

export const translateTagToKorea = (englishTerm :string) => {
  return reverseTranslationMap[englishTerm] ;
}