import { getDifficultyColor } from "@/constants";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const columns = [
  { id: "status", label: "Status" },
  { id: "acceptance", label: "Acceptance" },
  { id: "title", label: "Title" },
  { id: "difficulty", label: "Difficulty" },
];

type ProblemListItem = {
  id: string;
  status: string;
  title: string;
  acceptance: string;
  difficulty: string;
};

const fetchProblemList = async () => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/problems`;
  const res = await fetch(url, {
    method: "GET",
  });
  const resJson = await res.json();
  const problems: ProblemListItem[] = [];
  resJson.forEach((problem: any) => {
    problems.push({
      id: problem.id,
      status: "AC",
      title: problem.title,
      acceptance:
        problem.acceptanceRate < 1
          ? `${problem.acceptanceRate.toFixed(0)}%`
          : "-",
      difficulty: problem.difficulty,
    });
  });
  return problems;
};

const ProblemsList = async () => {
  const problems = await fetchProblemList();
  return (
    <div className="flex flex-col w-full px-3">
      <div className="">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-x-hidden">
            <table className="table-fixed overflow-y-scroll lg:table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.id}
                      className={`lg:px-6 py-3 ${
                        index === columns.length - 1
                          ? "text-center"
                          : "text-left"
                      } ${
                        ["acceptance", "status"].includes(column.id)
                          ? "hidden lg:table-cell"
                          : ""
                      } ${
                        column.id == "title" ? "w-[70%]" : "w-auto"
                      } text-base font-medium text-gray-500 dark:text-gray-200`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="odd:bg-neutral-900 text-gray-200"
                  >
                    <td className="hidden lg:table-cell px-6 py-4 text-base">
                      {problem.status === "AC" ? (
                        <CheckCircleIcon className="text-green-500 h-6 w-6" />
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 text-left text-base">
                      {problem.acceptance}
                    </td>

                    <td className="w-[70%] lg:w-auto hide-multi-line px-2 lg:px-6 py-4 hover:cursor-pointer hover:text-blue-700 text-base">
                      <Link href={`/problem/${problem.id}`}>
                        {problem.title.length > 50
                          ? problem.title.slice(0, 47) + "..."
                          : problem.title}
                      </Link>
                    </td>
                    <td
                      className={`px-6 py-4 text-center text-base first-letter:capitalize ${getDifficultyColor(
                        problem.difficulty.toLowerCase()
                      )}`}
                    >
                      {problem.difficulty.toLowerCase()}
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

export default ProblemsList;
