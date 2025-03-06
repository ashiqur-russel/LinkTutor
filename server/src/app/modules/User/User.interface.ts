export enum UserRole {
  STUDENT = "student",
  TUTOR = "tutor",
  ADMIN = "admin",
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
}

export interface IUserInfo {
  device: "pc" | "mobile"; // Device type
  browser: string; // Browser name
  ipAddress: string; // User IP address
  pcName?: string; // Optional PC name
  os?: string; // Optional OS name (Windows, MacOS, etc.)
  userAgent?: string; // Optional user agent string
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profilePicture?: string;
  address: IAddress;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  userInfo: IUserInfo;
}
