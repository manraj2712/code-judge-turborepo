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
