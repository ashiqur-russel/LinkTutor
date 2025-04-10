"use server";

export const fetchMyBookings = async (
  userId: string,
  page?: string,
  limit?: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/${userId}/?page=${page}&limit=${limit}`,
      {
        next: { tags: ["LessonRequests"] },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { result: [], meta: {} };
  }
};
