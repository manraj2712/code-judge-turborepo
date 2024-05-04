import { Language } from "@manraj2712/database";

export const getExtentionByLanguage = (language: Language) => {
  switch (language) {
    case Language.CPP:
      return "cpp";
    case Language.JAVA:
      return "java";
    case Language.PYTHON:
      return "py";
    default:
      return "";
  }
};
