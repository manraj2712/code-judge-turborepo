import { Filter } from "@/types/filters";

export const questionDifficultyLevels: Array<Filter> = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

export const questionStatuses: Array<Filter> = [
  { label: "Solved", value: "solved" },
  { label: "Unsolved", value: "unsolved" },
];

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "rgb(34 197 94)";
    case "medium":
      return "rgb(234 179 8)";
    case "hard":
      return "rgb(225 29 72)";
    default:
      return "rgb(34 197 94)";
  }
};
