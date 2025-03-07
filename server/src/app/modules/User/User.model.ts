import mongoose, { Schema, Model } from "mongoose";
import { IUser, UserRole } from "./User.interface";

const AddressSchema: Schema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String },
});

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    address: { type: AddressSchema, required: true },
    phone: { type: String },
  },
  {
    discriminatorKey: "role",
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
