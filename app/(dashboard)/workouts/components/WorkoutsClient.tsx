"use client";

import { useState, useTransition } from "react";
import { Dumbbell, ChevronRight, Trash2 } from "lucide-react";
import { createWorkout } from "@/app/features/workouts/actions/createWorkout";
import { updateWorkout } from "@/app/features/workouts/actions/updateWorkout";
import { deleteWorkout } from "@/app/features/workouts/actions/deleteWorkout";
import { Workout } from "@/app/features/workouts/schemas/workout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import NewWorkoutButton from "./NewWorkoutButton";
import WorkoutDialog from "./WorkoutDialog";
import { WorkoutForm } from "./WorkoutForm";
import { DeleteAction } from "@/components/shared/DeleteAction";
import Link from "next/link";

type WorkoutListItem = Workout & { id: string; createdAt: Date };

type Props = { workouts: WorkoutListItem[] };

export default function WorkoutsClient({ workouts }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<WorkoutListItem | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<WorkoutListItem | null>(
    null,
  );
  const [isDeleting, startDeleteTransition] = useTransition();

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(workout: WorkoutListItem) {
    setEditing(workout);
    setOpen(true);
  }

  async function handleSubmit(data: Workout) {
    if (editing) {
      await updateWorkout({ ...data, id: editing.id });
    } else {
      await createWorkout(data);
    }
    setOpen(false);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;

    startDeleteTransition(async () => {
      try {
        await deleteWorkout(target.id);
        toast.success(`"${target.name}" deleted successfully`);
      } catch (err) {
        toast.error("Failed to delete workout");
      } finally {
        setDeleteTarget(null);
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Workouts</h1>
        <NewWorkoutButton onClick={openCreate} />
      </div>

      {workouts.length === 0 ? (
        <div className="rounded-xl border border-dashed py-12 text-center text-sm text-muted-foreground">
          No workouts yet — create your first one.
        </div>
      ) : (
        <div className="space-y-3">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="group flex items-center gap-2 rounded-lg border transition-colors hover:border-primary/40 hover:bg-muted/30"
            >
              <Link href={`/workouts/${workout.id}/edit`}>
                <button
                  onClick={() => openEdit(workout)}
                  className="flex flex-1 items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Dumbbell className="size-4.5" />
                    </div>
                    <div>
                      <p className="font-medium">{workout.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {workout.exercises.length} exercises
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="size-4 text-muted-foreground" />
                </button>
              </Link>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mr-2 size-8 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 focus-visible:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteTarget(workout);
                }}
                aria-label={`Delete ${workout.name}`}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <WorkoutDialog open={open} onOpenChange={setOpen}>
        <WorkoutForm
          key={editing?.id ?? "create"}
          mode={editing ? "edit" : "create"}
          defaultValues={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </WorkoutDialog>

      <DeleteAction
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete workout?"
        description={
          <>
            This will permanently delete{" "}
            <span className="font-medium text-foreground">
              {deleteTarget?.name}
            </span>{" "}
            and all of its exercises. This action cannot be undone.
          </>
        }
      />
    </div>
  );
}
