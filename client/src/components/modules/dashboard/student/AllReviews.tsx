"use client";

import React, { useState } from "react";
import LinkTutorTable from "@/components/ui/core/LinkTutorTable";
import { ColumnDef } from "@tanstack/react-table";
import { Review } from "@/types";
import { Edit, Trash2 } from "lucide-react";
import TutorReviewModal from "../../modal/review/TutorReviewModal";
import { updateTutorReview } from "@/services/ReviewService";
import { toast } from "sonner";
import CommentCell from "./CommentCell";

type ReviewProps = {
  reviewList: Review[];
};

const AllReviews = ({ reviewList }: ReviewProps) => {
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>(reviewList);

  const handleEditReview = (id: string) => {
    const review = reviewList.find((r) => r._id === id);
    if (review) {
      setSelectedReview(review);
      setOpen(true);
    }
  };

  const handleUpdateReview = async (data: { rating: number; comment: string }) => {
    if (!selectedReview) return;

    try {
      const res = await updateTutorReview(selectedReview._id, data);

      if (res.success) {
        toast.success("Review updated successfully");

        setReviews((prev) =>
          prev.map((r) =>
            r._id === selectedReview._id
              ? { ...r, ...data, rating: data.rating.toString() }
              : r
          )
        );

        setOpen(false);
        setSelectedReview(null);
      } else {
        toast.error(res.message || "Failed to update review");
      }
    } catch (err) {
      toast.error("Something went wrong while updating review");
      console.error(err);
    }
  };

  const handleDeleteReview = (id: string) => {
    console.log("Delete review with ID:", id);
  };

  const columns: ColumnDef<Review>[] = [
    {
      accessorKey: "tutor",
      header: "Tutor",
      cell: ({ row }) => <span>{row.original?.tutorId?.name}</span>,
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) => <CommentCell comment={row.original.comment} />,
    },
    
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => <span>{row.original.rating}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-green-500 cursor-pointer"
            title="Edit"
            onClick={() => handleEditReview(row.original._id)}
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500 cursor-pointer"
            title="Delete"
            onClick={() => handleDeleteReview(row.original._id)}
          >
            <Trash2 className="w-5 h-5 text-red-400 hover:text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-3xl pb-7 font-sans">My Review List</h1>

      {reviews?.length > 0 ? (
        <LinkTutorTable columns={columns} data={reviews} />
      ) : (
        <p>No Review yet.</p>
      )}

      {selectedReview && (
        <TutorReviewModal
          tutorId={selectedReview.tutorId.id}
          open={open}
          setOpen={setOpen}
          review={{
            _id: selectedReview._id,
            rating: Number(selectedReview.rating),
            comment: selectedReview.comment,
          }}
          onSubmit={handleUpdateReview}
        />
      )}
    </div>
  );
};

export default AllReviews;
