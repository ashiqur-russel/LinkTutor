"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import ActionButtons from "@/components/shared/ActionButtons";

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const AddressCard = ({ address }: { address: Address }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(address);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseEditing = () => {
    setFormData(address);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      console.log("Save data:", formData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Address</CardTitle>
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
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street"
              className="border rounded px-2 py-1 w-full"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="border rounded px-2 py-1 w-full"
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="border rounded px-2 py-1 w-full"
            />
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="border rounded px-2 py-1 w-full"
            />
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        ) : (
          <>
            <p>{formData.street}</p>
            <p>
              {formData.city}, {formData.state}
            </p>
            <p>
              {formData.postalCode}, {formData.country}
            </p>
          </>
        )}
      </CardContent>
      {isEditing && (
        <ActionButtons onCancel={handleCloseEditing} onSave={handleSave} />
      )}
    </Card>
  );
};

export default AddressCard;
