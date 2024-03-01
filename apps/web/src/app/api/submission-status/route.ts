import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@manraj2712/database";
import { NextApiRequest } from "next";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const submission = await prisma.submission.findUnique({
    where: {
      id: id as string,
    },
  });

  return NextResponse.json(submission, { status: 200 });
}
