"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import ActionButtons from "@/app/components/shared/ActionButtons";

interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

const AvailabilityCard = ({
  availability,
}: {
  availability: AvailabilitySlot[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [slots, setSlots] = useState<AvailabilitySlot[]>(availability);

  const handleAdd = () => {
    setSlots([...slots, { day: "", startTime: "", endTime: "" }]);
  };

  const handleUpdate = (index: number, key: string, value: string) => {
    const updated = [...slots];
    (updated[index] as any)[key] = value;
    setSlots(updated);
  };

  const handleDelete = (index: number) => {
    const updated = [...slots];
    updated.splice(index, 1);
    setSlots(updated);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Availability</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-2"
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={slot.day}
                  placeholder="Day"
                  onChange={(e) => handleUpdate(index, "day", e.target.value)}
                  className="border rounded px-2 py-1 w-full md:w-auto"
                />
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    handleUpdate(index, "startTime", e.target.value)
                  }
                  className="border rounded px-2 py-1"
                />
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    handleUpdate(index, "endTime", e.target.value)
                  }
                  className="border rounded px-2 py-1"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  <Trash className="text-red-500" />
                </Button>
              </>
            ) : (
              <p>
                {slot.day}: {slot.startTime} - {slot.endTime}
              </p>
            )}
          </div>
        ))}
        {isEditing && (
          <Button variant="outline" onClick={handleAdd}>
            Add Availability
          </Button>
        )}
      </CardContent>
      {isEditing && <ActionButtons />}
    </Card>
  );
};

export default AvailabilityCard;
