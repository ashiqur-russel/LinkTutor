import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  student: [/^\/student/, /^\/tutor/, /^\/create-shop/],
  tutor: [/^\/tutor\/profile/],
  admin: [/^\/admin/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

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

    if (userRole === "tutor" && pathname === "/tutor") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const allowedRoutes = roleBasedPrivateRoutes[userRole as Role];
    if (allowedRoutes?.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }

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

export const config = {
  matcher: [
    "/student/:path*",
    "/admin/:path*",
    "/create-shop",
    "/tutor",
    "/tutor/:path*",
  ],
};
