import TutorAbout from "@/components/modules/tutor/tutor-details/TutorAbout";
import TutorReviews from "@/components/modules/tutor/tutor-details/TutorReviews";
import TutorSidebar from "@/components/modules/tutor/tutor-details/TutorSidebar";
import { getMockTutorById } from "@/lib/mockTutor";
import { notFound } from "next/navigation";

export default async function TutorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutor = getMockTutorById(id);
  if (!tutor) return notFound();

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <TutorAbout tutor={tutor} />
            <TutorReviews reviews={tutor.reviews} />
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-20">
              <TutorSidebar tutor={tutor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
