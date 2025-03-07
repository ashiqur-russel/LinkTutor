import mongoose, { Document, Schema, Model } from "mongoose";
import { IAuth } from "./Auth.interface";

const AuthSchema: Schema<IAuth> = new Schema({});

export const Auth: Model<IAuth> = mongoose.model<IAuth>("Auth", AuthSchema);
