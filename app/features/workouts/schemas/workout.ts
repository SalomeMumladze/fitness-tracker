import { z } from "zod";

export const exerciseSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(2, "Exercise name must be at least 2 characters"),
  sets: z.number().int().min(1, "Must be be at least 1 set").max(20),
  reps: z.number().int().min(1, "Must be be at least 1 rep").max(100),
  weight: z.number().min(0, "Expected number to be >=0").max(1000),
  order: z.number().int(),
});

export const workoutSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(3, "Workout name must be at least 3 characters")
    .max(50, "Workout name is too long"),

  exercises: z
    .array(exerciseSchema)
    .min(1, "Add at least one exercise")
    .max(30, "Maximum 30 exercises"),
});

export type Workout = z.infer<typeof workoutSchema>;
export type ExerciseForm = z.infer<typeof exerciseSchema>;
