"use client";

import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
};

const Rating: React.FC<RatingProps> = ({ value, max = 5, onChange, readOnly = false }) => {
  const handleClick = (i: number) => {
    if (!readOnly && onChange) {
      onChange(i + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={20}
          className={`cursor-pointer transition ${
            i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleClick(i)}
        />
      ))}
    </div>
  );
};

export default Rating;
