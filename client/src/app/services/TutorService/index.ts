/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const getAllTutors = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor?limit=${limit}&page=${page}`,
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
