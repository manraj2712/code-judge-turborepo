import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (["/api/auth/signin", "/signin"].includes(req.nextUrl.pathname)) {
    if (req.cookies.get("next-auth.session-token")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/api/auth/signin", "/signin"],
};
