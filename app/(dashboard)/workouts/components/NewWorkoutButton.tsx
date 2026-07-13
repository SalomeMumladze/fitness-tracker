import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NewWorkoutButton() {
  return (
    <Link href="/workouts/create">
      <Button className="gap-2">
        <Plus className="size-4" />
        Create Workout
      </Button>
    </Link>
  );
}
