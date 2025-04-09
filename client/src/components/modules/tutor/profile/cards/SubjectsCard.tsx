"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import ActionButtons from "@/components/shared/ActionButtons";

const SubjectsCard = ({ subjects }: { subjects: string[] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [subjectList, setSubjectList] = useState<string[]>(subjects);

  const handleChange = (index: number, value: string) => {
    const updated = [...subjectList];
    updated[index] = value;
    setSubjectList(updated);
  };

  const handleAdd = () => {
    setSubjectList([...subjectList, ""]);
  };

  const handleDelete = (index: number) => {
    const updated = [...subjectList];
    updated.splice(index, 1);
    setSubjectList(updated);
  };

  const handleCancel = () => {
    setSubjectList(subjects);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      console.log("saved", subjectList);

      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update subjects", err);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Subjects</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {isEditing ? (
          <div className="space-y-2">
            {subjectList.map((subject, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Subject"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(index)}
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAdd}>
              Add Subject
            </Button>
            <ActionButtons onCancel={handleCancel} onSave={handleSave} />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {subjectList.map((subject, index) => (
              <Badge key={index} variant="outline">
                {subject}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectsCard;
