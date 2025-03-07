import { z } from "zod";
import { DAYS_OF_WEEK } from "./Tutor.constant";
import { createUserSchema } from "../User/User.validation";

const availabilitySchema = z.array(
  z.object({
    day: z.enum(DAYS_OF_WEEK),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
);

export const createTutorSchema = createUserSchema.extend({
  availability: availabilitySchema,
  subjects: z.array(z.string().min(1, "Subject cannot be empty")),
  hourlyRate: z.number().positive("Hourly rate must be a positive number"),
});
