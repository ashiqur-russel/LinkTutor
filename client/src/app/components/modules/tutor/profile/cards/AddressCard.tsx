"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const AddressCard = ({ address }: { address: Address }) => (
  <Card>
    <CardHeader>
      <CardTitle>Address</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{address.street}</p>
      <p>
        {address.city}, {address.state}
      </p>
      <p>
        {address.postalCode}, {address.country}
      </p>
    </CardContent>
  </Card>
);

export default AddressCard;
