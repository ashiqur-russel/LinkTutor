import TutorAbout from "@/components/modules/tutor/tutor-details/TutorAbout";
import TutorReviews from "@/components/modules/tutor/tutor-details/TutorReviews";
import TutorSidebar from "@/components/modules/tutor/tutor-details/TutorSidebar";
import { fetchTutorReviews } from "@/services/ReviewService";
import { fetchTutorInfoById } from "@/services/TutorService";
import { notFound } from "next/navigation";

export default async function TutorDetailsPage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;

  const [tutorInfo, tutorReviews] = await Promise.all([
    fetchTutorInfoById(_id),
    fetchTutorReviews(_id),
  ]);

  if (!tutorInfo?.success || !tutorInfo.data || !tutorReviews?.success) {
    return notFound();
  }


  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <TutorAbout tutor={tutorInfo.data} />
            <TutorReviews 
                  reviews={tutorReviews.data.reviews}   
                  averageRating={tutorInfo.data.averageRating}
                />
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-20">
              <TutorSidebar
                tutor={tutorInfo.data}
                reviews={tutorReviews.data.reviews.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
