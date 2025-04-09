"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SubjectsCard = ({ subjects }: { subjects: string[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Subjects</CardTitle>
    </CardHeader>
    <CardContent className="space-x-2">
      {subjects.map((subject, index) => (
        <Badge key={index} variant="outline">
          {subject}
        </Badge>
      ))}
    </CardContent>
  </Card>
);

export default SubjectsCard;
