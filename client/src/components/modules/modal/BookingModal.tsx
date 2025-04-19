import { useState, useEffect, useCallback, useMemo } from "react";

import TutorLinkModal from "./shared/TutorLinkModal";

import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";

import { format, parse, addDays, isBefore } from "date-fns";

import { ITutor } from "@/types";
import { createLessonRequest } from "@/services/LessonRequestService";
import { toast } from "sonner";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: any) => void;
  tutor: ITutor;
  studentId: string;
}

const BookingModal = ({
  isOpen,
  onClose,
  tutor,
  studentId,
}: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const [selectedSubject, setSelectedSubject] = useState(
    (tutor?.subjects ?? [])[0] || ""
  );

  const [errors, setErrors] = useState({
    date: false,
    time: false,
    subject: false,
  });

  const availableDays = useMemo(
    () => new Set(tutor?.availability?.map((slot) => slot.day)),
    [tutor.availability]
  );

  const isDayAvailable = useCallback(
    (date: Date) => {
      if (!date) return false;
      const dayName = format(date, "EEEE");
      return availableDays.has(dayName) && !isBefore(date, new Date());
    },
    [availableDays]
  );

  const getNextAvailableDate = useCallback(() => {
    let date = new Date();
    for (let i = 0; i < 30; i++) {
      if (isDayAvailable(date)) return date;
      date = addDays(date, 1);
    }
    return undefined;
  }, [isDayAvailable]);

  useEffect(() => {
    if (isOpen) {
      const nextDate = getNextAvailableDate();
      setSelectedDate(nextDate);
    }
  }, [isOpen, getNextAvailableDate]);

  const getAvailableTimes = (
    selectedDate: Date | undefined,
    duration: number
  ) => {
    if (!selectedDate) return [];
    const selectedDay = format(selectedDate, "EEEE");
    const availabilityForSelectedDay = tutor?.availability?.find(
      (slot) => slot.day === selectedDay
    );

    if (!availabilityForSelectedDay) return [];

    const { startTime, endTime } = availabilityForSelectedDay;
    const times = [];
    const startTimeObj = parse(startTime, "HH:mm", new Date());
    const endTimeObj = parse(endTime, "HH:mm", new Date());

    for (
      let currentTime = new Date(startTimeObj);
      currentTime < endTimeObj;
      currentTime.setMinutes(currentTime.getMinutes() + 60)
    ) {
      const nextTime = new Date(currentTime);
      nextTime.setHours(currentTime.getHours() + duration);
      if (nextTime <= endTimeObj) {
        times.push(format(currentTime, "HH:mm"));
      }
    }

    return times;
  };

  const availableTimes = selectedDate
    ? getAvailableTimes(selectedDate, selectedDuration)
    : [];

    const handleSubmit = async () => {
      setIsSubmitting(true);
    
      const newErrors = {
        date: !selectedDate,
        time: !selectedTime,
        subject: !selectedSubject,
      };
    
      setErrors(newErrors);
    
      if (!newErrors.date && !newErrors.time && !newErrors.subject) {
        if (!selectedDate || !selectedTime) return;
    
        const startTime = new Date(selectedDate);
        startTime.setHours(
          parseInt(selectedTime.split(":")[0]),
          parseInt(selectedTime.split(":")[1])
        );
        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + selectedDuration);
    
        const payload = {
          tutorId: tutor._id,
          studentId,
          subject: selectedSubject,
          sessionDate: selectedDate?.toISOString(),
          sessionStart: startTime.toISOString(),
          sessionEnd: endTime.toISOString(),
        };
    
        try {
          const response = await createLessonRequest(payload);
    
          if (!response.success) {
            toast.error(response.message || "Failed to book session.");
            return;
          }
    
          const stripe = await stripePromise;
          if (stripe) {
            const result = await stripe.redirectToCheckout({
              sessionId: response.sessionId,
            });
    
            if (result.error) {
              toast.error(result.error.message);
            }
          } else {
            toast.error("Stripe initialization failed.");
          }
        } catch (error: any) {
          toast.error(error.message || "Booking failed. Try again.");
        } finally {
          setIsSubmitting(false); 
        }
      } else {
        setIsSubmitting(false); 
      }
    };
    
  return (
    <TutorLinkModal
      isOpen={isOpen}
      onClose={onClose}
      title="Book a Lesson"
      submitLabel="Book"
      cancelLabel="Cancel"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      content={
        <div className="flex flex-col font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column - Session Details */}
            <div className="flex flex-col gap-8">
              <h4 className="text-md font-semibold">Session Details</h4>
              <div className="border p-4 rounded-md shadow-md h-auto md:h-[255px]">
                {/* Subject Selection */}
                <div className="h-fit">
                  <label className="block text-sm font-medium">
                    Select Subject:
                  </label>
                  <select
                    className={`border p-2 rounded w-full ${
                      errors.subject ? "border-red-500" : ""
                    }`}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    value={selectedSubject}
                  >
                    {tutor?.subjects?.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-xs">Subject is required.</p>
                  )}
                </div>

                <p className="text-sm">
                  <strong>Tutor:</strong> {tutor.name}
                </p>
                <p className="text-sm">
                  <strong>Hourly Rate:</strong> {tutor.hourRate}€
                </p>

                <div className="text-sm">
                  <p>
                    <strong> Date:</strong>{" "}
                    {selectedDate
                      ? format(selectedDate, "PPP")
                      : "Not selected"}
                  </p>
                  {errors.date && (
                    <p className="text-red-500 text-xs">
                      Please select a date.
                    </p>
                  )}
                  <p>
                    <strong> Time:</strong> {selectedTime || "Not selected"}
                  </p>
                  {errors.time && (
                    <p className="text-red-500 text-xs">
                      Please select a time.
                    </p>
                  )}
                  <p>
                    <strong>Duration:</strong>{" "}
                    {selectedDuration === 1 ? "1 Hour" : "2 Hours"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Calendar */}
            <div className="flex flex-col gap-4">
              <h4 className="text-md font-semibold">Select Time and Date</h4>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) =>
                  setSelectedDate(
                    date && isDayAvailable(date) ? date : undefined
                  )
                }
                fromDate={new Date()}
                modifiers={{
                  disabled: (date) => !isDayAvailable(date),
                }}
                modifiersStyles={{
                  available: {
                    border: "2px solid #4CAF50",
                    borderRadius: "50%",
                    cursor: "pointer",
                  },
                  selected: {
                    backgroundColor: "#FF9800",
                    borderRadius: "50%",
                  },
                }}
              />
            </div>
          </div>

          {/* Duration Selection */}
          <div className="mt-4 flex gap-4 flex-col">
            <h4 className="text-md font-semibold">Select duration of Lesson</h4>
            <div className="flex gap-1">
              <Button
                variant={selectedDuration === 1 ? "default" : "outline"}
                onClick={() => {
                  setSelectedDuration(1);
                  setSelectedTime(null); 
                }}
                className="w-24"
              >
                1 Hour
              </Button>
              <Button
                variant={selectedDuration === 2 ? "default" : "outline"}
                onClick={() => {
                  setSelectedDuration(2);
                  setSelectedTime(null); 
                }}
                className="w-24"
              >
                2 Hours
              </Button>
            </div>
          </div>

          {/* Times and Duration */}
          <div className="flex flex-col gap-4 mt-8">
            <h4 className="text-md font-semibold">Select Start Time</h4>
            <div className="mt-4 max-h-40 overflow-auto">
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="w-20"
                  >
                    {time}
                  </Button>
                ))
              ) : (
                <p className="text-red-500">
                  No available times for the selected date.
                </p>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default BookingModal;
