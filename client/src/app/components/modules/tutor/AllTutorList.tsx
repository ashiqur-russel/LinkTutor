"use client";

import { ITutor } from "@/app/types";

import React, { useState, useEffect } from "react";

import FilterSidebar from "./FilterSidebar";
import { getAllTutors } from "@/app/services/TutorService";
import Spinner from "@/components/ui/spinner";
import TutorInfoCard from "./TutorInfoCard";

const AllTutorList: React.FC = () => {
  const [tutors, setTutors] = useState<ITutor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    availability: [] as string[],
    subjects: [] as string[],
    Ratings: [] as number[],
    HourRate: { min: "", max: "" },
  });

  const handleFilterChange = (updatedFilters: any) => {
    setFilters(updatedFilters);
  };

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);

      const queryFilters = {
        ...filters,
        HourRate:
          filters.HourRate.min && filters.HourRate.max
            ? [filters.HourRate.min, filters.HourRate.max]
            : undefined,
      };

      try {
        const response = await getAllTutors(queryFilters, "1", "10");
        setTutors(response.data || []);
      } catch (error) {
        console.error("Error fetching tutors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [filters]);

  return (
    <div className="flex">
      <div className=" ">
        <FilterSidebar onFilterChange={handleFilterChange} />
      </div>
      <div className="container flex-1 mx-auto px-6 py-8 grid grid-cols-1 gap-6 basis-128">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center">
            <p>No tutor available with the search filters.</p>
          </div>
        ) : (
          tutors.map((tutor) => (
            <TutorInfoCard key={tutor.email} tutor={tutor} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllTutorList;
