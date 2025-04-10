export interface IUser {
  _id: string;
  name: string;
  email: string;
  isActive?: boolean;
  password: string;
  role: "student" | "tutor" | "admin";
  address?: IAddress;
  phone?: string;
  createdAt?: string;
  photoUrl?: string;
  updatedAt?: string;
  iat?: number;
  exp?: number;
}

export interface IAddress {
  _id?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IGuardian {
  name: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface IStudent extends IUser {
  role: "student";
  classLevel?: string;
  guardian?: IGuardian;
}

export interface IAvailability {
  _id?: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface IReview {
  _id?: string;
  userId: string;
  bookingId: string;
  comment: string;
  rating: string;
}

export interface ITutor extends IUser {
  role: "tutor";
  rating?: "string";
  availability?: IAvailability[];
  subjects?: string[];
  hourRate?: number;
  review?: IReview[];
}
