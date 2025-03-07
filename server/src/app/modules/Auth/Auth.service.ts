import mongoose from "mongoose";
import { IAuth, IJwtPayload } from "./Auth.interface";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import User from "../User/User.model";
import config from "../../config";
import { createToken, verifyToken } from "./Auth.utils";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
    }

    if (!user.isActive) {
      throw new AppError(StatusCodes.FORBIDDEN, "This user is not active!");
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, "Password does not match");
    }

    const jwtPayload: IJwtPayload = {
      userId: user.id as string,
      name: user.name as string,
      email: user.email as string,
      isActive: user.isActive,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    const updateUserInfo = await User.findByIdAndUpdate(
      user._id,
      { lastLogin: Date.now() },
      { new: true, session }
    );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as string);
  } catch (err) {
    throw new AppError(StatusCodes.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
  }

  if (!isUserExist.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not active");
  }

  const jwtPayload: IJwtPayload = {
    userId: isUserExist.id as string,
    name: isUserExist.name as string,
    email: isUserExist.email as string,
    isActive: isUserExist.isActive,
    role: isUserExist.role,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
