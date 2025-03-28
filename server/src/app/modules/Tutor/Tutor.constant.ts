// constants.ts
export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const TutorSearchableFields = [
  "email",
  "name",
  "role",
  "availability.day",
  "hourRate",
  "subjects",
];

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];
