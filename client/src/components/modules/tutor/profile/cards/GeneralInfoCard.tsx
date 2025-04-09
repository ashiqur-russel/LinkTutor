"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GeneralInfoCard = ({
  name,
  email,
  phone,
  hourRate,
}: {
  name: string;
  email: string;
  phone: string;
  hourRate: number;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>General Info</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>Hourly Rate:</strong> €{hourRate}
      </p>
    </CardContent>
  </Card>
);

export default GeneralInfoCard;
