import { Schema, model, Document } from 'mongoose';

export interface IAuthModel extends Document {
  name: string;
  // add more fields here
}

const AuthSchema = new Schema<IAuthModel>({
  name: { type: String, required: true },
  // add more fields here
});

const AuthModel = model<IAuthModel>('Auth', AuthSchema);

export default AuthModel;
