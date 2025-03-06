import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser, UserRole } from "./User.interface";

const AddressSchema: Schema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String },
});

const UserInfoSchema: Schema = new Schema({
  device: {
    type: String,
    enum: ["pc", "mobile"],
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  pcName: {
    type: String,
  },
  os: {
    type: String,
  },
  userAgent: {
    type: String,
  },
});

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  userInfo: { type: UserInfoSchema },
  role: { type: String, enum: Object.values(UserRole), required: true },
  profilePicture: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
