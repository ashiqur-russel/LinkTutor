import { Schema, model, Document } from 'mongoose';

export interface ITutorModel extends Document {
  name: string;
  // add more fields here
}

const TutorSchema = new Schema<ITutorModel>({
  name: { type: String, required: true },
  // add more fields here
});

const TutorModel = model<ITutorModel>('Tutor', TutorSchema);

export default TutorModel;
