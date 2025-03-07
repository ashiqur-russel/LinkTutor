import { z } from "zod";
import { createUserSchema } from "../User/User.validation";

export const createStudentSchema = createUserSchema.extend({
  role: z.literal("student"),
  grade: z.string().min(1, "Grade is required"),
  guardian: z.object({
    name: z.string().min(1, "Guardian name is required"),
    phone: z.string().min(1, "Guardian phone is required"),
    email: z.string().email().optional(),
    relationship: z.string().min(1, "Guardian relationship is required"),
  }),
});
