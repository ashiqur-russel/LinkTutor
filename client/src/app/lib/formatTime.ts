import { format } from "date-fns";

export const formatTime = (date: Date) => {
  return format(date, "hh:mm a");
};
