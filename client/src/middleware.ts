import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./app/services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  student: [/^\/student/, /^\/tutor/, /^\/create-shop/],
  tutor: [/^\/tutor\/profile/], // Removed the /tutor route from tutor's allowed paths
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  // If user is not logged in, handle redirection
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  // Prevent tutor from accessing /tutor route
  if (userInfo?.role === "tutor" && pathname === "/tutor") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow user to access their private routes based on role
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Redirect if the user does not have access to the current route
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/student/:path*",
    "/admin/:path*",
    "/create-shop",
    "/tutor",
  ],
};
