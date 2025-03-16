"use client";

import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Input,
  // If you're using ShadCN's Label too, it might be in "@/components/ui/label"
} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TutorFormData>({
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

  const [step, setStep] = useState(1);
  const totalSteps = STEP_TITLES.length;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  type FieldName =
    | keyof TutorFormData
    | "address.street"
    | "address.city"
    | "address.state"
    | "address.postalCode"
    | "address.country";

  const stepFields: Record<number, FieldName[]> = {
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

  // Handle prev
  const handlePrev = () => {
    setStep((s) => s - 1);
  };

  const onSubmit = async (data: TutorFormData) => {
    const body = { ...data, hourRate: Number(data.hourRate) };
    console.log("Submitting multi-step form data:", body);

    // const response = await fetch("/api/tutors", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // });
    // if (!response.ok) throw new Error("Failed to create tutor");
    // const result = await response.json();
    // console.log("Tutor created:", result);

    alert("Form submitted! Check the console for data.");
  };

  // --------------
  // Step Indicator
  // --------------
  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {STEP_TITLES.map((title, index) => {
        const stepIndex = index + 1;
        // "completed" if stepIndex < step
        // "current" if stepIndex === step
        // "upcoming" if stepIndex > step

        // We’ll pick which background color to use:
        let bgClass = "bg-[var(--muted)] text-[var(--muted-foreground)]";
        let labelClass = "text-[var(--foreground)]";

        if (stepIndex < step) {
          // completed
          bgClass = "bg-[var(--secondary)] text-[var(--secondary-foreground)]";
          labelClass = "font-medium text-[var(--foreground)]";
        } else if (stepIndex === step) {
          // current
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

  const renderStepOne = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="John Tutor"
          className="w-full h-12 px-4"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john.tutor@example.com"
          className="w-full h-12 px-4"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="securePassword"
          className="w-full h-12 px-4"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          placeholder="555-555-5555"
          className="w-full h-12 px-4"
          {...register("phone", { required: "Phone is required" })}
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <fieldset className="space-y-4 border p-4 rounded-md">
      <legend className="font-semibold">Address</legend>

      <div>
        <Label htmlFor="street">Street</Label>
        <Input
          id="street"
          placeholder="123 Tutor Lane"
          className="w-full h-12 px-4"
          {...register("address.street", { required: "Street is required" })}
        />
        {errors.address?.street && (
          <p className="text-red-600 text-sm mt-1">
            {errors.address.street.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="Knowledge City"
          className="w-full h-12 px-4"
          {...register("address.city", { required: "City is required" })}
        />
        {errors.address?.city && (
          <p className="text-red-600 text-sm mt-1">
            {errors.address.city.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          placeholder="NY"
          className="w-full h-12 px-4"
          {...register("address.state", { required: "State is required" })}
        />
        {errors.address?.state && (
          <p className="text-red-600 text-sm mt-1">
            {errors.address.state.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          placeholder="10001"
          className="w-full h-12 px-4"
          {...register("address.postalCode", {
            required: "Postal code is required",
          })}
        />
        {errors.address?.postalCode && (
          <p className="text-red-600 text-sm mt-1">
            {errors.address.postalCode.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="USA"
          className="w-full h-12 px-4"
          {...register("address.country", { required: "Country is required" })}
        />
        {errors.address?.country && (
          <p className="text-red-600 text-sm mt-1">
            {errors.address.country.message}
          </p>
        )}
      </div>
    </fieldset>
  );

  const renderStepThree = () => (
    <div className="space-y-4">
      <fieldset className="space-y-3 border p-4 rounded-md">
        <legend className="font-semibold">Availability</legend>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 gap-4 items-start sm:grid-cols-4"
          >
            <div className="flex flex-col">
              <Label>Day</Label>
              <Controller
                name={`availability.${index}.day`}
                control={control}
                rules={{ required: "Day is required" }}
                render={({ field: dayField }) => (
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
                )}
              />
              {errors.availability?.[index]?.day && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.availability[index]?.day?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <Label>Start Time</Label>
              <Input
                type="time"
                className="w-full h-12 px-2"
                {...register(`availability.${index}.startTime`, {
                  required: "Start time is required",
                })}
              />
              {errors.availability?.[index]?.startTime && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.availability[index]?.startTime?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <Label>End Time</Label>
              <Input
                type="time"
                className="w-full h-12 px-2"
                {...register(`availability.${index}.endTime`, {
                  required: "End time is required",
                })}
              />
              {errors.availability?.[index]?.endTime && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.availability[index]?.endTime?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <Label className="sr-only">Remove</Label>
              {index > 0 && (
                <button
                  type="button"
                  className="mt-4 w-12 h-11 flex items-center justify-center "
                  disabled={index === 0}
                  onClick={() => remove(index)}
                >
                  X
                </button>
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

      <div>
        <Label className="block mb-1">Subjects</Label>
        <Controller
          name="subjects"
          control={control}
          rules={{
            validate: (subjects) =>
              subjects.length > 0 || "Select at least one subject",
          }}
          render={({ field }) => {
            const { value, onChange } = field;
            return (
              <div className="space-y-2 pl-1">
                {SUBJECT_OPTIONS.map((subject) => {
                  const checked = value.includes(subject);

                  const handleCheckedChange = (isChecked: boolean) => {
                    if (isChecked) {
                      onChange([...value, subject]);
                    } else {
                      onChange(value.filter((item) => item !== subject));
                    }
                  };

                  return (
                    <div key={subject} className="flex items-center gap-2">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={handleCheckedChange}
                        id={`checkbox-${subject}`}
                      />
                      <Label htmlFor={`checkbox-${subject}`}>{subject}</Label>
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
        {errors.subjects && (
          <p className="text-red-600 text-sm mt-1">{errors.subjects.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="hourRate">Hourly Rate</Label>
        <Input
          id="hourRate"
          type="number"
          placeholder="45"
          className="w-full h-12 px-4"
          {...register("hourRate", {
            required: "Hourly rate is required",
            valueAsNumber: true,
          })}
        />
        {errors.hourRate && (
          <p className="text-red-600 text-sm mt-1">{errors.hourRate.message}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[var(--background)] text-[var(--foreground)] rounded shadow-md">
      {renderStepIndicator()}

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}

        <div className="mt-8 flex items-center justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="btn-gold-outline"
            >
              Previous
            </button>
          )}

          {step < totalSteps && (
            <button type="button" onClick={handleNext} className="btn-primary">
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
    </div>
  );
}
