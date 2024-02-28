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
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-500";
    default:
      return "text-green-500";
  }
};
