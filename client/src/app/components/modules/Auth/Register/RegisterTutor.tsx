"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // If you still want to use it for certain labels
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { registerTutor } from "@/app/services/AuthService";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
];

const STEP_TITLES = ["Personal Info", "Address", "Availability"];

type TutorFormData = {
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  subjects: string[];
  hourRate: number;
};

export default function RegisterTutorMultiStep() {
  const form = useForm<TutorFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      phone: "",
      availability: [
        {
          day: "Monday",
          startTime: "09:00",
          endTime: "22:00",
        },
      ],
      subjects: [],
      hourRate: 0,
    },
    shouldUnregister: false,
  });

  const {
    handleSubmit,
    control,
    trigger,
    formState: { isSubmitting },
  } = form;

  const [step, setStep] = useState(1);
  const totalSteps = STEP_TITLES.length;

  const router = useRouter();
  const { setIsLoading } = useUser();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  const stepFields: Record<
    number,
    (
      | "name"
      | "email"
      | "password"
      | "phone"
      | "address.street"
      | "address.city"
      | "address.state"
      | "address.postalCode"
      | "address.country"
    )[]
  > = {
    1: ["name", "email", "password", "phone"],
    2: [
      "address.street",
      "address.city",
      "address.state",
      "address.postalCode",
      "address.country",
    ],
    3: [],
  };

  const handleNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    setStep((s) => s - 1);
  };

  const onSubmit: SubmitHandler<TutorFormData> = async (data) => {
    const body = { ...data, hourRate: Number(data.hourRate) };

    try {
      const res = await registerTutor(body);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/login");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------------------------------
  // Step Indicator
  // ----------------------------------------------------
  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {STEP_TITLES.map((title, index) => {
        const stepIndex = index + 1;
        let bgClass = "bg-[var(--muted)] text-[var(--muted-foreground)]";
        let labelClass = "text-[var(--foreground)]";

        if (stepIndex < step) {
          bgClass = "bg-[var(--secondary)] text-[var(--secondary-foreground)]";
          labelClass = "font-medium text-[var(--foreground)]";
        } else if (stepIndex === step) {
          bgClass = "bg-[var(--primary)] text-[var(--primary-foreground)]";
          labelClass = "font-semibold text-[var(--primary)]";
        }

        return (
          <React.Fragment key={title}>
            <div className="flex items-center">
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${bgClass}`}
              >
                {stepIndex < step ? "✓" : stepIndex}
              </div>
              <span className={`ml-2 ${labelClass}`}>{title}</span>
            </div>
            {stepIndex < totalSteps && (
              <div className="flex-1 border-t border-[var(--border)] mx-2" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  // Step 1: Personal Info
  const renderStepOne = () => (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="John Tutor"
                className="w-full h-12 px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="john.tutor@example.com"
                className="w-full h-12 px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="securePassword"
                className="w-full h-12 px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        rules={{ required: "Phone is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input
                placeholder="555-555-5555"
                className="w-full h-12 px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  // Step 2: Address
  const renderStepTwo = () => (
    <fieldset className="space-y-4 border p-4 rounded-md">
      <legend className="font-semibold">Address</legend>

      <FormField
        control={control}
        name="address.street"
        rules={{ required: "Street is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street</FormLabel>
            <FormControl>
              <Input
                placeholder="123 Tutor Lane"
                className="w-full h-12 px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="address.city"
        rules={{ required: "City is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input
                placeholder="Knowledge City"
                className="w-full h-12 px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="address.state"
        rules={{ required: "State is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <FormControl>
              <Input placeholder="NY" className="w-full h-12 px-4" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="address.postalCode"
        rules={{ required: "Postal code is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal Code</FormLabel>
            <FormControl>
              <Input
                placeholder="10001"
                className="w-full h-12 px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="address.country"
        rules={{ required: "Country is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input
                placeholder="USA"
                className="w-full h-12 px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </fieldset>
  );

  const renderStepThree = () => (
    <div className="space-y-4">
      {/* Availability array */}
      <fieldset className="space-y-3 border p-4 rounded-md">
        <legend className="font-semibold">Availability</legend>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 gap-4 items-start sm:grid-cols-4"
          >
            <FormField
              control={control}
              name={`availability.${index}.day`}
              rules={{ required: "Day is required" }}
              render={({ field: dayField }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <FormControl>
                    <Select
                      value={dayField.value}
                      onValueChange={(val) => dayField.onChange(val)}
                    >
                      <SelectTrigger className="h-full w-full border border-[var(--border)]">
                        <SelectValue placeholder="-- select a day --" />
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
              rules={{ required: "Start time is required" }}
              render={({ field: startTimeField }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className="w-full h-12 px-2"
                      {...startTimeField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`availability.${index}.endTime`}
              rules={{ required: "End time is required" }}
              render={({ field: endTimeField }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className="w-full h-12 px-2"
                      {...endTimeField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col">
              <Label className="sr-only">Remove</Label>
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => remove(index)}
                  className="mt-5 w-12 h-10 flex items-center justify-center"
                  disabled={index === 0}
                >
                  X
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="btn-gold-outline"
          onClick={() => append({ day: "", startTime: "", endTime: "" })}
        >
          Add More Availability
        </Button>
      </fieldset>

      <FormField
        control={control}
        name="subjects"
        rules={{
          validate: (val) => val.length > 0 || "Select at least one subject",
        }}
        render={({ field }) => {
          const { value, onChange } = field;

          return (
            <FormItem>
              <FormLabel>Subjects</FormLabel>
              <div className="space-y-2 pl-1">
                {SUBJECT_OPTIONS.map((subject) => {
                  const checked = value.includes(subject);

                  return (
                    <div key={subject} className="flex items-center gap-2">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(isChecked) => {
                          if (isChecked) {
                            onChange([...value, subject]);
                          } else {
                            onChange(
                              value.filter((item: string) => item !== subject)
                            );
                          }
                        }}
                        id={`checkbox-${subject}`}
                      />
                      <Label htmlFor={`checkbox-${subject}`}>{subject}</Label>
                    </div>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name="hourRate"
        rules={{
          required: "Hourly rate is required",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hourly Rate</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="45"
                className="w-full h-12 px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[var(--background)] text-[var(--foreground)] rounded shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Register as Tutor</h2>

      {renderStepIndicator()}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && renderStepOne()}
          {step === 2 && renderStepTwo()}
          {step === 3 && renderStepThree()}

          <div className="mt-8 flex items-center justify-between">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                className="btn-gold-outline"
              >
                Previous
              </Button>
            )}

            {step < totalSteps && (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary"
              >
                Next
              </button>
            )}

            {step === totalSteps && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? "Submitting..." : "Register now"}
              </button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
