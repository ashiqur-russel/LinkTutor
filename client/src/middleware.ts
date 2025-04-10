import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  student: [/^\/student/, /^\/student\/dashboard/, /^\/tutor/],
  tutor: [
    /^\/tutor/,
    /^\/tutor\/profile/,
    /^\/tutor\/lesson-offer/,
    /^\/tutor\/dashboard/,
  ],
  admin: [/^\/admin/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // ✅ Allow login/register without token
  if (!accessToken) {
    if (authRoutes.includes(pathname)) return NextResponse.next();

    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }

  try {
    const decoded: any = jwtDecode(accessToken);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      const response = NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
      response.cookies.set("accessToken", "", { maxAge: 0 });
      response.cookies.set("refreshToken", "", { maxAge: 0 });
      return response;
    }

    const userRole = decoded.role;

    // ✅ Handle invalid or missing roles
    if (!userRole || !(userRole in roleBasedPrivateRoutes)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ Special redirect for tutor base path
    if (userRole === "tutor" && pathname === "/tutor") {
      return NextResponse.redirect(new URL("/tutor/lesson-offer", request.url));
    }

    const allowedRoutes = roleBasedPrivateRoutes[userRole as Role];

    // ✅ Allow only if the pathname matches allowed routes for the role
    if (allowedRoutes?.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }

    // 🚫 Not allowed → redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  } catch (err) {
    console.error("Token decode error:", err);

    const response = NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
    response.cookies.set("accessToken", "", { maxAge: 0 });
    response.cookies.set("refreshToken", "", { maxAge: 0 });
    return response;
  }
};

// ✅ Ensure all relevant routes are handled
export const config = {
  matcher: [
    "/student",
    "/student/:path*",
    "/tutor",
    "/tutor/:path*",
    "/admin",
    "/admin/:path*",
    "/create-shop", // include if needed
  ],
};
