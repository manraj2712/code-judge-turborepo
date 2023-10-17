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
          className={`${getColorByDifficulty(
            header.difficulty
          )} text-sm lg:text-base font-bold p-1`}
        >
          {header.difficulty}
        </p>

        <p className=" text-sm lg:text-base p-1">
          {`Acceptance: ${header.acceptancePercentage}%`}
        </p>

        <p className=" text-sm lg:text-base p-1">{`Submissions: ${header.submissionsCount}`}</p>
      </div>
    </div>
  );
}

function getColorByDifficulty(difficulty: string): string {
  switch (difficulty) {
    case "hard":
      return "text-red-500";
    default:
      return "text-green-500";
  }
}
