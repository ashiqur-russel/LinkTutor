import { Schema, model, Document } from 'mongoose';

export interface ILessonRequestModel extends Document {
  name: string;
  // add more fields here
}

const LessonRequestSchema = new Schema<ILessonRequestModel>({
  name: { type: String, required: true },
  // add more fields here
});

const LessonRequestModel = model<ILessonRequestModel>('LessonRequest', LessonRequestSchema);

export default LessonRequestModel;
