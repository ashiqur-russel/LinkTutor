"use client";

import { Star } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";

type TutorReviewsProps= {
  reviews:any[]
} 

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={cn(
        "h-4 w-4",
        i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
      )}
    />
  ));
};

export default function TutorReviews( {reviews} : TutorReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);
  console.log(reviews)


  return (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          What my students say
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold ">{reviews.length} Reviews</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-yellow-400">5</span>
            {renderStars(5)}
          </div>
        </div>
        {visibleReviews.map((review, idx) => (
          <div
            key={idx}
            className="mb-6 pb-6 border-b border-gray-700 last:border-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold ">{review?.studentId?.name}</span>
                <span className=" text-sm">{formatDate(review.updatedAt)}</span>
              </div>
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="">{review.comment}</p>
          </div>
        ))}
        {reviews.length > 2 && (
          <div className="text-center mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className=" border-gray-600"
            >
              {showAll ? "Hide reviews" : "See all reviews"}
            </Button>
          </div>
        )}
      </CardContent>
    </div>
  );
}
