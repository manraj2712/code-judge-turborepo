import { prisma } from "@manraj2712/database";
import ProblemSubmittionScreen from "@/components/problem/screen";

export default async function ProblemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) return <div>{"No problem id provided."}</div>;

  const problem = await prisma.problem.findUnique({
    where: {
      id: id as string,
    },
  });
  // find submissions for this problem and calculate acceptance rate and total submissions
  const submissions = await prisma.submission.findMany({
    where: {
      problemId: id as string,
    },
  });
  const totalSubmissions = submissions.length;
  const acceptedSubmissions = submissions.filter(
    (submission) => submission.status === "AC"
  ).length;

  const acceptanceRate = (acceptedSubmissions / totalSubmissions) * 100;

  if (!problem) return <div>{"Problem not found."}</div>;

  return (
    <ProblemSubmittionScreen
      problem={{
        id: problem.id,
        description: problem.description,
        boilerplate: problem.boilerplate,
        header: {
          title: problem.title,
          difficulty: problem.difficulty,
          acceptanceRate: parseFloat(acceptanceRate.toFixed(2)),
          totalSubmissions: totalSubmissions,
        },
      }}
    />
  );
}
