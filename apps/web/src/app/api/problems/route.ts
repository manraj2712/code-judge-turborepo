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
