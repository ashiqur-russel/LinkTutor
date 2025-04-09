"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, PlusCircle, Pencil } from "lucide-react";
import { DAYS_OF_WEEK, HOURS_OF_DAY } from "@/constants/availibity";

const availabilitySlotSchema = z.object({
  day: z.enum(DAYS_OF_WEEK),
  startTime: z.enum(HOURS_OF_DAY, {
    errorMap: () => ({ message: "Invalid start time" }),
  }),
  endTime: z.enum(HOURS_OF_DAY, {
    errorMap: () => ({ message: "Invalid end time" }),
  }),
});

const formSchema = z.object({
  availability: z
    .array(availabilitySlotSchema)
    .min(1, "At least one availability slot is required"),
});

type AvailabilityFormValues = z.infer<typeof formSchema>;

interface AvailabilitySlot {
  day: (typeof DAYS_OF_WEEK)[number];
  startTime: (typeof HOURS_OF_DAY)[number];
  endTime: (typeof HOURS_OF_DAY)[number];
}

const AvailabilityCard = ({
  initialAvailability,
}: {
  initialAvailability: AvailabilitySlot[];
}) => {
  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availability: initialAvailability,
    },
  });

  const { control, handleSubmit, reset, watch, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [originalValues, setOriginalValues] = useState<AvailabilityFormValues>({
    availability: initialAvailability,
  });

  useEffect(() => {
    reset({
      availability: initialAvailability,
    });
    setOriginalValues({
      availability: initialAvailability,
    });
  }, [initialAvailability, reset]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(originalValues);
  };

  const onSubmit = (data: AvailabilityFormValues) => {
    console.log("Form data:", data);
    setOriginalValues(data);
    setIsEditing(false);
  };

  const getFutureHours = (
    startHour: string
  ): (typeof HOURS_OF_DAY)[number][] => {
    const startIndex = HOURS_OF_DAY.indexOf(
      startHour as (typeof HOURS_OF_DAY)[number]
    );
    if (startIndex === -1) return [];
    return HOURS_OF_DAY.slice(
      startIndex + 1
    ) as (typeof HOURS_OF_DAY)[number][];
  };

  const handleAddAvailability = () => {
    append({ day: "Monday", startTime: "08:00", endTime: "09:00" });
  };

  const handleStartTimeChange = (
    index: number,
    newStartTime: (typeof HOURS_OF_DAY)[number]
  ) => {
    setValue(`availability.${index}.startTime`, newStartTime);
    const futureHours = getFutureHours(newStartTime);
    if (
      fields[index].endTime &&
      !futureHours.includes(watch(`availability.${index}.endTime`))
    ) {
      setValue(`availability.${index}.endTime`, futureHours[0] || "");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Availability</CardTitle>
        {!isEditing && (
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Pencil className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <fieldset className="space-y-4">
                {fields.map((field, index) => {
                  const startTimeValue = watch(
                    `availability.${index}.startTime`
                  );
                  const availableEndTimes = startTimeValue
                    ? getFutureHours(startTimeValue)
                    : (HOURS_OF_DAY.slice(
                        1
                      ) as (typeof HOURS_OF_DAY)[number][]);
                  return (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 gap-4 items-start sm:grid-cols-4"
                    >
                      <FormField
                        control={control}
                        name={`availability.${index}.day`}
                        render={({ field: dayField }) => (
                          <FormItem>
                            <FormLabel>Day</FormLabel>
                            <FormControl>
                              <Select
                                value={dayField.value}
                                onValueChange={(val) => {
                                  dayField.onChange(val);
                                }}
                              >
                                <SelectTrigger className="h-10 w-full">
                                  <SelectValue placeholder="Select a day" />
                                </SelectTrigger>
                                <SelectContent>
                                  {DAYS_OF_WEEK.map((day) => (
                                    <SelectItem key={day} value={day}>
                                      {day}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`availability.${index}.startTime`}
                        render={({ field: startTimeField }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Select
                                value={startTimeField.value}
                                onValueChange={(val) => {
                                  handleStartTimeChange(
                                    index,
                                    val as (typeof HOURS_OF_DAY)[number]
                                  );
                                  startTimeField.onChange(val);
                                }}
                              >
                                <SelectTrigger className="h-10 w-full">
                                  <SelectValue placeholder="Select start" />
                                </SelectTrigger>
                                <SelectContent>
                                  {HOURS_OF_DAY.map((hour) => (
                                    <SelectItem key={hour} value={hour}>
                                      {hour}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`availability.${index}.endTime`}
                        render={({ field: endTimeField }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Select
                                value={endTimeField.value}
                                onValueChange={(val) => {
                                  endTimeField.onChange(val);
                                }}
                                disabled={!startTimeValue}
                              >
                                <SelectTrigger className="h-10 w-full">
                                  <SelectValue placeholder="Select end" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableEndTimes.map((hour) => (
                                    <SelectItem key={hour} value={hour}>
                                      {hour}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-col">
                        <FormLabel className="sr-only">Remove</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="mt-4 w-10 h-10 flex items-center justify-center"
                          disabled={fields.length <= 1}
                        >
                          <Trash2 className="text-red-500" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddAvailability}
                  className="btn-gold-outline"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Availability
                </Button>
              </fieldset>

              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              {originalValues?.availability?.map((slot, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-2"
                >
                  <p>
                    {slot.day}: {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Form>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCard;
