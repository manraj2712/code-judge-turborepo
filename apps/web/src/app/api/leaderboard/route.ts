import { prisma } from "@manraj2712/database";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        submissions: {
          where: {
            status: "AC",
          },
        },
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.error({ status: 500 });
  }
}
