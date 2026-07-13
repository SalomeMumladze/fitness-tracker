"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewWorkoutButton() {
  return (
    <Button asChild className="gap-2">
      <Link href="/workouts/create">
        <Plus className="size-4" />
        Create Workout
      </Link>
    </Button>
  );
}
