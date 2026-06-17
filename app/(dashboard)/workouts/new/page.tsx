"use client";

import { useState } from "react";
import { createWorkout } from "@/app/features/workouts/actions/createWorkout";

export default function NewWorkoutForm() {
  const [name, setName] = useState("");

  async function handleSubmit() {
    await createWorkout(name);
    setName("");
  }

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Workout name"
      />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
