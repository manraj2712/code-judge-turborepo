import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@manraj2712/database";
import { sqsclient } from "@manraj2712/aws-services";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userEmail = token.email;

  if (!userEmail) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const { code, problemId, language } = body;

  if (!code || !problemId || !language) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  const submission = await prisma.submission.create({
    data: {
      code: code,
      user: {
        connect: {
          email: userEmail,
        },
      },
      problem: {
        connect: {
          id: problemId,
        },
      },
      language: language,
    },
  });

  await sqsclient.sendMessage({
    message: submission.id,
  });

  return NextResponse.json(submission, { status: 201 });
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
