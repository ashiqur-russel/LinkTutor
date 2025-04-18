import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBilder";
import { Booking } from "../booking/booking.model";
import User from "../User/User.model";
import { TutorSearchableFields } from "./Tutor.constant";
import { ITutor } from "./Tutor.interface";
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
    "name email hourRate subjects  availability isActive rating _id"
  );

  const result = await TutorQuery.modelQuery;
  const meta = await TutorQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getTutorInfo =async (tutorId:string)=>{
  const tutor = await User.findById({_id:tutorId}).select({"-_id":1,name:1, email:1, aboutMe:1,hourRate:1, subjects:1,averageRating:1,languages:1}) as ITutor
  return tutor
}

const getStudentTutorsList = async (userId: string) => {
  const studentObjectId =
    typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;

  const tutors = await Booking.aggregate([
    {
      $match: {
        studentId: studentObjectId,
        isCancelled: false,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: "$tutorId", 
        booking: { $first: "$$ROOT" }, 
      },
    },
    {
      $replaceRoot: { newRoot: "$booking" },
    },
    {
      $lookup: {
        from: "users", 
        localField: "tutorId",
        foreignField: "_id",
        as: "tutorInfo",
      },
    },
    {
      $unwind: "$tutorInfo",
    },
    {
      $project: {
        _id: 0,
        tutor: {
          id:"$tutorInfo._id",
          name: "$tutorInfo.name",
          email: "$tutorInfo.email",
          phone: "$tutorInfo.phone",
          hourRate: "$tutorInfo.hourRate",
        },
      },
    },
  ]);

  return tutors;
};


export const TutorServices = { getAllTutors,getTutorInfo,getStudentTutorsList };
