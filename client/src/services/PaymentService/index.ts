"use server";

import { getValidTokenWithCookie } from "@/actions/refreshToken";

export const fetchUserPaymentHistory = async (
  userId: string,
  page?: string,
  limit?: string
) => {
  const token = await getValidTokenWithCookie();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/${userId}/?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching lesson requests:", error);
    return { result: [], meta: {} };
  }
};
