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

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  address: IAddress;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}
