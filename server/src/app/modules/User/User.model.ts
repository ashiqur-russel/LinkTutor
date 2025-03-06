import { Schema, model, Document } from 'mongoose';

export interface IUserModel extends Document {
  name: string;
  // add more fields here
}

const UserSchema = new Schema<IUserModel>({
  name: { type: String, required: true },
  // add more fields here
});

const UserModel = model<IUserModel>('User', UserSchema);

export default UserModel;
