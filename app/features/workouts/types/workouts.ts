export type ExerciseDraft = {
  id: string;
  order: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type ExerciseForm = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  order: number;
};

export type Workout = {
  name: string;
  exercises: ExerciseForm[];
};
