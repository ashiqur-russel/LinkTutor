"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Rating from "@/components/ui/Rating";
import { addReviewForTutor } from "@/services/ReviewService";

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required"),
  comment: z.string().min(1, "Comment is required"),
});

type ReviewFormType = z.infer<typeof reviewSchema>;

type TutorReviewModalProps = {
  tutorId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  review?: {
    _id: string;
    rating: number;
    comment: string;
  };
  onSubmit?: (data: { rating: number; comment: string }) => Promise<void>;
};

const TutorReviewModal = ({
  tutorId,
  open,
  setOpen,
  review,
  onSubmit,
}: TutorReviewModalProps) => {
  const form = useForm<ReviewFormType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: review?.rating ?? 0,
      comment: review?.comment ?? "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (data: ReviewFormType) => {
    const payload = {
      rating: Number(data.rating),
      comment: data.comment,
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        const res = await addReviewForTutor(tutorId, payload);

        if (!res.success) {
          throw new Error(res.message || "Submission failed");
        }
      }

      toast.success(`Review ${review ? "updated" : "submitted"} successfully!`);
      form.reset();
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Server error. Try again later.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{review ? "Edit Your Review" : "Leave a Review"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Rating value={field.value} onChange={field.onChange} max={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write your comment..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TutorReviewModal;
