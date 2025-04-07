"use server";

import { cookies } from "next/headers";
import { getNewToken } from "@/app/services/AuthService";
import { isTokenExpired } from "@/app/lib/verifyToken";

export const getValidTokenWithCookie = async (): Promise<string> => {
  const cookieStore = await cookies();

  let token = cookieStore.get("accessToken")?.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data?.accessToken;

    if (token) {
      cookieStore.set("accessToken", token, {
        httpOnly: true,
        path: "/",
      });
    }
  }

  return token!;
};
