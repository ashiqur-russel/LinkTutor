import { DAYS_OF_WEEK } from "../Tutor/Tutor.constant";

import { IUser, UserRole } from "../User/User.interface";

export interface ITutor extends IUser {
  availability: {
    day: (typeof DAYS_OF_WEEK)[number];
    startTime: string;
    endTime: string;
  }[];
  subjects: string[];
  rating?: string;
  averageRating?: string;

  hourRate: number;
}
