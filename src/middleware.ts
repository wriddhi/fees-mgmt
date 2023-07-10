import { NextRequest, NextResponse } from "next/server";
import { User } from "./types/db.types";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;

  const cookies = req.cookies.getAll();

  //   Check if user has auth cookie
  const cookie = cookies.find(
    (cookie) => cookie.name === process.env.AUTH_COOKIE!
  );

  // User has auth cookie, check if it's valid
  if (cookie) {
    // Check if user can be resolved from cookie
    const res = await fetch(new URL("/api/auth/user", req.url), {
      headers: {
        Cookie: `${cookie.name}=${cookie.value}`,
      },
    });

    const session = (await res.json()) as {
      user: User | null;
      error: boolean;
      message: string;
    };

    // User has auth cookie, but it's has been tampered with
    if (session.error && path !== "/unauthorized-access") {
      console.log("Invalid session, redirecting to unauthorized");
      return NextResponse.redirect(new URL("/unauthorized-access", req.url));
    }

    // User has valid auth cookie, but is trying to access login or unauthorized page
    if (!session.error && (path === "/unauthorized-access" || path === "/login")) {
      console.log("Valid session, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  //   User doesn't have auth cookie, but is trying to access dashboard or unauthorized page
  if (
    !cookie &&
    (path.includes("/dashboard") || path.includes("/unauthorized-access"))
  ) {
    console.log("Cookie not found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("All checks done, proceeding to route ", req.url);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};
