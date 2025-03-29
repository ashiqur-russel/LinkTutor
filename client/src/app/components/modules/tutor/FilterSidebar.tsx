"use client";

import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const FilterSidebar = () => {
  const [price, setPrice] = useState(50);

  const subjects = [
    "English",
    "Mathmetics",
    "Deutsch",
    "Physics",
    "Chemistry",
    "Higher Math",
    "History",
  ];
  const ratings = [5, 4, 3, 2, 1];
  const availability = [
    "Satarday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return (
    <Card className="p-4  shadow-sm w-full  mf:w-62 md:w-72 lg:w-80 ">
      <CardContent className="">
        <h2 className="text-lg font-semibold mb-4">Filter By Hourly Rate</h2>
        <Slider
          defaultValue={[price]}
          max={100}
          onValueChange={(val) => setPrice(val[0])}
        />
        <p className="mt-2">${price}</p>

        <h2 className="text-lg font-semibold mt-6">Subjects</h2>
        <ul className="space-y-2 mt-2">
          {subjects.map((brand, index) => (
            <li key={index} className="flex items-center gap-2">
              <Checkbox />
              <span>{brand}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6">Rating</h2>
        <ul className="space-y-2 mt-2">
          {ratings.map((rating, index) => (
            <li key={index} className="flex items-center gap-2">
              <Checkbox />
              <span className="text-yellow-500">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6">Availability</h2>
        <ul className="space-y-2 mt-2">
          {availability.map((status, index) => (
            <li key={index} className="flex items-center gap-2">
              <Checkbox />
              <span>{status}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
