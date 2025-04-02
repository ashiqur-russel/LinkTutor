import QueryBuilder from "../../builder/QueryBilder";
import { TutorSearchableFields } from "./Tutor.constant";
import Tutor from "./Tutor.model";

const getAllTutors = async (query: Record<string, unknown>) => {
  const formattedQuery: Record<string, any> = {};

  if (query.availability && typeof query.availability === "string") {
    formattedQuery.availability = query.availability.split(",");
  } else if (Array.isArray(query.availability)) {
    formattedQuery.availability = query.availability;
  }

  if (query.subjects && typeof query.subjects === "string") {
    formattedQuery.subjects = query.subjects.split(",");
  } else if (Array.isArray(query.subjects)) {
    formattedQuery.subjects = query.subjects;
  }

  if (query.Ratings) {
    formattedQuery.Ratings = Array.isArray(query.Ratings)
      ? query.Ratings.map(Number)
      : query.Ratings.toString().split(",").map(Number);
  }

  if (query.HourRate && typeof query.HourRate === "string") {
    const [minRate, maxRate] = query.HourRate.split("-").map(Number);
    formattedQuery.HourRate = { $gte: minRate, $lte: maxRate };
  }

  const TutorQuery = new QueryBuilder(Tutor.find(), formattedQuery)
    .search(TutorSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  if (formattedQuery.availability) {
    TutorQuery.modelQuery = TutorQuery.modelQuery.find({
      availability: {
        $elemMatch: { day: { $in: formattedQuery.availability } },
      },
    });
  }

  if (formattedQuery.subjects) {
    TutorQuery.modelQuery = TutorQuery.modelQuery.find({
      subjects: { $in: formattedQuery.subjects },
    });
  }

  if (formattedQuery.Ratings) {
    TutorQuery.modelQuery = TutorQuery.modelQuery.find({
      rating: { $in: formattedQuery.Ratings },
    });
  }

  if (formattedQuery.HourRate) {
    TutorQuery.modelQuery = TutorQuery.modelQuery.find({
      hourRate: formattedQuery.HourRate,
    });
  }

  TutorQuery.modelQuery = TutorQuery.modelQuery.select(
    "name email hourRate subjects availability isActive rating _id"
  );

  const result = await TutorQuery.modelQuery;
  const meta = await TutorQuery.countTotal();

  return {
    result,
    meta,
  };
};

export const TutorServices = { getAllTutors };
