"use server";

import { getValidTokenWithCookie } from "@/actions/refreshToken";
import { revalidateTag } from "next/cache";
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
          next: { tags: ['review-list'] },
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
        next: { tags: ['review-list'] },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching lesson requests:", error);
    return { result: [], meta: {} };
  }
};

export const addReviewForTutor = async( tutorId: string,reviewData:{rating:number, comment:string})=>{
    const token = await getValidTokenWithCookie();

    try {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/review/${tutorId}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify(reviewData),
              next: { tags: ['review-list'] },
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


export const updateTutorReview = async (
  reviewId: string,
  review: { rating: number; comment: string },
  page?: string,
  limit?: string
) => {
  try {
    const token = await getValidTokenWithCookie();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/update/${reviewId}?page=${page}&limit=${limit}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(review),
      }
    );

    const data = await res.json();

    revalidateTag("review-list");

    return data;
  } catch (error) {
    console.error("Error updating tutor review:", error);
  }
};
