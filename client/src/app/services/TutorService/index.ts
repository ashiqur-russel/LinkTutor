/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getAllTutors = async (
  filters?: Record<string, any>,
  page?: string,
  limit?: string
) => {
  try {
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);

    if (filters?.availability) {
      queryParams.append("availability", filters.availability.join(","));
    }

    if (filters?.subjects) {
      queryParams.append("subjects", filters.subjects.join(","));
    }

    if (filters?.Ratings) {
      queryParams.append("Ratings", filters?.Ratings.map(String).join(","));
    }

    if (filters?.HourRate) {
      queryParams.append(
        "HourRate",
        `${filters.HourRate[0]}-${filters.HourRate[1]}`
      );
    }

    console.log("Fetching Tutors with Query:", queryParams.toString());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor?${queryParams.toString()}`,
      {
        next: {
          tags: ["TUTOR"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching tutors:", error);
    return Error(error.message);
  }
};

export const getDisplayedTutor = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor?limit=3`,
      {
        next: {
          tags: ["TUTOR"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
