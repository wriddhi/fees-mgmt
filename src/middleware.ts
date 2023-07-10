import { NextRequest, NextResponse } from "next/server";
import { User } from "./types/db.types";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;

  const cookies = req.cookies.getAll();
  const cookie = cookies.find(
    (cookie) => cookie.name === process.env.AUTH_COOKIE!
  );
  
  console.log(req.ip)

  if (cookie) {
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

    console.log(session);

    if (session.error && path !== "/unauthorized") {
      console.log("Invalid session, redirecting to unauthorized");
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (!session.error && (path === "/unauthorized" || path === "/login")) {
      console.log("Valid session, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (!cookie && path.includes("/dashboard")) {
    console.log("Cookie not found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("All checks done, proceeding to route ", req.url);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};
