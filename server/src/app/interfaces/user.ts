import { UserRole } from "../modules/User/User.interface";

export type VerifiedUser = {
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
};
