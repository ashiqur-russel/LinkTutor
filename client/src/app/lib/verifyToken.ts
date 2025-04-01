"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { getNewToken } from "../services/AuthService";

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  console.log(cookieStore);

  let token = cookieStore.get("accessToken")!.value;
  console.log(token);

  if (!token || (await isTokenExpired(token))) {
    const result = await getNewToken();
    console.log("resut", result);

    const { data } = await getNewToken();
    console.log(data);
    token = data?.accessToken;
    cookieStore.set("accessToken", token);
  }

  return token;
};
