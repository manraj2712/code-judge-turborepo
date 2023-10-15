"use client";
import { ChangeEvent, useCallback, useState } from "react";
import { questionDifficultyLevels, questionStatuses } from "@/constants";
import FilterCheckboxGroup from "./filter-checkbox-group";

const FiltersSidebar = () => {
  const [open, setOpen] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [difficulties, setDifficulties] = useState<Array<string>>([]);
  const [statuses, setStatuses] = useState<Array<string>>([]);

  const handleDifficultyChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setDifficulties((difficulties) => [...difficulties, e.target.value]);
      } else {
        setDifficulties(
          (difficulties) =>
            (difficulties = difficulties.filter(
              (difficulty) => difficulty !== e.target.value
            ))
        );
      }
    },
    [difficulties]
  );

  const handleStatusChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setStatuses((statuses) => [...statuses, e.target.value]);
      } else {
        setStatuses(
          (statuses) =>
            (statuses = statuses.filter((status) => status !== e.target.value))
        );
      }
    },
    [statuses]
  );
  return (
    <div
      className={` ${
        open ? "w-60" : "w-40 "
      } flex flex-col h-screen p-3 bg-neutral-900 shadow duration-300`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Filters</h2>
          <button onClick={() => setOpen(!open)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>
        <div className="relative pt-2">
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-neutral-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </span>
          <div>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none text-black"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </div>
        <FilterCheckboxGroup
          heading="Difficulty"
          filters={questionDifficultyLevels}
          onChange={handleDifficultyChange}
        />
        <FilterCheckboxGroup
          heading="Status"
          filters={questionStatuses}
          onChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default FiltersSidebar;
