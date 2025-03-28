import QueryBuilder from "../../builder/QueryBilder";
import { TutorSearchableFields } from "./Tutor.constant";
import Tutor from "./Tutor.model";

const getAllTutors = async (query: Record<string, unknown>) => {
  const TutorQuery = new QueryBuilder(Tutor.find(), query)
    .search(TutorSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  if (query.availability) {
    const days = Array.isArray(query.availability)
      ? query.availability
      : [query.availability];
    TutorQuery.modelQuery = TutorQuery.modelQuery.find({
      "availability.day": { $in: days },
    });
  }

  if (query.startTime && query.endTime) {
    TutorQuery.modelQuery = TutorQuery.modelQuery.find({
      availability: {
        $elemMatch: {
          startTime: { $lte: query.startTime },
          endTime: { $gte: query.endTime },
        },
      },
    });
  }

  if (query.subjects) {
    const subjects = Array.isArray(query.subjects)
      ? query.subjects
      : [query.subjects];
    TutorQuery.modelQuery = TutorQuery.modelQuery.find({
      subjects: { $in: subjects },
    });
  }

  TutorQuery.modelQuery = TutorQuery.modelQuery.select(
    "name email hourRate subjects availability isActive -_id"
  );

  const result = await TutorQuery.modelQuery;
  const meta = await TutorQuery.countTotal();

  return {
    result,
    meta,
  };
};

export const TutorServices = { getAllTutors };
