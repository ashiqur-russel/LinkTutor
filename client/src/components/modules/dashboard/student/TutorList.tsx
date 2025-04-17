"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import LinkTutorTable from "@/components/ui/core/LinkTutorTable";

interface TutorInfo {
  name: string;
  email: string;
  phone: string;
  hourRate: number;
}

interface ITutorList {
  tutor: TutorInfo;
}

type TutorListProps = {
  tutorList: ITutorList[];
};

const TutorList = ({ tutorList }: TutorListProps) => {

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
    </div>
  );
};

export default TutorList;
