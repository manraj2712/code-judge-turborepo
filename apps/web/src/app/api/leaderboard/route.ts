import { prisma } from "@manraj2712/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1); // Ensure page is a positive integer
    const pageSize = Math.max(
      parseInt(searchParams.get("pageSize") || "10"),
      1
    ); // Ensure pageSize is a positive integer

    const skip = (page - 1) * pageSize;

    const usersWithSubmissionCounts = await prisma.user.findMany({
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
      take: pageSize,
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

    return NextResponse.json(usersWithSubmissionCounts, {
      headers: {
        "X-Total-Count": totalUsersCount.toString(),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}
