import { DAYS_OF_WEEK } from "../Tutor/Tutor.constant";

export function getUtcWeekdayName(date: Date): string {
  const days = DAYS_OF_WEEK;
  const weekdayIndex = date.getUTCDay();
  return days[weekdayIndex];
}

export function getUTCMinutes(dateObj: Date): number {
  // getUTCHours() and getUTCMinutes() ensure we use UTC times, not local times
  return dateObj.getUTCHours() * 60 + dateObj.getUTCMinutes();
}
/**
 * Utility to convert "HH:MM" to total minutes (e.g., "09:00" -> 540).
 */
export function parseTimeToMinutes(timeStr: string): number {
  const [hour, minute] = timeStr.split(":").map(Number);
  return hour * 60 + (minute || 0);
}
