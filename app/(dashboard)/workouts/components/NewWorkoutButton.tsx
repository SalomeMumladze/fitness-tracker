"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { onClick: () => void };

export default function NewWorkoutButton({ onClick }: Props) {
  return (
    <Button className="gap-2" onClick={onClick}>
      <Plus className="size-4" />
      New Workout
    </Button>
  );
}
