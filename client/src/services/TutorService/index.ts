/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidTokenWithCookie } from "@/actions/refreshToken";

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

export const fetchTutorInfoById = async (tutorId: string)=>{

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor/${tutorId}`
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }

}


export const fetchTutorListForStudent= async (
  page?: string,
  limit?: string
) => {
  const token = await getValidTokenWithCookie();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor/tutors?page=${page}&limit=${limit}`,
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
