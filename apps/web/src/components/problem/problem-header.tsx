import { getDifficultyColor } from "@/constants";
import { ProblemHeader } from "@/types/problem";

export default function ProblemHeaderComponent({
  header,
}: {
  header: ProblemHeader;
}) {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-2">{header.title}</h1>

      <div className="flex justify-between mb-5">
        <p
          className={`${getDifficultyColor(
            header.difficulty.toLowerCase()
          )} text-sm lg:text-base font-bold p-1 first-letter:capitalize`}
        >
          {header.difficulty.toLowerCase()}
        </p>

        <p className=" text-sm lg:text-base p-1">
          {`Acceptance: ${header.acceptanceRate}%`}
        </p>

        <p className=" text-sm lg:text-base p-1">{`Submissions: ${header.totalSubmissions}`}</p>
      </div>
    </div>
  );
}
