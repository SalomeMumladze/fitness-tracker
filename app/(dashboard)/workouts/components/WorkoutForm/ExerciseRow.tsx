"use client";

import { GripVertical, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExerciseDraft } from "@/app/features/workouts/types/workouts";
import { useForm } from "@tanstack/react-form";
import { Workout } from "@/app/features/workouts/schemas/workout";

type Props = {
  form: ReturnType<typeof useForm<Workout>>;
  exercise: ExerciseDraft;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
};

export default function ExerciseRow({
  form,
  exercise,
  index,
  canRemove,
  onRemove,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative rounded-xl border bg-card p-4 space-y-3 transition-colors hover:border-primary/30"
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          className="mt-2 flex size-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-full bg-muted text-muted-foreground active:cursor-grabbing"
          aria-label="Reorder exercise"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-3.5" />
        </button>

        <div className="flex-1 space-y-3">
          <form.Field name={`exercises[${index}].name`}>
            {(field: any) => (
              <Field>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: any) => field.handleChange(e.target.value)}
                  placeholder="Exercise name"
                  className="font-medium border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <div className="grid sm:grid-cols-3 gap-2">
            {(["sets", "reps"] as const).map((key) => (
              <form.Field key={key} name={`exercises[${index}].${key}`}>
                {(field: any) => (
                  <Field>
                    <FieldLabel className="text-xs text-muted-foreground capitalize">
                      {key}
                    </FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e: any) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="h-9"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            ))}

            <form.Field name={`exercises[${index}].weight`}>
              {(field: any) => (
                <Field>
                  <FieldLabel className="text-xs text-muted-foreground">
                    Weight
                  </FieldLabel>
                  <ButtonGroup>
                    <Input
                      type="number"
                      min={0}
                      value={field.state.value}
                      onChange={(e: any) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="h-9"
                    />
                    <Button disabled variant="outline" className="h-9">
                      KG
                    </Button>
                  </ButtonGroup>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </div>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
            aria-label="Remove exercise"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
