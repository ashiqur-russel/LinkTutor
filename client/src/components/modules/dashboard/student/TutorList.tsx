"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import LinkTutorTable from "@/components/ui/core/LinkTutorTable";
import { MessageCirclePlus } from "lucide-react";
import TutorReviewModal from "../../modal/review/TutorReviewModal";

interface TutorInfo {
  name: string;
  email: string;
  phone: string;
  hourRate: number;
  id:string;
}

interface ITutorList {
  tutor: TutorInfo;
}

type TutorListProps = {
  tutorList: ITutorList[];
};

const TutorList = ({ tutorList }: TutorListProps) => {
    const [open, setOpen] = useState(false);
    const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);
    
    const handleAddReview = (id: string) => {
      setSelectedTutorId(id);
      setOpen(true);
    };
  const columns: ColumnDef<ITutorList>[] = [
    {
      accessorKey: "tutor.name",
      header: "Name",
      cell: ({ row }) => <span>{row.original.tutor.name}</span>,
    },
    {
      accessorKey: "tutor.phone",
      header: "Phone",
      cell: ({ row }) => <span>{row.original.tutor.phone}</span>,
    },
    {
      accessorKey: "tutor.email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.tutor.email}</span>,
    },
    {
      accessorKey: "tutor.hourRate",
      header: "Rate",
      cell: ({ row }) => <span>{row.original.tutor.hourRate}</span>,
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
        
  
            <button
              className="text-gray-500 hover:text-green-500  cursor-pointer"
              title="Edit"
              onClick={() => handleAddReview(row.original.tutor.id)}
            >
              <MessageCirclePlus className="w-5 h-5" />
            </button>
  
           
          </div>
        ),
      },
  ];

  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-3xl pb-7 font-sans">My Tutor List</h1>
      <div className="flex"></div>
      {tutorList?.length > 0 ? (
        <LinkTutorTable columns={columns} data={tutorList} />
      ) : (
        <p>No tutor yet.</p>
      )}

<TutorReviewModal
  open={open}
  setOpen={setOpen}
  tutorId={selectedTutorId || ""}
/>    </div>
  );
};

export default TutorList;
