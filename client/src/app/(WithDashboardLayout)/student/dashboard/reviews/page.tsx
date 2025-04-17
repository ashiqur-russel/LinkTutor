import React from 'react';
import AllReviews from '@/components/modules/dashboard/student/AllReviews';
import { fetchAllReviewByStudentId } from '@/services/ReviewService';


const ReviewPage = async() => {
    const reviews = await fetchAllReviewByStudentId()
 
  return (
   <AllReviews reviewList={reviews?.data}/>
  );
};

export default ReviewPage;