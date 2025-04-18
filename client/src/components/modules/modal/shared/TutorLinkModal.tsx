import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";

interface TutorLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  submitLabel: string;
  cancelLabel: string;
  onSubmit: () => void;
  isSubmitting?: boolean; 
}

const TutorLinkModal = ({
  isOpen,
  onClose,
  title,
  content,
  submitLabel,
  cancelLabel,
  onSubmit,
  isSubmitting = false, 
}: TutorLinkModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md w-full z-[9999] max-h-[90vh] overflow-y-auto"
        aria-describedby="dialog-content-description"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col  p-6" id="dialog-content-description">
          {content}
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
  {isSubmitting ? (
    <span className="flex items-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      Booking...
    </span>
  ) : (
    submitLabel
  )}
</Button>


        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TutorLinkModal;
