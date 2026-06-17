import { workouts } from "@/app/features/workouts/data/workouts";
import Link from "next/link";

export default function WorkoutsPage() {
  return (
    <div>
      <h1>Workouts</h1>

      <Link href="/workouts/new">Create</Link>

      {workouts.map((w) => (
        <div key={w.id}>
          <Link href={`/workouts/${w.id}`}>{w.name}</Link>
        </div>
      ))}
    </div>
  );
}
