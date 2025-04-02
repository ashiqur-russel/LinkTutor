/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/app/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const fetchMyLessonRequests = async (
  userId: string,
  filters?: Record<string, any>
) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/request/${userId}/my-request?${queryParams.toString()}`,
      {
        next: { tags: ["LessonRequests"] },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching lesson requests:", error);
    return { result: [], meta: {} };
  }
};

export const createLessonRequest1 = async (lessonData: any) => {
  const token = await getValidToken();

  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/request/create-lesson-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(lessonData),
      }
    );
    revalidateTag("LessonRequests");
  } catch (error) {
    console.error("Error creating lesson request:", error);
  }
};

export const createLessonRequest = async (lessonData: any) => {
  const token = await getValidToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/request/create-lesson-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(lessonData),
      }
    );

    const data = await response.json();

    if (response.status !== 201) {
      throw new Error(data.message || "Failed to create lesson request");
    }

    revalidateTag("LessonRequests");
    return data;
  } catch (error) {
    console.error("Error creating lesson request:", error);
    throw error;
  }
};

export const fetchMyFutureLessonRequests = async (
  userId: string,
  filters?: Record<string, any>
) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/request/${userId}/my-future-request?${queryParams.toString()}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching lesson requests:", error);
    return { result: [], meta: {} };
  }
};

export const cancelLessonRequest = async (requestId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/request/${requestId}/cancel-request`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to cancel request. Status: ${response.status}`);
    }

    revalidateTag("LessonRequests");
  } catch (error) {
    console.error("Error canceling lesson request:", error);
    throw error;
  }
};
