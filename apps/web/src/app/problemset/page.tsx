import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

const columns = [
  { id: "status", label: "Status" },
  { id: "acceptance", label: "Acceptance" },
  { id: "title", label: "Title" },
  { id: "difficulty", label: "Difficulty" },
];

const problems = [
  {
    id: "1",
    status: "AC",
    title: "Two Sum",
    acceptance: "55%",
    difficulty: "Easy",
  },
  {
    id: "2",
    status: "WA",
    title: "Reverse Integer",
    acceptance: "42%",
    difficulty: "Easy",
  },
  {
    id: "3",
    status: "AC",
    title: "Longest Substring Without Repeating Characters",
    acceptance: "66%",
    difficulty: "Medium",
  },
  {
    id: "4",
    status: "TLE",
    title: "Add Two Numbers",
    acceptance: "72%",
    difficulty: "Medium",
  },
  {
    id: "5",
    status: "RE",
    title: "Merge Two Sorted Lists",
    acceptance: "60%",
    difficulty: "Easy",
  },
  {
    id: "6",
    status: "AC",
    title: "Palindrome Number",
    acceptance: "45%",
    difficulty: "Easy",
  },
  {
    id: "7",
    status: "AC",
    title: "Valid Parentheses",
    acceptance: "78%",
    difficulty: "Easy",
  },
  {
    id: "8",
    status: "WA",
    title: "Container With Most Water",
    acceptance: "50%",
    difficulty: "Medium",
  },
  {
    id: "9",
    status: "TLE",
    title: "Climbing Stairs",
    acceptance: "70%",
    difficulty: "Easy",
  },
];

const ProblemSet = () => {
  return (
    <div className="flex flex-col">
      <div className=" overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.id}
                      className={`px-6 py-3 ${
                        index === columns.length - 1
                          ? "text-center"
                          : "text-left"
                      } text-base font-medium text-gray-500 dark:text-gray-200`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr className="odd:bg-neutral-900">
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800 dark:text-gray-200">
                      {problem.status === "AC" ? (
                        <CheckCircleIcon className="text-green-500 h-6 w-6" />
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-left text-gray-800 dark:text-gray-200">
                      {problem.acceptance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base hover:cursor-pointer hover:text-blue-700 text-gray-800 dark:text-gray-200">
                      {problem.title}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-center text-base ${getDifficultyColor(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSet;

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-500";
    case "Medium":
      return "text-yellow-500";
    case "Hard":
      return "text-red-500";
    default:
      return "text-green-500";
  }
};
