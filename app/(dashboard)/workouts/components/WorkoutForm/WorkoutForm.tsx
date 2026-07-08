"use client";

import { useForm } from "@tanstack/react-form";
import { Plus, Dumbbell } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Workout,
  workoutSchema,
} from "@/app/features/workouts/schemas/workout";
import { ExerciseDraft } from "@/app/features/workouts/types/workouts";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ExerciseRow from "./ExerciseRow";

type Props = {
  mode: "create" | "edit";
  defaultValues?: Workout;
  onSubmit: (data: Workout) => Promise<void>;
  onCancel: () => void;
};

function createEmptyExercise(order: number): ExerciseDraft {
  return {
    id: crypto.randomUUID(),
    order,
    name: "",
    sets: 1,
    reps: 10,
    weight: 10,
  };
}

export default function WorkoutForm({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
}: Props) {
  const form = useForm({
    defaultValues: defaultValues ?? {
      name: "",
      exercises: [createEmptyExercise(1)],
    },
    validators: { onSubmit: workoutSchema },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col max-h-[85vh]"
    >
      <DialogHeader className="px-6 py-5 border-b bg-muted/30 space-y-0">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Dumbbell className="size-4.5" />
          </div>
          <DialogTitle className="text-lg">
            {mode === "create" ? "New Workout" : "Edit Workout"}
          </DialogTitle>
        </div>

        <form.Field name="name">
          {(field) => (
            <Field className="pt-3">
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Push Day, Leg Day..."
                className="text-base font-medium h-11"
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        <form.Field name="exercises" mode="array">
          {(exercisesField) => {
            function handleDragEnd(event: DragEndEvent) {
              const { active, over } = event;
              if (!over || active.id === over.id) return;

              const oldIndex = exercisesField.state.value.findIndex(
                (e) => e.id === active.id,
              );
              const newIndex = exercisesField.state.value.findIndex(
                (e) => e.id === over.id,
              );
              if (oldIndex === -1 || newIndex === -1) return;

              exercisesField.moveValue(oldIndex, newIndex);

              queueMicrotask(() => {
                exercisesField.state.value.forEach((_, i) => {
                  form.setFieldValue(`exercises[${i}].order`, i + 1);
                });
              });
            }

            function handleRemove(index: number) {
              exercisesField.removeValue(index);
              exercisesField.state.value.forEach((_, i) => {
                if (i > index) {
                  form.setFieldValue(`exercises[${i - 1}].order`, i);
                }
              });
            }

            return (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={exercisesField.state.value.map((e) => e.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <FieldGroup className="space-y-3">
                    {exercisesField.state.value.map((exercise, index) => (
                      <ExerciseRow
                        key={exercise.id}
                        form={form}
                        exercise={exercise}
                        index={index}
                        canRemove={exercisesField.state.value.length > 1}
                        onRemove={() => handleRemove(index)}
                      />
                    ))}
                  </FieldGroup>
                </SortableContext>

                <button
                  type="button"
                  onClick={() =>
                    exercisesField.pushValue(
                      createEmptyExercise(
                        exercisesField.state.value.length + 1,
                      ),
                    )
                  }
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Plus className="size-4" />
                  Add Exercise
                </button>
              </DndContext>
            );
          }}
        </form.Field>
      </div>

      <DialogFooter className="px-6 m-0 border-t bg-muted/30 gap-2 sm:gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <form.Subscribe selector={(state) => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <Button type="submit" disabled={isSubmitting} className="min-w-28">
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create Workout"
                  : "Save Changes"}
            </Button>
          )}
        </form.Subscribe>
      </DialogFooter>
    </form>
  );
}
