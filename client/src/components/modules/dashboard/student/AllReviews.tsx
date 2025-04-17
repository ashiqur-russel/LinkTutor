"use client"
import LinkTutorTable from '@/components/ui/core/LinkTutorTable';
import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { Review } from '@/types';


 type ReviewProps = {
    reviewList: Review[];
}

const AllReviews = ({reviewList}:ReviewProps) => {

    console.log(reviewList)
   
    const columns: ColumnDef<Review>[] = [
    
      {
        accessorKey: "tutor",
        header: "Name",
        cell: ({ row }) => <span>{row.original?.tutorId?.name}</span>,
      },
      {
        accessorKey: "comment",
        header: "Comment",
        cell: ({ row }) => <span>{row.original.comment}</span>,
      },
      
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => <span>{row.original.rating}</span>,

      },
    ];
  return (
      <div className="container mx-auto h-screen">
      <h1 className="text-3xl pb-7 font-sans">My Review List</h1>
      <div className="flex"></div>
      {reviewList?.length > 0 ? (
        <LinkTutorTable columns={columns} data={reviewList} />
      ) : (
        <p>No Review yet.</p>
      )}{" "}
    </div>
  );
};

export default AllReviews;