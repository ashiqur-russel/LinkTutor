import mongoose, { Schema } from "mongoose";
import { IUserDocument, IUserModel, UserRole } from "./User.interface";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import config from "../../config";

const AddressSchema: Schema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String },
});

/**
 * Note the generic types:
 *  1. IUserDocument -> shape of each document
 *  2. IUserModel    -> shape of the model (statics)
 */
const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    address: { type: AddressSchema, required: true },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    discriminatorKey: "role",
    timestamps: true,
  }
);

/* ------------------ Mongoose Hooks ------------------ */

UserSchema.pre("save", async function (next) {
  const user = this; // 'this' is an IUserDocument
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

/* ------------------ toJSON Transform ------------------ */

UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

/* ------------------ Static Methods ------------------ */

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return this.findOne({ email }).select("+password");
};

UserSchema.statics.checkUserExist = async function (userId: string) {
  console.log("pre hoook==>", userId);
  const existingUser = await this.findById(userId);

  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "User does not exist!");
  }

  if (!existingUser.isActive) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, "User is not active!");
  }

  return existingUser;
};

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export default User;
