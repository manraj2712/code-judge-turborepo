import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@manraj2712/database";
import { s3ProblemsBucketName, s3client } from "@manraj2712/aws-services";

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

  const {
    title,
    difficulty,
    description,
    boilerplate,
    driverCode,
    input,
    expectedOutput,
  } = await req.json();

  try {
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
    const fileBuffers = [
      {
        key: "driver-code.txt",
        file: Buffer.from(driverCode),
      },
      {
        key: "input.txt",
        file: Buffer.from(input),
      },
      {
        key: "expected-output.txt",
        file: Buffer.from(expectedOutput),
      },
    ];
    s3client.uploadMultipleObjects({
      bucketName: s3ProblemsBucketName,
      files: fileBuffers,
      directory: problem.id,
    });

    return NextResponse.json(problem, { status: 201 });
  } catch (e) {
    // console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
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
