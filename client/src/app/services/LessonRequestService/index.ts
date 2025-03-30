/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const fetchMyLessonRequests = async (
  userId: string,
  filters?: Record<string, any>
) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/request/${userId}/my-request?${queryParams.toString()}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching lesson requests:", error);
    return { result: [], meta: {} };
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
