import { Schema, model, Document } from 'mongoose';

export interface IStudentModel extends Document {
  name: string;
  // add more fields here
}

const StudentSchema = new Schema<IStudentModel>({
  name: { type: String, required: true },
  // add more fields here
});

const StudentModel = model<IStudentModel>('Student', StudentSchema);

export default StudentModel;
