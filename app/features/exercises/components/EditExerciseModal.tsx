"use client";

import { useState, useEffect } from "react";
import { updateExercise } from "../actions/updateExercise";

export default function EditExerciseModal({
  exercise,
  onClose,
  workoutId,
}: any) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  useEffect(() => {
    if (exercise) {
      setName(exercise.name);
      setSets(exercise.sets);
      setReps(exercise.reps);
    }
  }, [exercise]);

  if (!exercise) return null;

  async function handleSave() {
    await updateExercise({
      id: exercise.id,
      workoutId,
      name,
      sets,
      reps,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
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

        <div className="flex gap-2 mt-2">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
