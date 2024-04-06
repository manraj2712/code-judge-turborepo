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
          acceptanceRate: problem.acceptanceRate,
          totalSubmissions: problem.totalSubmissions,
        },
      }}
    />
  );
}
