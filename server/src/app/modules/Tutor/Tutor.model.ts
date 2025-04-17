import { Schema } from "mongoose";
import { ITutor } from "./Tutor.interface";
import { UserRole } from "../User/User.interface";
import User from "../User/User.model";
import { DAYS_OF_WEEK } from "../Tutor/Tutor.constant";

const TutorSchema: Schema<ITutor> = new Schema({
  availability: [
    {
      day: { type: String, enum: DAYS_OF_WEEK, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  aboutMe: [{ type: String, required: false }],
  averageRating: { type: Number },
  subjects: [{ type: String, required: true }],
  language: [{ type: String, required: false }],
  hourRate: { type: Number, required: true },
  rating: { type: Number },
});

const Tutor = User.discriminator<ITutor>(UserRole.TUTOR, TutorSchema);

export default Tutor;
