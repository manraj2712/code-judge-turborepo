import { prisma } from "@manraj2712/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  let offset = parseInt(req.nextUrl.searchParams.get("offset") || "10");

  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(offset) || offset < 1) {
    offset = 10;
  }
  const skip = (page - 1) * offset;

  const usersWithSubmissionPromise = prisma.user.findMany({
    where: {
      submissions: {
        some: {
          status: "AC",
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      submissions: {
        where: {
          status: "AC",
        },
        select: {
          id: true,
          problemId: true,
        },
        distinct: ["problemId"],
      },
    },
    orderBy: {
      submissions: {
        _count: "desc",
      },
    },
    skip,
    take: offset,
  });

  const totalUsersCountPromise = prisma.user.count({
    where: {
      submissions: {
        some: {
          status: "AC",
        },
      },
    },
  });
  const [usersWithSubmission, totalUsersCount] = await Promise.all([
    usersWithSubmissionPromise,
    totalUsersCountPromise,
  ]);
  return NextResponse.json({
    users: usersWithSubmission,
    userCount: totalUsersCount.toString(),
  });
}
