"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

const FilterSidebar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [filters, setFilters] = useState({
    availability: [] as string[],
    subjects: [] as string[],
    Ratings: [] as number[],
    HourRate: { min: "", max: "" },
  });

  const subjects = [
    "English",
    "Mathematics",
    "Deutsch",
    "Physics",
    "Chemistry",
    "Higher Math",
    "History",
  ];
  const ratings = [5, 4, 3, 2, 1];
  const availability = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (
    category: "availability" | "subjects" | "Ratings",
    value: string | number
  ) => {
    setFilters((prev) => {
      const newValues = (prev[category] as (string | number)[]).includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return { ...prev, [category]: newValues };
    });
  };

  return (
    <Card className="p-4 shadow-sm w-full md:w-72 lg:w-80">
      <CardContent>
        {/* Hour Rate Filter */}
        <h2 className="text-lg font-semibold mb-4">Filter By Hour Rate</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            placeholder="Min"
            className="border rounded px-2 py-1 w-full"
            value={filters.HourRate.min}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                HourRate: { ...prev.HourRate, min: e.target.value },
              }))
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="border rounded px-2 py-1 w-full"
            value={filters.HourRate.max}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                HourRate: { ...prev.HourRate, max: e.target.value },
              }))
            }
          />
        </div>

        {/* Subjects Filter */}
        <h2 className="text-lg font-semibold mt-6">Subjects</h2>
        <ul className="space-y-2 mt-2">
          {subjects.map((subject) => (
            <li key={subject} className="flex items-center gap-2">
              <Checkbox
                checked={filters.subjects.includes(subject)}
                onCheckedChange={() =>
                  handleCheckboxChange("subjects", subject)
                }
              />
              <span>{subject}</span>
            </li>
          ))}
        </ul>

        {/* Ratings Filter */}
        <h2 className="text-lg font-semibold mt-6">Rating</h2>
        <ul className="space-y-2 mt-2">
          {ratings.map((rating) => (
            <li key={rating} className="flex items-center gap-2">
              <Checkbox
                checked={filters.Ratings.includes(rating)}
                onCheckedChange={() => handleCheckboxChange("Ratings", rating)}
              />
              <span className="text-yellow-500">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </span>
            </li>
          ))}
        </ul>

        {/* Availability Filter */}
        <h2 className="text-lg font-semibold mt-6">Availability</h2>
        <ul className="space-y-2 mt-2">
          {availability.map((day) => (
            <li key={day} className="flex items-center gap-2">
              <Checkbox
                checked={filters.availability.includes(day)}
                onCheckedChange={() =>
                  handleCheckboxChange("availability", day)
                }
              />
              <span>{day}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
