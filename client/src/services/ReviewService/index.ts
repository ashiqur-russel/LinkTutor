"use server";

import { getValidTokenWithCookie } from "@/actions/refreshToken";
export const fetchReviewByStudent = async (
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

export const fetchAllReviewByStudentId = async (
  page?: string,
  limit?: string
) => {
  const token = await getValidTokenWithCookie();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/student/reviews?page=${page}&limit=${limit}`,
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

export const addReviewForTutor = async( tutorId: string)=>{
    const token = await getValidTokenWithCookie();

    try {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/review/${tutorId}`,
            {
              method: "POST",
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
    }
}

export const fetchTutorReviews = async (tutorId: string) =>{
    try {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/review/${tutorId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          return data;
        
    } catch (error) {
        console.error("Error fetching lesson requests:", error);       
    }
}
