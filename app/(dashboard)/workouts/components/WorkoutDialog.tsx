"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export default function WorkoutDialog({ open, onOpenChange, children }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:min-w-3xl p-0 gap-0 overflow-hidden">
        {children}
      </DialogContent>
    </Dialog>
  );
}
