import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const columns = [
  { id: "rank", label: "Rank" },
  { id: "user", label: "User" },
  { id: "problems", label: "Solved Problems" },
];

const Loading = () => {
  return (
    <div className="flex flex-1 flex-col items-center mb-5 px-10">
      <div className="flex flex-col flex-1 w-full gap-5">
        <div className=" flex my-8 justify-center items-center ">
          <h1 className="text-2xl font-semibold text-center">Leaderboard</h1>
          <FontAwesomeIcon
            icon={faTrophy}
            className="ml-3"
            size="lg"
            color="gold"
          />
        </div>
        <div className="flex overflow-hidden rounded-md ">
          <table className="table-fixed overflow-y-scroll lg:table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-slate-200">
                {columns.map((column, index) => (
                  <th
                    key={column.id}
                    className={`lg:px-6 py-3 text-center" ${
                      column.id == "user" ? "w-[70%]" : "w-auto"
                    } text-base font-medium text-black `}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Loading;
