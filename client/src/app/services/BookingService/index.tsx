"use server";

export const fetchMyBookings = async (
  userId: string,
  filters?: Record<string, any>
) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/bookings/${userId}/?${queryParams.toString()}`,
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
