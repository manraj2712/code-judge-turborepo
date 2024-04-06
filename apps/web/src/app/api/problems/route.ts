import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@manraj2712/database";

export async function GET(req: NextRequest) {
  const problems = await prisma.problem.findMany({
    select: {
      id: true,
      title: true,
      difficulty: true,
      acceptanceRate: true,
      totalSubmissions: true,
    },
    take: 20,
    skip: 0,
  });

  return NextResponse.json(problems, { status: 200 });
}

// create a post request to create a problem and save it to the database
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  if (!token || !token.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, difficulty, description, boilerplate } = await req.json();

  const problem = await prisma.problem.create({
    data: {
      title,
      difficulty: (difficulty as string).toUpperCase() as any,
      boilerplate,
      description,
      author: {
        connect: {
          email: token.email?.toString(),
        },
      },
    },
  });

  console.log(problem, "problem");

  return NextResponse.json(problem, { status: 201 });
}
// id        String   @id @default(uuid())
//   problemId String
//   problem   Problem  @relation(fields: [problemId], references: [id])
//   userId    String
//   user      User     @relation(fields: [userId], references: [id])
//   code      String
//   language  Language
//   status    Status   @default(PENDING)
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   output    String?
//   time      String?
//   memory    String?
