"use client";

import { useState } from "react";
import { createExercise } from "../actions/createExercise";

export default function NewExerciseForm({ workoutId }: { workoutId: string }) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);

  async function handleSubmit() {
    if (!name.trim()) return;

    await createExercise(workoutId, name, sets, reps);

    setName("");
    setSets(3);
    setReps(10);
    setOpen(false);
  }

  return (
    <div className="border rounded-xl p-4 space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-blue-600"
      >
        {open ? "✖ Close" : "➕ Add Exercise"}
      </button>

      {open && (
        <div className="space-y-2 mt-3">
          <input
            placeholder="Exercise name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            className="border p-2 w-full rounded"
            placeholder="Sets"
          />

          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            className="border p-2 w-full rounded"
            placeholder="Reps"
          />

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Add Exercise
          </button>
        </div>
      )}
    </div>
  );
}
