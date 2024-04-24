import { prisma } from "@manraj2712/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");
  const pageSize = url.searchParams.get("pageSize");
  if (!page || !pageSize) {
    throw new Error("Missing page or pageSize query parameter");
  }
  const pageNumber = Math.max(parseInt(page), 1); // Ensure page is a positive integer
  const size = Math.max(parseInt(pageSize), 1); // Ensure pageSize is a positive integer
  const skip = (pageNumber - 1) * size;

  const usersWithSubmission = await prisma.user.findMany({
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
      submissions: {
        where: {
          status: "AC",
        },
      },
    },
    orderBy: {
      submissions: {
        _count: "desc",
      },
    },
    skip,
    take: size,
  });

  const totalUsersCount = await prisma.user.count({
    where: {
      submissions: {
        some: {
          status: "AC",
        },
      },
    },
  });

  return NextResponse.json(usersWithSubmission, {
    headers: {
      "X-Total-Count": totalUsersCount.toString(),
    },
  });
}
