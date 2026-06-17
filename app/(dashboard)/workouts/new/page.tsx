"use client";

import { useState } from "react";

export default function NewWorkoutPage() {
  const [name, setName] = useState("");

  const handleCreate = () => {
    console.log("Create workout:", name);
  };

  return (
    <div>
      <h1>Create Workout</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} />

      <button onClick={handleCreate}>Save</button>
    </div>
  );
}
