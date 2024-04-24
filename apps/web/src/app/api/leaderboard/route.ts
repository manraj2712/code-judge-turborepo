import { prisma } from "@manraj2712/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");
    const pageSize = url.searchParams.get("pageSize");
    let pageNumber = 1;
    let size = 10;
    if (page && pageSize) {
      pageNumber = Math.max(parseInt(page), 1); // Ensure page is a positive integer
      size = Math.max(parseInt(pageSize), 1); // Ensure pageSize is a positive integer
    }

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
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}
