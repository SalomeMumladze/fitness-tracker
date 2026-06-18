"use client";

import { useState } from "react";
import { updateExercise } from "../actions/updateExercise";

type Props = {
  id: string;
  workoutId: string;
  initialName: string;
  initialSets: number;
  initialReps: number;
};

export default function EditExerciseForm({
  id,
  workoutId,
  initialName,
  initialSets,
  initialReps,
}: Props) {
  const [name, setName] = useState(initialName);
  const [sets, setSets] = useState(initialSets);
  const [reps, setReps] = useState(initialReps);

  async function handleSubmit() {
    await updateExercise({
      id,
      workoutId,
      name,
      sets,
      reps,
    });
  }

  return (
    <div className="border p-2 rounded-2xl flex items-center">
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <input
        type="number"
        value={sets}
        onChange={(e) => setSets(Number(e.target.value))}
      />

      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(Number(e.target.value))}
      />

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
